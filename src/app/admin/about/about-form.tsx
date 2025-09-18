'use client'

import { useState, useTransition } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { updateAboutContent, getAboutContent } from './actions'
import type { AboutContent, Skill } from '@/lib/types'
import { Loader2, Upload, X, Image as ImageIcon, Plus, Trash } from 'lucide-react'
import Image from 'next/image'

const aboutSchema = z.object({
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  skills: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, 'Skill name is required'),
    category: z.enum(['Language', 'Framework/Library', 'Tool', 'Platform'])
  })).min(1, 'At least one skill is required'),
  profileFile: z.instanceof(File).optional(),
})

type AboutFormData = z.infer<typeof aboutSchema>

interface AboutFormProps {
  aboutContent?: AboutContent
  onFinished?: () => void
}

export function AboutForm({ aboutContent, onFinished }: AboutFormProps) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AboutFormData>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      bio: aboutContent?.bio || '',
      skills: aboutContent?.skills || [{ id: '1', name: '', category: 'Language' }],
    },
  })

  const watchedProfileFile = watch('profileFile')
  const watchedSkills = watch('skills')

  const onSubmit = (data: AboutFormData) => {
    startTransition(async () => {
      try {
        await updateAboutContent({
          bio: data.bio,
          skills: data.skills,
          profileFile: data.profileFile,
        })
        toast({
          title: 'Success!',
          description: 'About section has been updated.',
        })
        onFinished?.()
      } catch (error) {
        console.error('Error updating about content:', error)
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

  // Add new skill
  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      category: 'Language'
    }
    setValue('skills', [...watchedSkills, newSkill])
  }

  // Remove skill
  const removeSkill = (index: number) => {
    if (watchedSkills.length > 1) {
      const updatedSkills = watchedSkills.filter((_, i) => i !== index)
      setValue('skills', updatedSkills)
    }
  }

  // Update skill
  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const updatedSkills = watchedSkills.map((skill, i) => 
      i === index ? { ...skill, [field]: value } : skill
    )
    setValue('skills', updatedSkills)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Profile Image Upload Section */}
      <div className="space-y-2">
        <Label>Profile Image</Label>
        <div className="space-y-4">
          {/* Image Preview */}
          {(previewImage || aboutContent?.profileUrl) && (
            <div className="relative w-full max-w-md">
              <div className="relative aspect-square rounded-lg overflow-hidden border">
                <Image
                  src={previewImage || aboutContent?.profileUrl || ''}
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

      {/* Bio Section */}
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea 
          id="bio" 
          {...register('bio')} 
          rows={6}
          placeholder="Tell us about yourself..."
        />
        {errors.bio && <p className="text-destructive text-sm mt-1">{errors.bio.message}</p>}
      </div>

      {/* Skills Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Skills</Label>
          <Button type="button" variant="outline" size="sm" onClick={addSkill}>
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </div>
        <div className="space-y-3">
          {watchedSkills.map((skill, index) => (
            <div key={skill.id} className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="flex-1">
                <Input
                  placeholder="Skill name"
                  value={skill.name}
                  onChange={(e) => updateSkill(index, 'name', e.target.value)}
                />
              </div>
              <div className="w-40">
                <select
                  value={skill.category}
                  onChange={(e) => updateSkill(index, 'category', e.target.value as Skill['category'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Language">Language</option>
                  <option value="Framework/Library">Framework/Library</option>
                  <option value="Tool">Tool</option>
                  <option value="Platform">Platform</option>
                </select>
              </div>
              {watchedSkills.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSkill(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        {errors.skills && <p className="text-destructive text-sm mt-1">{errors.skills.message}</p>}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update About Section
        </Button>
      </div>
    </form>
  )
}
