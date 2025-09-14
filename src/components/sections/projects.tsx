import { ProjectCard } from '@/components/project-card';
import type { Project } from '@/lib/types';

export function Projects({ content }: { content: Project[] }) {
  return (
    <section id="projects" className="bg-secondary">
      <div className="container space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">My Projects</h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground md:text-xl">
            Here are some of the projects I'm proud to have worked on.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
