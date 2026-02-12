import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
    title: "Terms of Service | Power Digital Media",
    description: "Terms of Service for Power Digital Media.",
    robots: {
        index: false,
        follow: true,
    },
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <Navbar />
            <div className="container px-4 mx-auto max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-invert">
                    <p>Last Updated: February 2026</p>
                    <p>
                        Welcome to Power Digital Media. By using our website and services, you agree to comply with and be bound by the following terms and conditions.
                    </p>
                    <h2>1. Use of Services</h2>
                    <p>
                        Our services, including podcast production, video marketing, and web design, are subject to separate service agreements.
                        The content on this website is for general information purposes.
                    </p>
                    <h2>2. Intellectual Property</h2>
                    <p>
                        All content on this site, including text, graphics, logos, and images, is the property of Power Digital Media or its content suppliers
                        and is protected by international copyright laws.
                    </p>
                    <p>For inquiries, please contact info@powerdigitalmedia.org.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
