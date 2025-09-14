'use client';

import type { AboutContent } from '@/lib/types';
import Image from 'next/image';

export function About({ content }: { content: AboutContent }) {
  const { bio, skills, profileUrl, profileHint } = content;

  return (
    <section id="about">
      <div className="container space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">About Me</h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground md:text-xl">
            A little bit about my background and the skills I bring to the table.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            <div className='relative h-64 w-64 md:h-auto md:w-full mx-auto'>
                 <Image 
                    src={profileUrl}
                    alt="About me profile picture"
                    fill
                    className="rounded-2xl object-cover"
                    data-ai-hint={profileHint}
                    />
            </div>
            <div className="md:col-span-2 space-y-6">
                <h3 className="text-2xl font-bold">Who I Am</h3>
                <p className="text-muted-foreground leading-relaxed">
                    {bio}
                </p>
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold">My Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                            <div key={skill.id} className="pill-tag">
                                {skill.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
