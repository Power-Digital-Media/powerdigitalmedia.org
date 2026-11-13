"use client";

import { motion } from "framer-motion";
import {
  Send,
  Globe,
  User,
  Building2,
  Palette,
  LayoutGrid,
  FileText,
  Wrench,
  Clock,
  HeartHandshake,
  Search,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FormSecurityFields from "@/components/ui/FormSecurityFields";
import { submitVerifiedLeadForm } from "@/lib/lead-submission";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type FormStatus = "idle" | "submitting" | "success" | "error";

function Checkbox({
  name,
  value,
  label,
  disabled,
}: {
  name: string;
  value: string;
  label: string;
  disabled: boolean;
}) {
  const [checked, setChecked] = useState(false);
  const toggle = () => {
    if (!disabled) setChecked((c) => !c);
  };
  return (
    <div
      className="relative flex items-center gap-3 cursor-pointer group select-none"
      onClick={toggle}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <input type="hidden" name={checked ? name : ""} value={value} />
      <span
        className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center shrink-0 ${
          checked
            ? "bg-amber-400 border-amber-400"
            : "border-white/20 bg-[#12141c] group-hover:border-amber-400/50"
        }`}
      >
        {checked && (
          <svg className="w-3 h-3 text-slate-950" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6L5 9L10 3"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
        {label}
      </span>
    </div>
  );
}

function DescriptiveCheckbox({
  name,
  value,
  title,
  description,
  disabled,
}: {
  name: string;
  value: string;
  title: string;
  description: string;
  disabled: boolean;
}) {
  const [checked, setChecked] = useState(false);
  const toggle = () => {
    if (!disabled) setChecked((c) => !c);
  };
  return (
    <div
      className="relative flex items-start gap-3 cursor-pointer group select-none"
      onClick={toggle}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <input type="hidden" name={checked ? name : ""} value={value} />
      <span
        className={`w-5 h-5 mt-0.5 rounded-md border transition-all flex items-center justify-center shrink-0 ${
          checked
            ? "bg-amber-400 border-amber-400"
            : "border-white/20 bg-[#12141c] group-hover:border-amber-400/50"
        }`}
      >
        {checked && (
          <svg className="w-3 h-3 text-slate-950" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6L5 9L10 3"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <div>
        <span
          className={`text-sm font-semibold transition-colors ${
            checked ? "text-amber-300" : "text-white group-hover:text-amber-300"
          }`}
        >
          {title}
        </span>
        <p className="text-xs text-slate-400 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

function RadioGroup({
  name,
  options,
  disabled,
}: {
  name: string;
  options: string[];
  disabled: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <input type="hidden" name={name} value={selected ?? ""} />
      {options.map((val) => (
        <div
          key={val}
          className="relative flex items-center gap-2 cursor-pointer group select-none"
          onClick={() => {
            if (!disabled) setSelected((prev) => (prev === val ? null : val));
          }}
          role="radio"
          aria-checked={selected === val}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              if (!disabled) setSelected((prev) => (prev === val ? null : val));
            }
          }}
        >
          <span
            className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${
              selected === val
                ? "border-amber-400"
                : "border-white/20 bg-[#12141c] group-hover:border-amber-400/50"
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full bg-amber-400 transition-transform ${
                selected === val ? "scale-100" : "scale-0"
              }`}
            />
          </span>
          <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
            {val}
          </span>
        </div>
      ))}
    </div>
  );
}

