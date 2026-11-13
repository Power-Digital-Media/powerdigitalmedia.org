import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Power Digital Media",
  description:
    "Clear refund, milestone, and subscription cancellation policy for Power Digital Media custom websites, Local SEO, PDM PinDrop™, PinCam™, and growth retainers.",
  alternates: {
    canonical: "https://powerdigitalmedia.org/refund-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RefundPolicyPage() {
  return (
    <main className="relative min-h-screen bg-[#06080f] text-white overflow-x-clip">
      <Navbar />

      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <section className="relative pt-32 pb-12 md:pt-40 border-b border-white/10 bg-[#0b0c10]/70">
        <div className="container px-4 sm:px-6 mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-5">
            <ShieldCheck className="w-4 h-4 text-amber-400" /> Transparent Client Terms
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            Refund &amp; <span className="text-amber-400">Cancellation Policy.</span>
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Power Digital Media LLC • Last Updated: April 2026
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 relative z-10">
        <div className="container px-4 sm:px-6 mx-auto max-w-4xl space-y-6">
          <div className="p-7 sm:p-10 rounded-3xl bg-[#0b0c10] border border-white/10 space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              At Power Digital Media LLC (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we believe in straightforward, transparent pricing with zero surprises. Please review how deposits, custom milestones, and month-to-month subscriptions are handled before starting an engagement.
            </p>

            <div>
              <h2 className="text-xl font-bold uppercase text-white mb-2">
                1. Custom Engineering &amp; Digital Services
              </h2>
              <p>
                Power Digital Media builds custom Next.js websites, Local SEO &amp; Google Map Pack campaigns, paid lead-generation funnels, CRM &amp; payment integrations, and proprietary software (<strong className="text-white">PDM PinDrop™</strong>, <strong className="text-white">PinCam™</strong>, and <strong className="text-white">PDM Site Intelligence™</strong>). Because custom engineering, architecture, and Local SEO labor are tailored specifically to your business, completed work is non-resalable.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold uppercase text-white mb-2">
                2. Project Deposits &amp; Milestones
              </h2>
              <p>
                Custom website and software builds require an initial kickoff deposit (typically 50% of the build scope, as stated on your invoice) to reserve engineering capacity and begin architecture, copywriting, and design. Kickoff deposits cover immediate discovery and setup labor and are non-refundable once project onboarding begins.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold uppercase text-white mb-2">3. Refund Eligibility</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-white">Before Work Starts:</strong> If you cancel a project before kickoff onboarding or design/code work has begun, milestone payments beyond the initial slot deposit are refundable.
                </li>
                <li>
                  <strong className="text-white">Work In Progress:</strong> If you cancel mid-build, any unearned milestone payments for phases not yet started may be refunded on a pro-rata basis. Completed milestones and kickoff deposits remain non-refundable.
                </li>
                <li>
                  <strong className="text-white">Duplicate Billing:</strong> Any accidental duplicate charge is refunded 100% within 5–10 business days of notification.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold uppercase text-white mb-2">4. Non-Refundable Items</h2>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Kickoff deposits once discovery or engineering work has commenced</li>
                <li>Completed and delivered code, designs, SEO schema, or campaign setups</li>
                <li>Third-party pass-through costs (domains, ad spend paid to Google/Meta, telecom/CRM carrier licenses)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold uppercase text-white mb-2">
                5. Month-to-Month Subscriptions, Hosting &amp; Field Apps
              </h2>
              <p>
                Monthly managed hosting, Local SEO / paid ad retainers, and standalone <strong className="text-white">PDM PinDrop™ / PinCam™</strong> subscriptions operate month-to-month unless otherwise stated in a signed agreement. To cancel before your next renewal, email{" "}
                <a href="mailto:info@powerdigitalmedia.org" className="text-amber-400 underline">
                  info@powerdigitalmedia.org
                </a>{" "}
                at least 14 days prior to your next billing date. Your access and service will remain active through the end of the current paid billing cycle; partial-month refunds are not issued after a cycle renews.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold uppercase text-white mb-2">
                6. How to Request Billing Help or Cancellation
              </h2>
              <p>
                Contact us directly at{" "}
                <a href="mailto:info@powerdigitalmedia.org" className="text-amber-400 underline">
                  info@powerdigitalmedia.org
                </a>{" "}
                with your name, business name, and invoice reference. We review all billing requests within 3–5 business days and always aim to resolve client concerns directly and fairly.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 grid gap-4 sm:grid-cols-3 text-xs">
              <div className="p-4 rounded-2xl bg-[#12141c] border border-white/10 flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>info@powerdigitalmedia.org</span>
              </div>
              <a
                href="tel:6014462393"
                className="p-4 rounded-2xl bg-[#12141c] border border-white/10 flex items-center gap-3 hover:border-amber-400/40"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>(601) 446-2393</span>
              </a>
              <div className="p-4 rounded-2xl bg-[#12141c] border border-white/10 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Jackson, MS 39209</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 pt-2">
              Related documents:{" "}
              <Link href="/privacy" className="text-amber-400 underline">
                Privacy Policy
              </Link>{" "}
              •{" "}
              <Link href="/terms" className="text-amber-400 underline">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
