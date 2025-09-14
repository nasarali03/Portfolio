import { About } from '@/components/sections/about';
import { getPortfolioData } from '@/lib/data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default async function AboutPage() {
    const data = await getPortfolioData();

    return (
        <div className="flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">
                <About content={data.about} />
            </main>
            <Footer />
        </div>
    );
}
