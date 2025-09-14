'use client';

import type { Education as EducationType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { GraduationCap } from 'lucide-react';

export function Education({ content }: { content: EducationType[] }) {
  return (
    <section id="education" className="bg-secondary">
      <div className="container space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Education</h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground md:text-xl">
            My academic background and qualifications.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
            {content.map(item => (
                <Card key={item.id} className="rounded-2xl">
                    <CardHeader className='flex-row items-start gap-4'>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <GraduationCap className='h-6 w-6' />
                        </div>
                        <div>
                            <CardTitle>{item.degree}</CardTitle>
                            <p className="font-semibold">{item.institution}</p>
                            <p className="text-sm text-muted-foreground">{item.startDate} - {item.endDate}</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className='text-muted-foreground'>{item.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
