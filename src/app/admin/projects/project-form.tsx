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
import { generateSummaryAction, upsertProjectAction } from './actions'
import type { Project } from '@/lib/types'
import { Loader2, Sparkles, Trash } from 'lucide-react'

const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  techStack: z.string().min(1, 'At least one technology is required'),
  githubUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  liveUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  order: z.coerce.number().min(0),
})

type ProjectFormData = z.infer<typeof projectSchema>

interface ProjectFormProps {
  project?: Project
  onFinished?: () => void
}

export function ProjectForm({ project, onFinished }: ProjectFormProps) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [isGenerating, setIsGenerating] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      summary: project?.summary || '',
      techStack: project?.techStack.join(', ') || '',
      githubUrl: project?.githubUrl || '',
      liveUrl: project?.liveUrl || '',
      order: project?.order || 0,
    },
  })

  const onSubmit = (data: ProjectFormData) => {
    startTransition(async () => {
      try {
        await upsertProjectAction({
          id: project?.id,
          ...data,
          techStack: data.techStack.split(',').map(s => s.trim()),
        })
        toast({
          title: 'Success!',
          description: `Project has been ${project ? 'updated' : 'created'}.`,
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
  
  const handleGenerateSummary = async () => {
    const { title, description } = getValues();
    if (!title || !description) {
        toast({
            title: 'Missing information',
            description: 'Please provide a title and description to generate a summary.',
            variant: 'destructive',
        });
        return;
    }

    setIsGenerating(true);
    const result = await generateSummaryAction({ title, description });
    setIsGenerating(false);

    if (result.summary) {
        setValue('summary', result.summary, { shouldValidate: true });
        toast({
            title: 'Summary Generated!',
            description: 'The AI-powered summary has been added.',
        });
    } else {
        toast({
            title: 'Error',
            description: result.error || 'Failed to generate summary.',
            variant: 'destructive',
        });
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Project Title</Label>
          <Input id="title" {...register('title')} />
          {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <Label htmlFor="order">Display Order</Label>
          <Input id="order" type="number" {...register('order')} />
          {errors.order && <p className="text-destructive text-sm mt-1">{errors.order.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="description">Full Description</Label>
        <Textarea id="description" {...register('description')} rows={5} />
        {errors.description && <p className="text-destructive text-sm mt-1">{errors.description.message}</p>}
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
            <Label htmlFor="summary">Card Summary (2-3 sentences)</Label>
            <Button type="button" variant="outline" size="sm" onClick={handleGenerateSummary} disabled={isGenerating}>
                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate with AI
            </Button>
        </div>
        <Textarea id="summary" {...register('summary')} rows={3} />
        {errors.summary && <p className="text-destructive text-sm mt-1">{errors.summary.message}</p>}
      </div>
       <div>
        <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
        <Input id="techStack" {...register('techStack')} placeholder="Next.js, Tailwind CSS, Firebase" />
        {errors.techStack && <p className="text-destructive text-sm mt-1">{errors.techStack.message}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input id="githubUrl" {...register('githubUrl')} />
          {errors.githubUrl && <p className="text-destructive text-sm mt-1">{errors.githubUrl.message}</p>}
        </div>
        <div>
          <Label htmlFor="liveUrl">Live Demo URL</Label>
          <Input id="liveUrl" {...register('liveUrl')} />
          {errors.liveUrl && <p className="text-destructive text-sm mt-1">{errors.liveUrl.message}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {project && (
          <Button type="button" variant="destructive" disabled={isPending}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </Button>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {project ? 'Save Changes' : 'Create Project'}
        </Button>
      </div>
    </form>
  )
}
