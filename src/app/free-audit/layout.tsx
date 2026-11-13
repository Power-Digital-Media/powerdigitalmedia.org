import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free 5-Minute Google Rank & Website Breakdown | Power Digital Media",
  description:
    "Get a personalized 5-minute video audit from Damein Donald showing where your contractor or local business ranks on Google Maps in Jackson, Madison, Brandon & Flowood—and how to pull more calls.",
  alternates: {
    canonical: "https://powerdigitalmedia.org/free-audit",
  },
  openGraph: {
    title: "Free 5-Minute Google Rank & Website Breakdown | Power Digital Media",
    description:
      "See why competitors are outranking you in the Google Map Pack and where mobile leads are leaking—recorded personally by Damein Donald in Jackson, MS.",
    url: "https://powerdigitalmedia.org/free-audit",
  },
};

export default function FreeAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
