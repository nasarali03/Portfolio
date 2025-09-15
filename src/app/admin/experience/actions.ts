'use server'

import { upsertExperience as dbUpsertExperience, deleteExperience as dbDeleteExperience } from "@/lib/data"
import type { Experience } from "@/lib/types"
import { revalidatePath } from "next/cache"

// Helper function to convert image file to base64
function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsDataURL(file);
  });
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
    } catch (error) {
      console.error('Error converting logo to base64:', error);
      // Fallback to placeholder if logo conversion fails
      logoUrl = experienceData.id ? `https://picsum.photos/seed/${experienceData.id}/100/100` : `https://picsum.photos/seed/logo${Date.now()}/100/100`;
    }
  } else {
    // Use existing logo or placeholder
    logoUrl = experienceData.id ? `https://picsum.photos/seed/${experienceData.id}/100/100` : `https://picsum.photos/seed/logo${Date.now()}/100/100`;
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
