import { Experience } from '@/components/sections/experience';
import { getPortfolioData } from '@/lib/data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default async function ExperiencePage() {
    const data = await getPortfolioData();

    return (
        <div className="flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">
                <Experience content={data.experience} />
            </main>
            <Footer />
        </div>
    );
}
