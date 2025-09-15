'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { upsertSkillAction } from './actions'
import type { Skill } from '@/lib/types'
import { Loader2, Trash } from 'lucide-react'

const skillSchema = z.object({
  name: z.string().min(2, 'Skill name must be at least 2 characters'),
  category: z.enum(['Language', 'Framework/Library', 'Tool', 'Platform'], {
    required_error: 'Please select a category',
  }),
})

type SkillFormData = z.infer<typeof skillSchema>

interface SkillFormProps {
  skill?: Skill
  onFinished?: () => void
}

export function SkillForm({ skill, onFinished }: SkillFormProps) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: skill?.name || '',
      category: skill?.category || 'Language',
    },
  })

  const watchedCategory = watch('category')

  const onSubmit = (data: SkillFormData) => {
    startTransition(async () => {
      try {
        await upsertSkillAction({
          id: skill?.id,
          ...data,
        })
        toast({
          title: 'Success!',
          description: `Skill has been ${skill ? 'updated' : 'created'}.`,
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
          <Label htmlFor="name">Skill Name</Label>
          <Input id="name" {...register('name')} placeholder="React" />
          {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={watchedCategory} onValueChange={(value) => setValue('category', value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Language">Language</SelectItem>
              <SelectItem value="Framework/Library">Framework/Library</SelectItem>
              <SelectItem value="Tool">Tool</SelectItem>
              <SelectItem value="Platform">Platform</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && <p className="text-destructive text-sm mt-1">{errors.category.message}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {skill && (
          <Button type="button" variant="destructive" disabled={isPending}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </Button>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {skill ? 'Save Changes' : 'Create Skill'}
        </Button>
      </div>
    </form>
  )
}
