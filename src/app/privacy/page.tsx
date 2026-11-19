import PrivacyClient from "./PrivacyClient";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = {
    title: "Privacy Policy & SMS Compliance | Power Digital Media",
    description: "Read the Privacy Policy, A2P 10DLC SMS compliance terms, and client data protection standards for Power Digital Media LLC in Jackson, Mississippi.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/privacy",
    },
};

export default function PrivacyPage() {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://powerdigitalmedia.org/" },
                    { name: "Privacy Policy", url: "https://powerdigitalmedia.org/privacy" },
                ]}
            />
            <PrivacyClient />
        </>
    );
}
