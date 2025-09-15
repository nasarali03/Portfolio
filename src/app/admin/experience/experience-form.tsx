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
import { upsertExperienceAction } from './actions'
import type { Experience } from '@/lib/types'
import { Loader2, Upload, X, Trash } from 'lucide-react'
import Image from 'next/image'

const experienceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  company: z.string().min(2, 'Company must be at least 2 characters'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  order: z.coerce.number().min(0),
  logoFile: z.instanceof(File).optional(),
})

type ExperienceFormData = z.infer<typeof experienceSchema>

interface ExperienceFormProps {
  experience?: Experience
  onFinished?: () => void
}

export function ExperienceForm({ experience, onFinished }: ExperienceFormProps) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: experience?.title || '',
      company: experience?.company || '',
      startDate: experience?.startDate || '',
      endDate: experience?.endDate || '',
      description: experience?.description.join('\n') || '',
      order: experience?.order || 0,
    },
  })

  const watchedLogoFile = watch('logoFile')

  const onSubmit = (data: ExperienceFormData) => {
    startTransition(async () => {
      try {
        await upsertExperienceAction({
          id: experience?.id,
          ...data,
          description: data.description.split('\n').filter(line => line.trim() !== ''),
        })
        toast({
          title: 'Success!',
          description: `Experience has been ${experience ? 'updated' : 'created'}.`,
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

  // Handle logo file selection
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setValue('logoFile', file)
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setPreviewImage(previewUrl)
    }
  }

  // Remove selected logo
  const removeLogo = () => {
    setValue('logoFile', undefined)
    setPreviewImage(null)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" {...register('title')} />
          {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" {...register('company')} />
          {errors.company && <p className="text-destructive text-sm mt-1">{errors.company.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input id="startDate" {...register('startDate')} placeholder="Jan 2020" />
          {errors.startDate && <p className="text-destructive text-sm mt-1">{errors.startDate.message}</p>}
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input id="endDate" {...register('endDate')} placeholder="Present" />
          {errors.endDate && <p className="text-destructive text-sm mt-1">{errors.endDate.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="order">Display Order</Label>
        <Input id="order" type="number" {...register('order')} />
        {errors.order && <p className="text-destructive text-sm mt-1">{errors.order.message}</p>}
      </div>

      {/* Logo Upload Section */}
      <div className="space-y-2">
        <Label>Company Logo</Label>
        <div className="space-y-4">
          {/* Logo Preview */}
          {(previewImage || experience?.logoUrl) && (
            <div className="relative w-24 h-24">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
                <Image
                  src={previewImage || experience?.logoUrl || ''}
                  alt="Company logo preview"
                  fill
                  className="object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 h-6 w-6 p-0"
                  onClick={removeLogo}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {/* File Input */}
          <div className="flex items-center gap-4">
            <input
              type="file"
              id="logoFile"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            <Label
              htmlFor="logoFile"
              className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <Upload className="h-4 w-4" />
              {watchedLogoFile ? 'Change Logo' : 'Upload Logo'}
            </Label>
            {watchedLogoFile && (
              <span className="text-sm text-muted-foreground">
                {watchedLogoFile.name}
              </span>
            )}
          </div>
          {errors.logoFile && <p className="text-destructive text-sm mt-1">{errors.logoFile.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="description">Key Achievements (one per line)</Label>
        <Textarea 
          id="description" 
          {...register('description')} 
          rows={6}
          placeholder="• Led the development of a new design system&#10;• Architected and implemented a scalable frontend&#10;• Mentored junior developers"
        />
        {errors.description && <p className="text-destructive text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div className="flex justify-end gap-2">
        {experience && (
          <Button type="button" variant="destructive" disabled={isPending}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </Button>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {experience ? 'Save Changes' : 'Create Experience'}
        </Button>
      </div>
    </form>
  )
}