function FormSection({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div className="p-7 sm:p-9 rounded-3xl bg-[#0b0c10] border border-white/10 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder = "",
  required = false,
  disabled = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
        {label} {required && <span className="text-amber-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full px-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none transition-colors placeholder:text-slate-500 disabled:opacity-50 text-white text-sm"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  placeholder = "",
  rows = 3,
  disabled = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
        {label}
      </label>
      <textarea
        name={name}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full px-4 py-3.5 rounded-xl bg-[#12141c] border border-white/10 focus:border-amber-400 outline-none transition-colors placeholder:text-slate-500 resize-none disabled:opacity-50 text-white text-sm"
      />
    </div>
  );
}

export default function WebDesignDiscoveryPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [step, setStep] = useState(1);
  const disabled = status === "submitting";
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("_form_source", "web-design-discovery");

    try {
      const { ok } = await submitVerifiedLeadForm({
        formSource: "web-design-discovery",
        formData: data,
      });

      if (ok) {
        const nameVal = (data.get("prospect_name") as string) || "";
        const emailVal = (data.get("email") as string) || "";
        const phoneVal = (data.get("phone") as string) || "";
        form.reset();
        router.push(
          `/book?from=discovery&name=${encodeURIComponent(nameVal)}&email=${encodeURIComponent(
            emailVal
          )}&phone=${encodeURIComponent(phoneVal)}`
        );
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const nextStep = async () => {
    const currentStepEl = document.getElementById(`step-${step}`);
    if (currentStepEl) {
      const inputs = currentStepEl.querySelectorAll("input, select, textarea");
      let allValid = true;
      inputs.forEach((input) => {
        const el = input as HTMLInputElement;
        if (!el.checkValidity()) {
          el.reportValidity();
          allValid = false;
        }
      });
      if (!allValid) return;
    }

    if (step === 1) {
      try {
        const nameEl = document.getElementsByName("prospect_name")[0] as HTMLInputElement;
        const emailEl = document.getElementsByName("email")[0] as HTMLInputElement;
        const bizEl = document.getElementsByName("business_name")[0] as HTMLInputElement;
        const phoneEl = document.getElementsByName("phone")[0] as HTMLInputElement;

        if (emailEl?.value && nameEl?.value) {
          const partialData = new FormData();
          partialData.append("prospect_name", nameEl.value);
          partialData.append("email", emailEl.value);
          partialData.append("business_name", bizEl?.value || "");
          partialData.append("phone", phoneEl?.value || "");
          partialData.append("_form_source", "incomplete-web-design-discovery-lead");
          fetch("/api/forms", { method: "POST", body: partialData }).catch(() => {});
        }
      } catch (err) {
        console.error("Abandoned form capture trigger failed:", err);
      }
    }

    setStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 240, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-[#06080f] text-white overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/[0.06] blur-[150px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 z-10">
        <div className="container px-4 sm:px-6 mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-5">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            Custom Website Project Brief
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase mb-4 leading-[1.03]">
            Scope Your <span className="text-amber-400">Custom Build.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Share a few details about your business, trade, and goals so Damein can prepare an exact build plan before your call.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 relative z-10">
        <div className="container px-4 sm:px-6 mx-auto max-w-3xl">
          {status !== "success" && (
            <div className="mb-10 max-w-xl mx-auto">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-2.5">
                <span className={step >= 1 ? "text-amber-400" : ""}>1. Business</span>
                <span className={step >= 2 ? "text-amber-400" : ""}>2. Brand &amp; Style</span>
                <span className={step >= 3 ? "text-amber-400" : ""}>3. Features</span>
                <span className={step >= 4 ? "text-amber-400" : ""}>4. SEO &amp; Timeline</span>
              </div>
              <div className="h-1.5 bg-[#12141c] rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className="h-full bg-amber-400"
                  animate={{ width: `${(step / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <FormSecurityFields />

            {step === 1 && (
              <div id="step-1" className="space-y-8">
                <FormSection icon={User} title="Your Contact Details">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Full Name"
                      name="prospect_name"
                      placeholder="Mike Reynolds"
                      required
                      disabled={disabled}
                    />
                    <Field
                      label="Business / Organization Name"
                      name="business_name"
                      placeholder="Reynolds Roofing LLC"
                      required
                      disabled={disabled}
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Cell / Direct Phone"
                      name="phone"
                      type="tel"
                      placeholder="(601) 555-0199"
                      disabled={disabled}
                    />
                    <Field
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="mike@yourcompany.com"
                      required
                      disabled={disabled}
                    />
                  </div>
                  <Field
                    label="Preferred Contact Method"
                    name="best_contact"
                    placeholder="Phone call, text message, or email"
                    disabled={disabled}
                  />
                </FormSection>

                <FormSection icon={Building2} title="About Your Business">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                      What industry or trade are you in?
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {[
                        "Construction / Contractor",
                        "Home Services (HVAC, Plumbing, Roofing)",
                        "Dirt Work / Land Clearing",
                        "Restaurant / Food Service",
                        "Retail / E-Commerce",
                        "Ministry / Church",
                        "Law Firm / Legal",
                        "Medical / Dental",
                        "Real Estate",
                        "Automotive",
                        "Non-Profit / Community",
                        "Technology / SaaS",
                      ].map((type) => (
                        <Checkbox
                          key={type}
                          name="business_type"
                          value={type}
                          label={type}
                          disabled={disabled}
                        />
                      ))}
                    </div>
                    <Field
                      label="Other Industry (if not listed)"
                      name="business_type_other"
                      placeholder="e.g. Electrical, Concrete, Logistics..."
                      disabled={disabled}
                    />
                  </div>
                  <TextArea
                    label="Core services or products you offer"
                    name="products_services"
                    placeholder="Tell us the highest-margin jobs or products you want more of..."
                    disabled={disabled}
                  />
                  <Field
                    label="Cities / Service Area"
                    name="service_area"
                    placeholder="Jackson, Madison, Brandon, Ridgeland, Flowood..."
                    disabled={disabled}
                  />
                </FormSection>
              </div>
            )}

            {step === 2 && (
              <div id="step-2" className="space-y-8">
                <FormSection icon={Globe} title="Current Website">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                      Do you currently have a website?
                    </label>
                    <RadioGroup name="has_website" options={["Yes", "No"]} disabled={disabled} />
                  </div>
                  <Field
                    label="Current Website URL (if applicable)"
                    name="current_url"
                    type="url"
                    placeholder="https://yourbusiness.com"
                    disabled={disabled}
                  />
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                      Current Platform
                    </label>
                    <RadioGroup
                      name="current_platform"
                      options={["WordPress", "Wix", "Squarespace", "Shopify", "Custom / Unsure", "None"]}
                      disabled={disabled}
                    />
                  </div>
                  <TextArea
                    label="What's frustrating about your current site?"
                    name="current_site_feedback"
                    placeholder="Slow on phones, not ranking in Google Maps, outdated look, zero calls..."
                    disabled={disabled}
                  />
                </FormSection>

                <FormSection icon={Palette} title="Design & Conversion Goal">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                      Visual Direction
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {[
                        "Dark & Industrial-Luxury",
                        "Bold & High-Impact",
                        "Clean & Modern",
                        "Warm & Local",
                        "Corporate & Polished",
                        "Not sure — guide me",
                      ].map((style) => (
                        <Checkbox
                          key={style}
                          name="visual_style"
                          value={style}
                          label={style}
                          disabled={disabled}
                        />
                      ))}
                    </div>
                  </div>
                  <TextArea
                    label="Example websites you admire (optional)"
                    name="reference_sites"
                    placeholder="Paste 1-3 URLs if you have favorites..."
                    rows={2}
                    disabled={disabled}
                  />
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                      #1 Action Visitors Should Take
                    </label>
                    <RadioGroup
                      name="primary_goal"
                      options={[
                        "Call or Text Us",
                        "Request a Quote / Estimate",
                        "Book an Appointment",
                        "Order Online",
                        "Explore Services",
                      ]}
                      disabled={disabled}
                    />
                  </div>
                </FormSection>
              </div>
            )}

            {step === 3 && (
              <div id="step-3" className="space-y-8">
                <FormSection icon={LayoutGrid} title="Features & Field Apps">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                      Which capabilities do you need?
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        "PDM PinDrop™ Live Jobsite Map",
                        "PinCam™ Before/After Proof & PDFs",
                        "2-Minute Missed-Call SMS Rescue",
                        "Online Booking / Calendar",
                        "0%-Fee Square Online Ordering",
                        "Photo / Project Case Study Gallery",
                        "Google Reviews Showcase",
                        "Client Portal / Custom Dashboard",
                      ].map((feature) => (
                        <Checkbox
                          key={feature}
                          name="features_needed"
                          value={feature}
                          label={feature}
                          disabled={disabled}
                        />
                      ))}
                    </div>
                    <Field
                      label="Other features"
                      name="features_other"
                      placeholder="Anything else specific to your crew or customers..."
                      disabled={disabled}
                    />
                  </div>
                </FormSection>

                <FormSection icon={FileText} title="Pages & Content Readiness">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                      Key pages needed
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {[
                        "Home",
                        "Services",
                        "City / Area Pages",
                        "Projects / Gallery",
                        "Reviews",
                        "About",
                        "Contact / Free Quote",
                        "Pricing",
                        "FAQ",
                      ].map((page) => (
                        <Checkbox
                          key={page}
                          name="pages_needed"
                          value={page}
                          label={page}
                          disabled={disabled}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                      Do you have jobsite or business photos ready?
                    </label>
                    <RadioGroup
                      name="has_media"
                      options={["Yes", "Some — capturing more", "No — need guidance"]}
                      disabled={disabled}
                    />
                  </div>
                </FormSection>

                <FormSection icon={Wrench} title="Connected Systems">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Capsule CRM Pipeline",
                      "PDM PinDrop™ + PinCam™ Field Suite",
                      "Stripe / Square Payments",
                      "Transpond Email & SMS",
                      "Google Business Profile Sync",
                      "Calendly / Scheduling",
                    ].map((integration) => (
                      <Checkbox
                        key={integration}
                        name="integrations"
                        value={integration}
                        label={integration}
                        disabled={disabled}
                      />
                    ))}
                  </div>
                </FormSection>
              </div>
            )}

            {step === 4 && (
              <div id="step-4" className="space-y-8">
                <FormSection icon={Search} title="Google Maps, SEO & AI Search">
                  <div className="space-y-4">
                    <DescriptiveCheckbox
                      name="visibility_services"
                      value="SEO"
                      disabled={disabled}
                      title="Local SEO & Google Map Pack"
                      description="Rank in the top 3 on Google Maps across Jackson, Madison, Brandon, Ridgeland, Flowood & Clinton."
                    />
                    <DescriptiveCheckbox
                      name="visibility_services"
                      value="AEO_GEO"
                      disabled={disabled}
                      title="AI Search & Answer Engine Schema (ChatGPT, Google AI, Siri)"
                      description="Structured JSON-LD entity markup and llms.txt indexing so AI assistants recommend your company."
                    />
                  </div>
                </FormSection>

                <FormSection icon={Clock} title="Timeline & Project Scope">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                      Target Launch Timeline
                    </label>
                    <RadioGroup
                      name="timeline"
                      options={["ASAP (7–14 days)", "Within 30 days", "1–3 months", "Just exploring"]}
                      disabled={disabled}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                      Desired Build Scope (Quoted Case-by-Case)
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        "Core Custom Website (5–7 Pages + Local SEO)",
                        "Contractor Growth System (Multi-City + PinDrop™ / PinCam™)",
                        "Custom App / 0%-Fee Ordering / Multi-Location",
                        "Not sure — recommend the right scope",
                      ].map((range) => (
                        <Checkbox
                          key={range}
                          name="budget_range"
                          value={range}
                          label={range}
                          disabled={disabled}
                        />
                      ))}
                    </div>
                  </div>
                </FormSection>

                <FormSection icon={HeartHandshake} title="Ongoing Care & Notes">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                      Interested in ongoing hosting, SEO, or PinDrop™ support?
                    </label>
                    <RadioGroup
                      name="ongoing_management"
                      options={["Yes — manage it for us", "Maybe — show me options", "No — build only"]}
                      disabled={disabled}
                    />
                  </div>
                  <TextArea
                    label="Anything else Damein should know before your call?"
                    name="notes"
                    placeholder="Goals, busy seasons, questions..."
                    rows={4}
                    disabled={disabled}
                  />
                </FormSection>
              </div>
            )}

            {status === "error" && (
              <p className="text-red-300 bg-red-500/10 border border-red-500/25 rounded-xl p-4 text-xs text-center">
                Could not submit right now. Please call or text Damein directly at (601) 446-2393.
              </p>
            )}

            <div className="flex gap-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setStep((s) => Math.max(s - 1, 1));
                    window.scrollTo({ top: 240, behavior: "smooth" });
                  }}
                  className="px-7 py-4 border border-white/15 bg-[#0b0c10] text-white font-bold rounded-xl hover:bg-white/5 transition-colors uppercase tracking-wider text-xs shrink-0 cursor-pointer"
                >
                  Back
                </button>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-grow py-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black rounded-xl hover:brightness-110 transition-all uppercase tracking-wider text-xs cursor-pointer shadow-[0_0_28px_rgba(245,158,11,0.28)]"
                >
                  Continue to Step {step + 1} →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={disabled}
                  className="flex-grow py-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2.5 hover:brightness-110 disabled:opacity-60 transition-all text-xs uppercase tracking-wider cursor-pointer shadow-[0_0_28px_rgba(245,158,11,0.3)]"
                >
                  {disabled ? (
                    "Saving & Opening Calendar..."
                  ) : (
                    <>
                      Submit Brief &amp; Pick Call Time
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
