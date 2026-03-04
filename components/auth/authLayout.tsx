"use client";

import { useBranding } from "@/context/branding-context";

interface Props {
  children: React.ReactNode;
}

const FEATURES = [
  {
    icon: "👥",
    title: "Worker Management",
    desc: "Track applicants, deployments, and worker profiles end-to-end.",
  },
  {
    icon: "📋",
    title: "Job Orders",
    desc: "Create and manage job orders with real-time status updates.",
  },
  {
    icon: "🌍",
    title: "Multi-Country Support",
    desc: "Handle placements across multiple countries with local compliance.",
  },
  {
    icon: "📊",
    title: "Analytics & Reports",
    desc: "Gain insights into agency performance with detailed dashboards.",
  },
  {
    icon: "🔔",
    title: "Notifications",
    desc: "Stay on top of deadlines, renewals, and document expirations.",
  },
  {
    icon: "⚙️",
    title: "Custom Branding",
    desc: "White-label the platform with your agency's identity and colors.",
  },
];

const PIPELINE = [
  {
    icon: "📋",
    label: "Lead & Registration",
    desc: "Applicant enrolled, documents collected",
    color: "#006FEE",
  },
  {
    icon: "🎙️",
    label: "Interview",
    desc: "Skills assessment & employer screening",
    color: "#7828C8",
  },
  {
    icon: "🏥",
    label: "Medical",
    desc: "Health examination & fitness clearance",
    color: "#17C964",
  },
  {
    icon: "📄",
    label: "Visa Processing",
    desc: "Embassy submission & approval tracking",
    color: "#F5A524",
  },
  {
    icon: "🛂",
    label: "SLBFE / Bureau",
    desc: "Government registration & insurance",
    color: "#F31260",
  },
  {
    icon: "✈️",
    label: "Flight & Departure",
    desc: "Ticket issued, worker deployed",
    color: "#0E793C",
  },
];

export const AuthLayoutWrapper = ({ children }: Props) => {
  const { branding, loading } = useBranding();

  const initials = branding.name
    ? branding.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "A";

  const primary = branding.primaryColor || "#006FEE";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── LEFT: Branding + Login form ── */}
      <div className="flex flex-col w-full md:w-[480px] shrink-0 overflow-y-auto bg-background px-10 py-12 justify-center gap-8">
        {/* Brand header */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-white text-lg font-bold shadow"
            style={{ background: primary }}
          >
            {branding.logoBase64 ? (
              <img
                src={branding.logoBase64}
                alt={branding.name}
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <span>{loading ? "…" : initials}</span>
            )}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold text-default-900">
              {loading ? "Loading…" : branding.name || "Agency Dashboard"}
            </span>
            <span className="text-xs text-default-500">
              {branding.tagline || "Overseas Workers Management System"}
            </span>
          </div>
        </div>

        {/* Login form slot */}
        {children}
      </div>

      {/* ── COL 2: Features & Overview ── */}
      <div
        className="hidden lg:flex flex-1 flex-col justify-center px-10 py-12 overflow-y-auto"
        style={{
          background: `linear-gradient(135deg, ${primary}12 0%, ${primary}06 100%)`,
          borderLeft: `1px solid ${primary}20`,
        }}
      >
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-default-400 mb-1">
            Platform Features
          </p>
          <h2 className="text-2xl font-bold text-default-900 leading-tight">
            Everything your agency needs,{" "}
            <span style={{ color: primary }}>in one place.</span>
          </h2>
          <p className="mt-2 text-sm text-default-500">
            PAMS is a complete overseas placement agency management system —
            built to streamline operations from recruitment to deployment.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex gap-3 p-3 rounded-xl bg-background/60 border border-default-100 shadow-sm"
            >
              <span className="text-xl shrink-0 mt-0.5">{f.icon}</span>
              <div>
                <p className="text-xs font-semibold text-default-900">{f.title}</p>
                <p className="text-xs text-default-500 mt-0.5 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-default-400">
          Trusted by placement agencies to manage workers, documents, and deployments.
        </p>
      </div>

      {/* ── COL 3: Applicant Journey Pipeline ── */}
      <div
        className="hidden lg:flex flex-1 flex-col justify-center px-10 py-12 overflow-y-auto"
        style={{
          background: `linear-gradient(135deg, ${primary}08 0%, ${primary}14 100%)`,
          borderLeft: `1px solid ${primary}20`,
        }}
      >
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-default-400 mb-1">
            Applicant Journey
          </p>
          <h2 className="text-2xl font-bold text-default-900 leading-tight">
            From registration to{" "}
            <span style={{ color: primary }}>successful deployment</span>
          </h2>
          <p className="mt-2 text-sm text-default-500">
            Track every applicant through 6 key milestones — all in one place.
          </p>
        </div>

        <div className="flex flex-col gap-0">
          {PIPELINE.map((step, idx) => {
            const isLast = idx === PIPELINE.length - 1;
            return (
              <div key={step.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 shadow-sm"
                    style={{
                      background: step.color + "18",
                      border: `2px solid ${step.color}40`,
                    }}
                  >
                    {step.icon}
                  </div>
                  {!isLast && (
                    <div
                      className="w-0.5 flex-1 min-h-[20px] my-1 rounded-full"
                      style={{ background: `${step.color}30` }}
                    />
                  )}
                </div>
                <div className="pb-4 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-default-900">{step.label}</p>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: step.color + "18", color: step.color }}
                    >
                      Step {idx + 1}
                    </span>
                  </div>
                  <p className="text-xs text-default-500 mt-0.5">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-default-400">
          PAMS automates paperwork, tracks deadlines, and keeps every stakeholder informed at every stage.
        </p>
      </div>
    </div>
  );
};
