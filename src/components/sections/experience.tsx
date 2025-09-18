'use client';

import type { Experience as ExperienceType } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export function Experience({ content }: { content: ExperienceType[] }) {
  return (
    <motion.section 
      id="experience"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Work Experience</h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground md:text-xl">
            My professional journey and key accomplishments.
          </p>
        </div>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>

          <div className="space-y-12">
            {content.map((item, index) => (
              <div key={item.id} className="relative flex items-start gap-6">
                {/* Icon */}
                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Briefcase className="h-6 w-6" />
                </div>

                <div className="w-full md:w-[calc(50%-3rem)]">
                    <Card className="rounded-2xl shadow-md">
                        <CardHeader className='flex-row items-start gap-4 space-y-0'>
                            {item.logoUrl ? (
                                <Image src={item.logoUrl} alt={`${item.company} logo`} width={48} height={48} className='rounded-md border' data-ai-hint={item.logoHint} />
                            ) : (
                                <div className="w-12 h-12 bg-muted rounded-md border flex items-center justify-center">
                                    <Briefcase className="h-6 w-6 text-muted-foreground" />
                                </div>
                            )}
                            <div>
                                <CardTitle>{item.title}</CardTitle>
                                <p className="font-semibold text-primary">{item.company}</p>
                                <p className="text-sm text-muted-foreground">{item.startDate} - {item.endDate}</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                                {item.description.map((desc, i) => (
                                    <li key={i}>{desc}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
