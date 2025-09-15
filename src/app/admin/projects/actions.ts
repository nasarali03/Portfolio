'use server'

import { generateProjectCardSummary } from "@/ai/flows/project-card-summary-generator"
import { upsertProject as dbUpsertProject, deleteProject as dbDeleteProject } from "@/lib/data"
import type { Project } from "@/lib/types"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const summarySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
})

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

export async function generateSummaryAction(data: { title: string; description: string }) {
  const validation = summarySchema.safeParse(data);
  if (!validation.success) {
    return { error: 'Title and description are required.' };
  }
  
  try {
    const result = await generateProjectCardSummary(validation.data)
    return { summary: result.summary };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to generate summary.' };
  }
}

export async function upsertProjectAction(projectData: Omit<Project, 'id' | 'imageUrl' | 'imageHint'> & {
  id?: string;
  imageFile?: File;
}) {
  let imageUrl = '';
  let imageHint = 'tech abstract';

  // Handle image upload
  if (projectData.imageFile) {
    try {
      // Convert image to base64
      const base64Image = await convertImageToBase64(projectData.imageFile);
      imageUrl = base64Image;
      imageHint = 'project screenshot';
    } catch (error) {
      console.error('Error converting image to base64:', error);
      // Fallback to placeholder if image conversion fails
      imageUrl = projectData.id ? `https://picsum.photos/seed/${projectData.id}/600/400` : `https://picsum.photos/seed/newproj${Date.now()}/600/400`;
    }
  } else {
    // Use existing image or placeholder
    imageUrl = projectData.id ? `https://picsum.photos/seed/${projectData.id}/600/400` : `https://picsum.photos/seed/newproj${Date.now()}/600/400`;
  }

  const fullProjectData = {
    ...projectData,
    imageUrl,
    imageHint,
  };

  // Remove imageFile from the data before saving to database
  const { imageFile, ...dataToSave } = fullProjectData;

  await dbUpsertProject(dataToSave);
  revalidatePath('/admin/projects');
  revalidatePath('/');
}

export async function deleteProjectAction(id: string) {
    await dbDeleteProject(id);
    revalidatePath('/admin/projects');
    revalidatePath('/');
}
