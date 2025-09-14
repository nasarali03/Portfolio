import { Projects } from '@/components/sections/projects';
import { getPortfolioData } from '@/lib/data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default async function ProjectsPage() {
    const data = await getPortfolioData();

    return (
        <div className="flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">
                <Projects content={data.projects} />
            </main>
            <Footer />
        </div>
    );
}
