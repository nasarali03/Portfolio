import { About } from '@/components/sections/about';
import { Certifications } from '@/components/sections/certifications';
import { Contact } from '@/components/sections/contact';
import { Education } from '@/components/sections/education';
import { Experience } from '@/components/sections/experience';
import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { getPortfolioData } from '@/lib/data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default async function PortfolioPage() {
  const data = await getPortfolioData();

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Hero content={data.hero} />
        <About content={data.about} />
        <Projects content={data.projects} />
        <Experience content={data.experience} />
        <Education content={data.education} />
        <Certifications content={data.certifications} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
