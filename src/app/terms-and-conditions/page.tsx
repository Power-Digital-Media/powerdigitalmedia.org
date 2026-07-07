import TermsClient from "../terms/TermsClient";

export const metadata = {
    title: "Terms of Service | Power Digital Media",
    description: "Terms of Service for Power Digital Media.",
    robots: {
        index: false,
        follow: true,
    },
};

export default function TermsAndConditionsPage() {
    return <TermsClient />;
}
