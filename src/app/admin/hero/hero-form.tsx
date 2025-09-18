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
import { updateHeroContent } from './actions'
import type { HeroContent } from '@/lib/types'
import { Loader2, Upload, X } from 'lucide-react'
import Image from 'next/image'

const heroSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  intro: z.string().min(10, 'Intro must be at least 10 characters'),
  resumeUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  profileFile: z.instanceof(File).optional(),
})

type HeroFormData = z.infer<typeof heroSchema>

interface HeroFormProps {
  heroContent?: HeroContent
  onFinished?: () => void
}

export function HeroForm({ heroContent, onFinished }: HeroFormProps) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HeroFormData>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      name: heroContent?.name || '',
      title: heroContent?.title || '',
      intro: heroContent?.intro || '',
      resumeUrl: heroContent?.resumeUrl || '',
    },
  })

  const watchedProfileFile = watch('profileFile')

  const onSubmit = (data: HeroFormData) => {
    startTransition(async () => {
      try {
        await updateHeroContent({
          name: data.name,
          title: data.title,
          intro: data.intro,
          resumeUrl: data.resumeUrl || undefined,
          profileFile: data.profileFile,
        })
        toast({
          title: 'Success!',
          description: 'Hero section has been updated.',
        })
        onFinished?.()
      } catch (error) {
        console.error('Error updating hero content:', error)
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong.'
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        })
      }
    })
  }

  // Handle profile image file selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (1MB limit for Firestore)
      const maxSize = 1024 * 1024; // 1MB in bytes
      if (file.size > maxSize) {
        toast({
          title: 'File too large',
          description: 'Please select an image smaller than 1MB.',
          variant: 'destructive',
        })
        return
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please select an image file.',
          variant: 'destructive',
        })
        return
      }

      setValue('profileFile', file)
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setPreviewImage(previewUrl)
    }
  }

  // Remove selected image
  const removeImage = () => {
    setValue('profileFile', undefined)
    setPreviewImage(null)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Profile Image Upload Section */}
      <div className="space-y-2">
        <Label>Profile Image</Label>
        <div className="space-y-4">
          {/* Image Preview */}
          {(previewImage || heroContent?.profileUrl) && (
            <div className="relative w-full max-w-md">
              <div className="relative aspect-square rounded-lg overflow-hidden border">
                <Image
                  src={previewImage || heroContent?.profileUrl || ''}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* File Input */}
          <div className="flex items-center gap-4">
            <input
              type="file"
              id="profileFile"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <Label
              htmlFor="profileFile"
              className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <Upload className="h-4 w-4" />
              {watchedProfileFile ? 'Change Image' : 'Upload Image'}
            </Label>
            {watchedProfileFile && (
              <span className="text-sm text-muted-foreground">
                {watchedProfileFile.name}
              </span>
            )}
          </div>
          {errors.profileFile && <p className="text-destructive text-sm mt-1">{errors.profileFile.message}</p>}
        </div>
      </div>

      {/* Name */}
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" {...register('name')} placeholder="Nasar Ali" />
        {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/* Title */}
      <div>
        <Label htmlFor="title">Professional Title</Label>
        <Input id="title" {...register('title')} placeholder="Backend and AI Developer" />
        {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message}</p>}
      </div>

      {/* Intro */}
      <div>
        <Label htmlFor="intro">Introduction</Label>
        <Textarea 
          id="intro" 
          {...register('intro')} 
          rows={4}
          placeholder="I build robust, scalable backend systems and intelligent AI-powered applications."
        />
        {errors.intro && <p className="text-destructive text-sm mt-1">{errors.intro.message}</p>}
      </div>

      {/* Resume URL */}
      <div>
        <Label htmlFor="resumeUrl">Resume URL</Label>
        <Input id="resumeUrl" {...register('resumeUrl')} placeholder="/resume.pdf" />
        {errors.resumeUrl && <p className="text-destructive text-sm mt-1">{errors.resumeUrl.message}</p>}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Hero Section
        </Button>
      </div>
    </form>
  )
}
