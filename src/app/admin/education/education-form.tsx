'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { upsertEducationAction } from './actions'
import type { Education } from '@/lib/types'
import { Loader2, Trash } from 'lucide-react'

const educationSchema = z.object({
  degree: z.string().min(3, 'Degree must be at least 3 characters'),
  institution: z.string().min(2, 'Institution must be at least 2 characters'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().optional(),
  order: z.coerce.number().min(0),
})

type EducationFormData = z.infer<typeof educationSchema>

interface EducationFormProps {
  education?: Education
  onFinished?: () => void
}

export function EducationForm({ education, onFinished }: EducationFormProps) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: education?.degree || '',
      institution: education?.institution || '',
      startDate: education?.startDate || '',
      endDate: education?.endDate || '',
      description: education?.description || '',
      order: education?.order || 0,
    },
  })

  const onSubmit = (data: EducationFormData) => {
    startTransition(async () => {
      try {
        await upsertEducationAction({
          id: education?.id,
          ...data,
        })
        toast({
          title: 'Success!',
          description: `Education has been ${education ? 'updated' : 'created'}.`,
        })
        onFinished?.()
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Something went wrong.',
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="degree">Degree</Label>
          <Input id="degree" {...register('degree')} placeholder="B.S. in Computer Science" />
          {errors.degree && <p className="text-destructive text-sm mt-1">{errors.degree.message}</p>}
        </div>
        <div>
          <Label htmlFor="institution">Institution</Label>
          <Input id="institution" {...register('institution')} placeholder="University Name" />
          {errors.institution && <p className="text-destructive text-sm mt-1">{errors.institution.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input id="startDate" {...register('startDate')} placeholder="2013" />
          {errors.startDate && <p className="text-destructive text-sm mt-1">{errors.startDate.message}</p>}
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input id="endDate" {...register('endDate')} placeholder="2017" />
          {errors.endDate && <p className="text-destructive text-sm mt-1">{errors.endDate.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="order">Display Order</Label>
        <Input id="order" type="number" {...register('order')} />
        {errors.order && <p className="text-destructive text-sm mt-1">{errors.order.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea 
          id="description" 
          {...register('description')} 
          rows={3}
          placeholder="Graduated with honors. Focused on web development, algorithms, and human-computer interaction."
        />
        {errors.description && <p className="text-destructive text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div className="flex justify-end gap-2">
        {education && (
          <Button type="button" variant="destructive" disabled={isPending}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </Button>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {education ? 'Save Changes' : 'Create Education'}
        </Button>
      </div>
    </form>
  )
}
