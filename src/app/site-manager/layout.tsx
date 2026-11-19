import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDM Site Manager | Mobile Website & Menu Publishing App",
  description:
    "Update website photos, menus, pricing, and specials from your phone in under 60 seconds—without breaking layout speed or touching WordPress plugins.",
  alternates: {
    canonical: "https://powerdigitalmedia.org/site-manager",
  },
  openGraph: {
    title: "PDM Site Manager | Mobile Website & Menu Publishing App",
    description:
      "Snap a jobsite or menu photo, tap publish, and watch your custom Next.js website update globally in seconds.",
    url: "https://powerdigitalmedia.org/site-manager",
  },
};

export default function SiteManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
