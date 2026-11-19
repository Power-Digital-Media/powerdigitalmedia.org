import TermsClient from "./TermsClient";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = {
    title: "Terms of Service & App Licensing | Power Digital Media",
    description: "Review the Terms of Service, custom web engineering agreements, SaaS field app licensing, and SMS messaging terms for Power Digital Media LLC.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/terms",
    },
};

export default function TermsPage() {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://powerdigitalmedia.org/" },
                    { name: "Terms of Service", url: "https://powerdigitalmedia.org/terms" },
                ]}
            />
            <TermsClient />
        </>
    );
}
