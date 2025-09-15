'use server'

import { upsertSkill as dbUpsertSkill, deleteSkill as dbDeleteSkill } from "@/lib/data"
import type { Skill } from "@/lib/types"
import { revalidatePath } from "next/cache"

export async function upsertSkillAction(skillData: Omit<Skill, 'id'> & { id?: string }) {
  await dbUpsertSkill(skillData);
  revalidatePath('/admin/skills');
  revalidatePath('/');
}

export async function deleteSkillAction(id: string) {
  await dbDeleteSkill(id);
  revalidatePath('/admin/skills');
  revalidatePath('/');
}
