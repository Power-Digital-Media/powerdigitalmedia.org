import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "../typography.css";

export const metadata = {
    title: "Refund Policy | Power Digital Media",
    description: "Refund and cancellation policy for Power Digital Media services including web design, podcasting, and video production.",
    robots: {
        index: true,
        follow: true,
    },
};

export default function RefundPolicyPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <Navbar />
            <div className="container px-4 mx-auto max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
                <div className="prose prose-invert">
                    <p>Last Updated: April 2026</p>

                    <p>
                        At Power Digital Media LLC (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), we are committed
                        to delivering high-quality digital services. We understand that circumstances may change, and we
                        want to ensure our refund policy is transparent, fair, and clearly understood before you engage our services.
                    </p>

                    <h2>1. Service-Based Business</h2>
                    <p>
                        Power Digital Media provides custom creative and digital services, including but not limited to
                        web design and development, podcast production, video production, digital marketing, and content strategy.
                        Because our services involve significant time, labor, and creative effort, all work is custom and
                        non-resalable in nature.
                    </p>

                    <h2>2. Deposits &amp; Milestone Payments</h2>
                    <p>
                        All projects require a non-refundable deposit to reserve your project slot and begin work. The deposit
                        amount is outlined in your signed service agreement or invoice and typically ranges from 25% to 50% of
                        the total project cost. This deposit covers initial discovery, research, planning, and resource allocation.
                    </p>

                    <h2>3. Refund Eligibility</h2>
                    <p>
                        Refunds may be considered under the following conditions:
                    </p>
                    <ul>
                        <li>
                            <strong>Work Not Yet Started:</strong> If you cancel your project before any work has begun beyond
                            the initial deposit scope, you may be eligible for a refund of milestone payments made (excluding
                            the non-refundable deposit).
                        </li>
                        <li>
                            <strong>Work In Progress:</strong> If work has already begun on your project, you are only eligible
                            for a <strong>partial refund</strong> reflecting the portion of work not yet completed. The deposit
                            and all completed work remain non-refundable. The refundable amount will be calculated based on the
                            percentage of project milestones remaining at the time of cancellation.
                        </li>
                        <li>
                            <strong>Service Not Delivered:</strong> If we fail to deliver the agreed-upon services within the
                            timeline specified in your service agreement (and no extension has been mutually agreed upon), you
                            may request a partial refund for the undelivered portion of work.
                        </li>
                        <li>
                            <strong>Duplicate Charges:</strong> Any accidental duplicate charges will be refunded in full
                            within 5–10 business days of notification.
                        </li>
                    </ul>
                    <p>
                        <strong>Please note:</strong> Once any project work has commenced, a full refund is not available
                        under any circumstances. This ensures fair compensation for the time, creativity, and resources
                        already invested in your project.
                    </p>

                    <h2>4. Non-Refundable Items</h2>
                    <p>The following are non-refundable under any circumstances:</p>
                    <ul>
                        <li>Project deposits</li>
                        <li>Work already completed and delivered (drafts, designs, code, media files)</li>
                        <li>Third-party costs incurred on your behalf (domain registration, hosting, stock assets, software licenses)</li>
                        <li>Rush or expedited service fees</li>
                        <li>Consultation and strategy session fees</li>
                    </ul>

                    <h2>5. Subscription &amp; Retainer Services</h2>
                    <p>
                        For recurring services (monthly retainers, hosting plans, or ongoing content production), cancellation
                        must be submitted in writing at least 14 days before the next billing cycle. No refunds will be issued
                        for the current billing period once the cycle has begun. Services will continue through the end of the
                        paid period.
                    </p>

                    <h2>6. How to Request a Refund</h2>
                    <p>
                        To request a refund, please contact us in writing at{" "}
                        <a href="mailto:info@powerdigitalmedia.org" className="text-accent hover:underline">
                            info@powerdigitalmedia.org
                        </a>{" "}
                        with the subject line &quot;Refund Request&quot; and include the following:
                    </p>
                    <ul>
                        <li>Your full name and business name (if applicable)</li>
                        <li>Invoice or project reference number</li>
                        <li>Reason for the refund request</li>
                        <li>Any supporting documentation</li>
                    </ul>
                    <p>
                        We will review all refund requests within 5 business days and respond with a determination.
                        Approved refunds will be processed to the original payment method within 10–15 business days.
                    </p>

                    <h2>7. Disputes</h2>
                    <p>
                        If you are unsatisfied with any aspect of our services, we encourage you to contact us directly
                        before initiating a dispute with your payment provider. We are committed to resolving concerns
                        promptly and fairly. Filing a chargeback without first contacting us may result in the suspension
                        of your project and any associated accounts.
                    </p>

                    <h2>8. Modifications to This Policy</h2>
                    <p>
                        Power Digital Media reserves the right to update or modify this refund policy at any time. Changes
                        will be posted on this page with an updated &quot;Last Updated&quot; date. Continued use of our services
                        after changes constitutes acceptance of the revised policy.
                    </p>

                    <h2>9. Contact Us</h2>
                    <p>
                        If you have questions about this refund policy, please reach out:
                    </p>
                    <ul>
                        <li>
                            <strong>Email:</strong>{" "}
                            <a href="mailto:info@powerdigitalmedia.org" className="text-accent hover:underline">
                                info@powerdigitalmedia.org
                            </a>
                        </li>
                        <li><strong>Phone:</strong> 601-446-2393</li>
                        <li><strong>Location:</strong> Jackson, MS Metro Area</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </main>
    );
}
