import { Contact } from '@/components/sections/contact';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function ContactPage() {
    return (
        <div className="flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
