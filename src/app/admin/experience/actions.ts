'use server'

import { upsertExperience as dbUpsertExperience, deleteExperience as dbDeleteExperience, getExperienceById } from "@/lib/data"
import type { Experience } from "@/lib/types"
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

export async function upsertExperienceAction(experienceData: Omit<Experience, 'id' | 'logoUrl' | 'logoHint'> & {
  id?: string;
  logoFile?: File;
}) {
  let logoUrl = '';
  let logoHint = 'company logo';

  // Handle logo upload
  if (experienceData.logoFile) {
    try {
      // Convert logo to base64
      const base64Image = await convertImageToBase64(experienceData.logoFile);
      logoUrl = base64Image;
      logoHint = 'company logo';
      console.log('Logo converted to base64 successfully');
    } catch (error) {
      console.error('Error converting logo to base64:', error);
      // Fallback to placeholder if logo conversion fails
      logoUrl = experienceData.id ? `https://picsum.photos/seed/${experienceData.id}/100/100` : `https://picsum.photos/seed/logo${Date.now()}/100/100`;
    }
  } else if (experienceData.id) {
    // For existing experiences without new logo, keep the existing logo
    try {
      const existingExperience = await getExperienceById(experienceData.id);
      if (existingExperience?.logoUrl && !existingExperience.logoUrl.includes('picsum.photos')) {
        // Only use existing logo if it's not a placeholder
        logoUrl = existingExperience.logoUrl;
        logoHint = existingExperience.logoHint || 'company logo';
        console.log('Using existing uploaded logo');
      } else {
        // If no existing logo or it's a placeholder, use a placeholder
        logoUrl = `https://picsum.photos/seed/${experienceData.id}/100/100`;
        console.log('Using placeholder logo for existing experience');
      }
    } catch (error) {
      console.error('Error fetching existing experience:', error);
      logoUrl = `https://picsum.photos/seed/${experienceData.id}/100/100`;
    }
  } else {
    // For new experiences without logo, use a placeholder
    logoUrl = `https://picsum.photos/seed/logo${Date.now()}/100/100`;
    console.log('Using placeholder logo for new experience');
  }

  const fullExperienceData = {
    ...experienceData,
    logoUrl,
    logoHint,
  };

  // Remove logoFile from the data before saving to database
  const { logoFile, ...dataToSave } = fullExperienceData;

  await dbUpsertExperience(dataToSave);
  revalidatePath('/admin/experience');
  revalidatePath('/');
}

export async function deleteExperienceAction(id: string) {
  await dbDeleteExperience(id);
  revalidatePath('/admin/experience');
  revalidatePath('/');
}
