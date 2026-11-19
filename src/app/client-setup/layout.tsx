import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Integration Setup | Power Digital Media",
  description:
    "Configure your Capsule CRM and Transpond marketing automation onboarding profile.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ClientSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
