'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { upsertCertificationAction } from './actions'
import type { Certification } from '@/lib/types'
import { Loader2, Trash } from 'lucide-react'

const certificationSchema = z.object({
  name: z.string().min(3, 'Certification name must be at least 3 characters'),
  provider: z.string().min(2, 'Provider must be at least 2 characters'),
  url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  order: z.coerce.number().min(0),
})

type CertificationFormData = z.infer<typeof certificationSchema>

interface CertificationFormProps {
  certification?: Certification
  onFinished?: () => void
}

export function CertificationForm({ certification, onFinished }: CertificationFormProps) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CertificationFormData>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: certification?.name || '',
      provider: certification?.provider || '',
      url: certification?.url || '',
      order: certification?.order || 0,
    },
  })

  const onSubmit = (data: CertificationFormData) => {
    startTransition(async () => {
      try {
        await upsertCertificationAction({
          id: certification?.id,
          ...data,
        })
        toast({
          title: 'Success!',
          description: `Certification has been ${certification ? 'updated' : 'created'}.`,
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
          <Label htmlFor="name">Certification Name</Label>
          <Input id="name" {...register('name')} placeholder="Professional Cloud Developer" />
          {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="provider">Provider</Label>
          <Input id="provider" {...register('provider')} placeholder="Google Cloud" />
          {errors.provider && <p className="text-destructive text-sm mt-1">{errors.provider.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="url">Certificate URL (Optional)</Label>
        <Input id="url" {...register('url')} placeholder="https://example.com/certificate" />
        {errors.url && <p className="text-destructive text-sm mt-1">{errors.url.message}</p>}
      </div>

      <div>
        <Label htmlFor="order">Display Order</Label>
        <Input id="order" type="number" {...register('order')} />
        {errors.order && <p className="text-destructive text-sm mt-1">{errors.order.message}</p>}
      </div>

      <div className="flex justify-end gap-2">
        {certification && (
          <Button type="button" variant="destructive" disabled={isPending}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </Button>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {certification ? 'Save Changes' : 'Create Certification'}
        </Button>
      </div>
    </form>
  )
}
