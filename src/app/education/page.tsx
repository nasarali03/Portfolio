import { Education } from '@/components/sections/education';
import { getPortfolioData } from '@/lib/data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default async function EducationPage() {
    const data = await getPortfolioData();

    return (
        <div className="flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">
                <Education content={data.education} />
            </main>
            <Footer />
        </div>
    );
}
