"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface Branding {
    name: string;
    tagline: string;
    logoBase64: string;
    primaryColor: string;
}

const defaultBranding: Branding = {
    name: "",
    tagline: "",
    logoBase64: "",
    primaryColor: "#006FEE",
};

interface BrandingContextValue {
    branding: Branding;
    setBranding: (b: Branding) => void;
    loading: boolean;
}

const BrandingContext = createContext<BrandingContextValue>({
    branding: defaultBranding,
    setBranding: () => {},
    loading: true,
});

export const useBranding = () => useContext(BrandingContext);

export const BrandingProvider = ({ children }: { children: React.ReactNode }) => {
    const [branding, setBrandingState] = useState<Branding>(defaultBranding);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/branding")
            .then((r) => r.json())
            .then((data) => {
                setBrandingState({
                    name: data.name ?? "",
                    tagline: data.tagline ?? "",
                    logoBase64: data.logoBase64 ?? "",
                    primaryColor: data.primaryColor ?? "#006FEE",
                });
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // Inject CSS variable whenever primaryColor changes
    useEffect(() => {
        document.documentElement.style.setProperty("--brand-primary", branding.primaryColor);
    }, [branding.primaryColor]);

    const setBranding = (b: Branding) => {
        setBrandingState(b);
    };

    return (
        <BrandingContext.Provider value={{ branding, setBranding, loading }}>
            {children}
        </BrandingContext.Provider>
    );
};
