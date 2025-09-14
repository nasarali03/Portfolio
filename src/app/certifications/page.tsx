import { Certifications } from '@/components/sections/certifications';
import { getPortfolioData } from '@/lib/data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default async function CertificationsPage() {
    const data = await getPortfolioData();

    return (
        <div className="flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">
                <Certifications content={data.certifications} />
            </main>
            <Footer />
        </div>
    );
}
