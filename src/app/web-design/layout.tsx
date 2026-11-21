import { Metadata } from "next";

export const metadata: Metadata = {
  title: "5.0★ Jackson, MS Web Design & 0.8s Sites | Power Digital",
  description:
    "Custom 0.8s websites, Google Map Pack SEO & Capsule CRM built in Jackson, MS for contractors & local brands. See live builds or call (601) 446-2393.",
  alternates: {
    canonical: "https://powerdigitalmedia.org/web-design",
  },
  openGraph: {
    title: "5.0★ Jackson, MS Web Design & 0.8s Sites | Power Digital",
    description:
      "Custom 0.8s Next.js websites, Google Map Pack optimization, 0%-fee Square ordering, and Capsule CRM automation—engineered in Jackson, Mississippi.",
    url: "https://powerdigitalmedia.org/web-design",
    images: ["/portfolio/growth-engine-real.webp"],
  },
};

export default function WebDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
