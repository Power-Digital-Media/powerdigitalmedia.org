import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Portfolio from "@/components/sections/Portfolio";

const Services = dynamic(() => import("@/components/sections/Services"));
const TechStack = dynamic(() => import("@/components/sections/TechStack"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar />
      <Portfolio />
      <Services />
      <TechStack />
      <Contact />
      <Footer />
    </main>
  );
}
