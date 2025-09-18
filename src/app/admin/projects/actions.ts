'use server'

import { generateProjectCardSummary } from "@/ai/flows/project-card-summary-generator"
import { upsertProject as dbUpsertProject, deleteProject as dbDeleteProject, getProjectById } from "@/lib/data"
import type { Project } from "@/lib/types"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const summarySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
})

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

export async function generateSummaryAction(data: { title: string; description: string }) {
  const validation = summarySchema.safeParse(data);
  if (!validation.success) {
    return { error: 'Title and description are required.' };
  }
  
  // Check if Google API key is configured
  if (!process.env.GOOGLE_API_KEY) {
    console.error('GOOGLE_API_KEY is not configured');
    return { error: 'AI service is not configured. Please add GOOGLE_API_KEY to your environment variables.' };
  }
  
  try {
    console.log('Generating AI summary for:', validation.data.title);
    const result = await generateProjectCardSummary(validation.data);
    console.log('AI summary generated successfully');
    return { summary: result.summary };
  } catch (error) {
    console.error('Error generating AI summary:', error);
    return { error: `Failed to generate summary: ${error instanceof Error ? error.message : 'Unknown error'}` };
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
      console.log('Image converted to base64 successfully');
    } catch (error) {
      console.error('Error converting image to base64:', error);
      // Fallback to placeholder if image conversion fails
      imageUrl = projectData.id ? `https://picsum.photos/seed/${projectData.id}/600/400` : `https://picsum.photos/seed/newproj${Date.now()}/600/400`;
    }
  } else if (projectData.id) {
    // For existing projects without new image, keep the existing image
    try {
      const existingProject = await getProjectById(projectData.id);
      if (existingProject?.imageUrl && !existingProject.imageUrl.includes('picsum.photos')) {
        // Only use existing image if it's not a placeholder
        imageUrl = existingProject.imageUrl;
        imageHint = existingProject.imageHint || 'tech abstract';
        console.log('Using existing uploaded image');
      } else {
        // If no existing image or it's a placeholder, use a placeholder
        imageUrl = `https://picsum.photos/seed/${projectData.id}/600/400`;
        console.log('Using placeholder image for existing project');
      }
    } catch (error) {
      console.error('Error fetching existing project:', error);
      imageUrl = `https://picsum.photos/seed/${projectData.id}/600/400`;
    }
  } else {
    // For new projects without image, use a placeholder
    imageUrl = `https://picsum.photos/seed/newproj${Date.now()}/600/400`;
    console.log('Using placeholder image for new project');
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
