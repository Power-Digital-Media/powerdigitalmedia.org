"use client";

import {
  Send,
  TrendingUp,
  User,
  Building2,
  Target,
  BarChart3,
  DollarSign,
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

export default function MarketingDiscoveryPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const disabled = status === "submitting";
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const { ok } = await submitVerifiedLeadForm({
        formSource: "marketing-discovery",
        formData: data,
      });

      if (ok) {
        const nameVal = (data.get("prospect_name") as string) || "";
        const emailVal = (data.get("email") as string) || "";
        const phoneVal = (data.get("phone") as string) || "";
        form.reset();
        router.push(
          `/book?from=marketing-discovery&name=${encodeURIComponent(
            nameVal
          )}&email=${encodeURIComponent(emailVal)}&phone=${encodeURIComponent(phoneVal)}`
        );
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            Paid Leads &amp; Local Growth Brief
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase mb-4 leading-[1.03]">
            Plan Your <span className="text-amber-400">Lead Pipeline.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Tell us about your service area, target jobs, and monthly goals so Damein can map out your ad &amp; Local SEO strategy before your call.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 relative z-10">
        <div className="container px-4 sm:px-6 mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <FormSecurityFields />
            <input type="hidden" name="_form_source" value="marketing-discovery" />

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
                  label="Business Name"
                  name="business_name"
                  placeholder="Reynolds Roofing LLC"
                  required
                  disabled={disabled}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  placeholder="(601) 555-0199"
                  disabled={disabled}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="mike@yourcompany.com"
                  required
                  disabled={disabled}
                />
              </div>
            </FormSection>

            <FormSection icon={Building2} title="Business & Service Area">
              <TextArea
                label="What services or jobs bring you the best profit?"
                name="products_services"
                placeholder="e.g. Full roof replacements, HVAC changeouts, commercial dirt work..."
                disabled={disabled}
              />
              <Field
                label="Cities / Counties You Serve"
                name="service_area"
                placeholder="Jackson, Madison, Brandon, Ridgeland, Flowood..."
                disabled={disabled}
              />
            </FormSection>

            <FormSection icon={BarChart3} title="Current Advertising & Lead Flow">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Have you run paid ads before?
                </label>
                <RadioGroup
                  name="has_run_ads"
                  options={["Yes — currently running", "Yes — in the past", "No — first time"]}
                  disabled={disabled}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Facebook & Instagram (Meta)",
                  "Google Search / Local Services Ads",
                  "YouTube / Video Ads",
                  "TikTok Ads",
                ].map((platform) => (
                  <Checkbox
                    key={platform}
                    name="ad_platforms"
                    value={platform}
                    label={platform}
                    disabled={disabled}
                  />
                ))}
              </div>
              <Field
                label="Current Paid Ads Status"
                name="current_ad_spend"
                placeholder="e.g. Starting fresh, running seasonal ads, or scaling active campaigns"
                disabled={disabled}
              />
            </FormSection>

            <FormSection icon={Target} title="Growth Goals">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Which growth channels are you interested in?
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Meta Lead Ads (Facebook + Instagram)",
                    "Google Search & Map Pack SEO",
                    "PDM PinDrop™ + Review Velocity",
                    "Capsule CRM & Automated Follow-Up",
                    "Dedicated High-Speed Landing Page",
                    "Full Month-to-Month Growth Retainer",
                  ].map((service) => (
                    <Checkbox
                      key={service}
                      name="services_interested"
                      value={service}
                      label={service}
                      disabled={disabled}
                    />
                  ))}
                </div>
              </div>
              <TextArea
                label="What does a win look like in the next 60–90 days?"
                name="ideal_outcome"
                placeholder="How many extra qualified calls or booked jobs per month are you aiming for?"
                disabled={disabled}
              />
            </FormSection>

            <FormSection icon={Search} title="Competitors">
              <TextArea
                label="Top 2–3 local competitors in your market"
                name="competitors"
                placeholder="Company names or URLs..."
                rows={2}
                disabled={disabled}
              />
            </FormSection>

            <FormSection icon={DollarSign} title="Timeline & Territory Scale">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Target Launch
                </label>
                <RadioGroup
                  name="timeline"
                  options={["ASAP", "Within 30 days", "1–3 months", "Planning ahead"]}
                  disabled={disabled}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Single-City Local Lead Campaign",
                  "Multi-City Metro Expansion",
                  "Multi-County Regional Takeover",
                  "Need guidance on campaign scope",
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
            </FormSection>

            <FormSection icon={HeartHandshake} title="Website & Extra Context">
              <Field
                label="Current Website URL (if you have one)"
                name="website_url"
                type="url"
                placeholder="https://yourbusiness.com"
                disabled={disabled}
              />
              <TextArea
                label="Any seasonal promos or notes for Damein?"
                name="notes"
                placeholder="Storm season prep, HVAC tune-up specials, hiring more crews..."
                rows={3}
                disabled={disabled}
              />
            </FormSection>

            {status === "error" && (
              <p className="text-red-300 bg-red-500/10 border border-red-500/25 rounded-xl p-4 text-xs text-center">
                Could not submit right now. Please call (601) 446-2393 or email info@powerdigitalmedia.org.
              </p>
            )}

            <button
              type="submit"
              disabled={disabled}
              className="w-full py-4.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2.5 hover:brightness-110 disabled:opacity-60 transition-all text-xs uppercase tracking-wider cursor-pointer shadow-[0_0_28px_rgba(245,158,11,0.3)]"
            >
              {disabled ? (
                "Saving & Opening Calendar..."
              ) : (
                <>
                  Submit Growth Brief &amp; Pick Call Time
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
