'use server'

import { upsertEducation as dbUpsertEducation, deleteEducation as dbDeleteEducation } from "@/lib/data"
import type { Education } from "@/lib/types"
import { revalidatePath } from "next/cache"

export async function upsertEducationAction(educationData: Omit<Education, 'id'> & { id?: string }) {
  await dbUpsertEducation(educationData);
  revalidatePath('/admin/education');
  revalidatePath('/');
}

export async function deleteEducationAction(id: string) {
  await dbDeleteEducation(id);
  revalidatePath('/admin/education');
  revalidatePath('/');
}
