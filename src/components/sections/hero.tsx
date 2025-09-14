import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';
import type { HeroContent } from '@/lib/types';

export function Hero({ content }: { content: HeroContent }) {
  const { name, title, intro, resumeUrl, profileUrl, profileHint } = content;
  return (
    <section id="hero" className="bg-secondary">
      <div className="container grid items-center gap-8 md:grid-cols-2 lg:gap-12 py-16 md:py-24 lg:py-32">
        <div className="space-y-4 text-center md:space-y-6 md:text-left">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
            {name}
          </h1>
          <p className="text-2xl font-medium text-primary md:text-3xl">{title}</p>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:mx-0 md:text-xl">
            {intro}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Button size="lg" asChild>
              <Link href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                <Send className="mr-2 h-4 w-4" />
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <Image
            src={profileUrl}
            alt={name}
            width={400}
            height={400}
            priority
            className="rounded-full object-cover shadow-lg border-4 border-background"
            data-ai-hint={profileHint}
          />
        </div>
      </div>
    </section>
  );
}
