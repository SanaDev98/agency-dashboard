"use client";
import React from "react";
import { useBranding } from "@/context/branding-context";

export const CompaniesDropdown = () => {
    const { branding, loading } = useBranding();

    const initials = branding.name
        ? branding.name
            .split(" ")
            .slice(0, 2)
            .map((w) => w[0])
            .join("")
            .toUpperCase()
        : "?";

    return (
        <div className="flex items-center gap-3 px-1">
            {/* Logo or initials */}
            <div
                className="w-9 h-9 rounded-lg shrink-0 overflow-hidden flex items-center justify-center text-white text-sm font-bold"
                style={{ background: "var(--brand-primary, #006FEE)" }}
            >
                {branding.logoBase64 ? (
                    <img
                        src={branding.logoBase64}
                        alt={branding.name}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <span>{loading ? "…" : initials}</span>
                )}
            </div>

            {/* Name + tagline */}
            <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-default-900 truncate leading-tight">
                    {loading ? "Loading…" : branding.name || "Set company name"}
                </span>
                <span className="text-xs text-default-500 truncate leading-tight">
                    {branding.tagline || "Configure in Settings"}
                </span>
            </div>
        </div>
    );
};
