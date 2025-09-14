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

export async function upsertProjectAction(projectData: Omit<Project, 'id' | 'imageUrl' | 'imageHint'> & {id?: string}) {
  // In a real app, you would handle image uploads to Firebase Storage here
  // and get the imageUrl. For now, we'll use a placeholder.
  const fullProjectData = {
    ...projectData,
    imageUrl: projectData.id ? `https://picsum.photos/seed/${projectData.id}/600/400` : `https://picsum.photos/seed/newproj${Date.now()}/600/400`,
    imageHint: 'tech abstract',
  };

  await dbUpsertProject(fullProjectData);
  revalidatePath('/admin/projects');
  revalidatePath('/');
}

export async function deleteProjectAction(id: string) {
    await dbDeleteProject(id);
    revalidatePath('/admin/projects');
    revalidatePath('/');
}
