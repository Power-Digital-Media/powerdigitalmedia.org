import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jackson, MS Web Design & 0.8s Websites | Power Digital",
  description:
    "Custom 0.8s Next.js websites in Jackson, MS for contractors, restaurants, and local brands across Madison, Ridgeland, Brandon, Flowood & Flora.",
  alternates: {
    canonical: "https://powerdigitalmedia.org/web-design",
  },
  openGraph: {
    title: "Jackson, MS Web Design & 0.8s Websites | Power Digital",
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
