import type { Certification } from '@/lib/types';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Award, ExternalLink } from 'lucide-react';

export function Certifications({ content }: { content: Certification[] }) {
  return (
    <section id="certifications">
      <div className="container space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Certifications</h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground md:text-xl">
            My professional certifications and credentials.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.map(cert => (
            <Link href={cert.url} key={cert.id} target="_blank" rel="noopener noreferrer" className='group'>
                <div className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Award className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold">{cert.name}</p>
                        <p className="text-sm text-muted-foreground group-hover:text-accent-foreground">{cert.provider}</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
