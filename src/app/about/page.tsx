import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "About Us | Power Digital Media",
    description: "Learn about Power Digital Media (PDM), a leading Jackson, MS digital studio. Specializing in podcast production, video marketing, and high-performance web design.",
    alternates: {
        canonical: './',
    }
};

export default function AboutPage() {
    return <AboutClient />;
}
