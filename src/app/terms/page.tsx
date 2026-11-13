import TermsClient from "./TermsClient";

export const metadata = {
    title: "Terms of Service | Power Digital Media LLC",
    description: "Terms of Service, SaaS field app licensing, and SMS messaging terms for Power Digital Media LLC.",
    alternates: {
        canonical: "/terms",
    },
};

export default function TermsPage() {
    return <TermsClient />;
}
