import { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Free 5-Min Map Pack & Website Audit | Power Digital Media",
  description:
    "Scan your live Google Mobile speed, Schema.org JSON-LD, and /llms.txt AI visibility—plus request Damein Donald's 5-minute Google Map Pack video audit.",
  alternates: {
    canonical: "https://powerdigitalmedia.org/free-audit",
  },
  openGraph: {
    title: "Free 5-Min Map Pack & Website Audit | Power Digital Media",
    description:
      "Instant live website, schema, llms.txt & Google speed audit—paired with a personal 5-minute Map Pack heatmap video recorded by Damein Donald in Jackson, MS.",
    url: "https://powerdigitalmedia.org/free-audit",
    images: ["/images/og-image.png"],
  },
};

export default function FreeAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://powerdigitalmedia.org/" },
          { name: "Free Rank & Site Audit", url: "https://powerdigitalmedia.org/free-audit" },
        ]}
      />
      {children}
    </>
  );
}
