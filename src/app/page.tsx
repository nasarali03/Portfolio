import { Hero } from '@/components/sections/hero';
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
      </main>
      <Footer />
    </div>
  );
}
