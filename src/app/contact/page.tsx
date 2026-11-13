import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export default function StandaloneContactPage() {
  return (
    <main className="relative min-h-screen bg-[#06080f] text-white">
      <BreadcrumbSchema
        items={[
          { name: "Contact", url: "https://powerdigitalmedia.org/contact" },
        ]}
      />
      <Navbar />
      <Contact formSource="contact-page" isStandalonePage />
      <Footer />
    </main>
  );
}
