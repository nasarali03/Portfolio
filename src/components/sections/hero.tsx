import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';
import type { HeroContent } from '@/lib/types';

export function Hero({ content }: { content: HeroContent }) {
  const { name, title, intro, resumeUrl, profileUrl, profileHint } = content;

  // Use the profileUrl from the database, fallback to local image if not available
  const imageSrc = profileUrl || '/ali2.png';

  return (
    <section id="hero" className="bg-secondary !py-4 md:!py-6 lg:!py-8">
      <div className="container grid items-center gap-6 md:grid-cols-2 lg:gap-8">
        <div className="space-y-4 text-center md:space-y-6 md:text-left">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline animate-fade-in-up">
            {name}
          </h1>
          <p className="text-2xl font-medium text-primary md:text-3xl animate-fade-in-up animation-delay-200">{title}</p>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:mx-0 md:text-xl animate-fade-in-up animation-delay-400">
            {intro}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start animate-fade-in-up animation-delay-600">
            <Button size="lg" asChild className="hover:scale-105 transition-transform duration-300">
              <Link href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="hover:scale-105 transition-transform duration-300">
              <Link href="#contact">
                <Send className="mr-2 h-4 w-4" />
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative mx-auto w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] animate-fade-in-up animation-delay-800">
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 animate-spin-slow">
            <div className="w-full h-full rounded-full bg-background"></div>
          </div>
          
          {/* Main image container */}
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-background hover:shadow-3xl transition-all duration-500 hover:scale-105">
            <Image
              src={imageSrc}
              alt={name}
              width={1000}
              height={1000}
              priority
              className="object-cover object-top transform scale-80 transition-transform duration-700 hover:scale-90"
              data-ai-hint={profileHint}
            />
            
            {/* Overlay effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 -right-4 w-2 h-2 bg-pink-400 rounded-full animate-pulse animation-delay-2000"></div>
          <div className="absolute -top-4 -left-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse animation-delay-500"></div>
          <div className="absolute top-1/4 -left-6 w-3 h-3 bg-indigo-400 rounded-full animate-pulse animation-delay-1500"></div>
          <div className="absolute -bottom-4 -right-6 w-2 h-2 bg-emerald-400 rounded-full animate-pulse animation-delay-2500"></div>
          <div className="absolute top-3/4 -right-8 w-1 h-1 bg-yellow-400 rounded-full animate-pulse animation-delay-3000"></div>
          <div className="absolute -top-6 left-1/4 w-2 h-2 bg-rose-400 rounded-full animate-pulse animation-delay-3500"></div>
          <div className="absolute bottom-1/4 -left-4 w-1 h-1 bg-violet-400 rounded-full animate-pulse animation-delay-4000"></div>
          <div className="absolute -bottom-6 right-1/3 w-3 h-3 bg-teal-400 rounded-full animate-pulse animation-delay-4500"></div>
          <div className="absolute top-1/6 -right-10 w-2 h-2 bg-orange-400 rounded-full animate-pulse animation-delay-5000"></div>
          <div className="absolute -top-8 -left-4 w-1 h-1 bg-sky-400 rounded-full animate-pulse animation-delay-5500"></div>
          <div className="absolute top-1/3 -left-8 w-2 h-2 bg-lime-400 rounded-full animate-pulse animation-delay-6000"></div>
          <div className="absolute -bottom-8 left-1/2 w-1 h-1 bg-fuchsia-400 rounded-full animate-pulse animation-delay-6500"></div>
          <div className="absolute top-2/3 -right-12 w-3 h-3 bg-amber-400 rounded-full animate-pulse animation-delay-7000"></div>
          <div className="absolute -top-10 right-1/4 w-1 h-1 bg-slate-400 rounded-full animate-pulse animation-delay-7500"></div>
          <div className="absolute bottom-1/6 -left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse animation-delay-8000"></div>
        </div>
      </div>
    </section>
  );
}
