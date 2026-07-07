import PrivacyClient from "./PrivacyClient";

export const metadata = {
    title: "Privacy Policy | Power Digital Media",
    description: "Privacy Policy for Power Digital Media.",
    robots: {
        index: false,
        follow: true,
    },
};

export default function PrivacyPage() {
    return <PrivacyClient />;
}
