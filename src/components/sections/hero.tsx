import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';
import type { HeroContent } from '@/lib/types';

export function Hero({ content }: { content: HeroContent }) {
  const { name, title, intro, resumeUrl, profileUrl, profileHint } = content;

  // Use the ali1.png image for the hero section
  const localProfileSrc = '/ali1.png';
  const imageSrc = localProfileSrc;

  return (
    <section id="hero" className="bg-secondary !py-4 md:!py-6 lg:!py-8">
      <div className="container grid items-center gap-6 md:grid-cols-2 lg:gap-8">
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
              <Link href="#contact">
                <Send className="mr-2 h-4 w-4" />
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative mx-auto w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]">
          {/* wrapper keeps rounded overflow while allowing us to scale/zoom the image */}
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-4 border-background">
            <Image
              src={imageSrc}
              alt={name}
              width={1000}
              height={1000}
              priority
              className="object-cover object-center transform scale-125"
              data-ai-hint={profileHint}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
