import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
    title: "Privacy Policy | Power Digital Media",
    description: "Privacy Policy for Power Digital Media.",
    robots: {
        index: false,
        follow: true,
    },
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <Navbar />
            <div className="container px-4 mx-auto max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-invert">
                    <p>Last Updated: February 2026</p>
                    <p>
                        Power Digital Media ("we", "us", or "our") respects your privacy and is committed to protecting your personal data.
                        This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from)
                        and tell you about your privacy rights and how the law protects you.
                    </p>
                    <p>
                        We collect data primarily to communicate with you regarding our services (Podcasting, Web Design, Video Production).
                        We do not sell your personal data to third parties.
                    </p>
                    <p>For more details, please contact us at info@powerdigitalmedia.org.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
