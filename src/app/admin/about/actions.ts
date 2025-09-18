'use server'

import { getSingletonDoc } from "@/lib/data"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import type { AboutContent } from "@/lib/types"
import { revalidatePath } from "next/cache"

// Helper function to convert image file to base64
async function convertImageToBase64(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = file.type || 'image/jpeg';
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    throw new Error('Failed to convert image to base64');
  }
}

export async function getAboutContent(): Promise<AboutContent | null> {
  try {
    return await getSingletonDoc<AboutContent>('singletons', 'about');
  } catch (error) {
    console.error('Error fetching about content:', error);
    return null;
  }
}

export async function updateAboutContent(aboutData: Omit<AboutContent, 'profileUrl' | 'profileHint'> & {
  profileFile?: File;
}) {
  let profileUrl = '';
  let profileHint = 'professional developer';

  // Handle profile image upload
  if (aboutData.profileFile) {
    try {
      // Convert image to base64
      const base64Image = await convertImageToBase64(aboutData.profileFile);
      profileUrl = base64Image;
      profileHint = 'professional developer';
      console.log('Profile image converted to base64 successfully');
    } catch (error) {
      console.error('Error converting profile image to base64:', error);
      // Fallback to existing image or local image
      try {
        const existingAbout = await getAboutContent();
        if (existingAbout?.profileUrl && !existingAbout.profileUrl.includes('picsum.photos')) {
          profileUrl = existingAbout.profileUrl;
          profileHint = existingAbout.profileHint || 'professional developer';
        } else {
          profileUrl = '/ali2.png'; // Local fallback
        }
      } catch (fetchError) {
        profileUrl = '/ali2.png'; // Local fallback
      }
    }
  } else {
    // For updates without new image, keep the existing image
    try {
      const existingAbout = await getAboutContent();
      if (existingAbout?.profileUrl && !existingAbout.profileUrl.includes('picsum.photos')) {
        // Only use existing image if it's not a placeholder
        profileUrl = existingAbout.profileUrl;
        profileHint = existingAbout.profileHint || 'professional developer';
        console.log('Using existing uploaded profile image');
      } else {
        // If no existing image or it's a placeholder, use local image
        profileUrl = '/ali2.png';
        console.log('Using local profile image');
      }
    } catch (error) {
      console.error('Error fetching existing about content:', error);
      profileUrl = '/ali2.png';
    }
  }

  const fullAboutData = {
    ...aboutData,
    profileUrl,
    profileHint,
  };

  // Remove profileFile from the data before saving to database
  const { profileFile, ...dataToSave } = fullAboutData;

  // Save to Firebase
  const db = getFirestore();
  await setDoc(doc(db, 'singletons', 'about'), dataToSave);
  
  revalidatePath('/admin/about');
  revalidatePath('/');
  
  return { success: true };
}
