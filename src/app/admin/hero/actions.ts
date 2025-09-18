'use server'

import { getSingletonDoc } from "@/lib/data"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import type { HeroContent } from "@/lib/types"
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

export async function getHeroContent(): Promise<HeroContent | null> {
  try {
    return await getSingletonDoc<HeroContent>('singletons', 'hero');
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return null;
  }
}

export async function updateHeroContent(heroData: Omit<HeroContent, 'profileUrl' | 'profileHint'> & {
  profileFile?: File;
}) {
  let profileUrl = '';
  let profileHint = 'professional headshot';

  // Handle profile image upload
  if (heroData.profileFile) {
    try {
      // Convert image to base64
      const base64Image = await convertImageToBase64(heroData.profileFile);
      profileUrl = base64Image;
      profileHint = 'professional headshot';
      console.log('Hero profile image converted to base64 successfully');
    } catch (error) {
      console.error('Error converting hero profile image to base64:', error);
      // Fallback to existing image or local image
      try {
        const existingHero = await getHeroContent();
        if (existingHero?.profileUrl && !existingHero.profileUrl.includes('picsum.photos')) {
          profileUrl = existingHero.profileUrl;
          profileHint = existingHero.profileHint || 'professional headshot';
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
      const existingHero = await getHeroContent();
      if (existingHero?.profileUrl && !existingHero.profileUrl.includes('picsum.photos')) {
        // Only use existing image if it's not a placeholder
        profileUrl = existingHero.profileUrl;
        profileHint = existingHero.profileHint || 'professional headshot';
        console.log('Using existing uploaded hero profile image');
      } else {
        // If no existing image or it's a placeholder, use local image
        profileUrl = '/ali2.png';
        console.log('Using local hero profile image');
      }
    } catch (error) {
      console.error('Error fetching existing hero content:', error);
      profileUrl = '/ali2.png';
    }
  }

  const fullHeroData = {
    ...heroData,
    profileUrl,
    profileHint,
  };

  // Remove profileFile from the data before saving to database
  const { profileFile, ...dataToSave } = fullHeroData;

  // Save to Firebase
  const db = getFirestore();
  await setDoc(doc(db, 'singletons', 'hero'), dataToSave);
  
  revalidatePath('/admin/hero');
  revalidatePath('/');
  
  return { success: true };
}
