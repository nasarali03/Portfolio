'use server'

import { upsertCertification as dbUpsertCertification, deleteCertification as dbDeleteCertification } from "@/lib/data"
import type { Certification } from "@/lib/types"
import { revalidatePath } from "next/cache"

export async function upsertCertificationAction(certificationData: Omit<Certification, 'id'> & { id?: string }) {
  await dbUpsertCertification(certificationData);
  revalidatePath('/admin/certifications');
  revalidatePath('/');
}

export async function deleteCertificationAction(id: string) {
  await dbDeleteCertification(id);
  revalidatePath('/admin/certifications');
  revalidatePath('/');
}
