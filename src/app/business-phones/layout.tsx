import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Business VoIP Phone Systems in Jackson MS | Power Digital Media",
    description: "Cloud business phone systems powered by Ultatel. Automated CRM call logging, intelligent call routing, and crystal-clear business VoIP in Mississippi.",
    alternates: {
        canonical: "https://powerdigitalmedia.org/business-phones",
    },
    openGraph: {
        title: "Business VoIP Phone Systems in Jackson MS | Power Digital Media",
        description: "Cloud business phone systems powered by Ultatel. Automated CRM call logging, intelligent call routing, and crystal-clear business VoIP in Mississippi.",
        url: "https://powerdigitalmedia.org/business-phones",
    },
};

export default function BusinessPhonesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
