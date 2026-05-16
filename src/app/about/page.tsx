import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "About Us | Power Digital Media — AI-Ready Web Architecture in Jackson, MS",
    description: "Power Digital Media is a Jackson, MS infrastructure engineering firm specializing in high-velocity Next.js architecture, AI search dominance, structured data systems, and broadcast-grade media production.",
    alternates: {
        canonical: './',
    }
};

export default function AboutPage() {
    return <AboutClient />;
}
