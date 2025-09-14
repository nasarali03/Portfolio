import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/types';
import { Github, Link as LinkIcon } from 'lucide-react';
import { Badge } from './ui/badge';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-105">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            data-ai-hint={project.imageHint}
          />
        </div>
        <div className="p-6 pb-2">
          <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <p className="text-muted-foreground">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map(tech => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {project.githubUrl && (
          <Button variant="ghost" size="sm" asChild>
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
        )}
        {project.liveUrl && (
          <Button variant="ghost" size="sm" asChild>
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <LinkIcon className="mr-2 h-4 w-4" />
              Live Demo
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
