"use client";
import React, { useRef, useState, useEffect } from "react";
import { Input, Button, Card, CardBody, Divider } from "@nextui-org/react";
import { useBranding } from "@/context/branding-context";

export const BrandingForm = () => {
    const { branding, setBranding } = useBranding();

    const [name, setName] = useState("");
    const [tagline, setTagline] = useState("");
    const [primaryColor, setPrimaryColor] = useState("#006FEE");
    const [logoPreview, setLogoPreview] = useState("");
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Populate form from context once loaded
    useEffect(() => {
        setName(branding.name);
        setTagline(branding.tagline);
        setPrimaryColor(branding.primaryColor || "#006FEE");
        setLogoPreview(branding.logoBase64);
    }, [branding]);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLogoFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setStatus("idle");

        try {
            const form = new FormData();
            form.append("name", name);
            form.append("tagline", tagline);
            form.append("primaryColor", primaryColor);
            form.append("existingLogo", branding.logoBase64);
            if (logoFile) form.append("logo", logoFile);

            const res = await fetch("/api/branding", { method: "POST", body: form });
            if (!res.ok) throw new Error("Save failed");

            const saved = await res.json();
            setBranding({
                name: saved.name,
                tagline: saved.tagline,
                logoBase64: saved.logoBase64,
                primaryColor: saved.primaryColor,
            });
            setStatus("success");
        } catch {
            setStatus("error");
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">

            {/* Identity */}
            <Card shadow="sm">
                <CardBody className="gap-4 p-6">
                    <p className="text-sm font-semibold text-default-600">Identity</p>
                    <Input
                        label="Company Name"
                        placeholder="e.g. Sunrise Recruitment"
                        value={name}
                        onValueChange={setName}
                        description="Displayed in the sidebar header"
                    />
                    <Input
                        label="Tagline / Location"
                        placeholder="e.g. Colombo · Dubai · Qatar"
                        value={tagline}
                        onValueChange={setTagline}
                        description="Shown below the company name"
                    />
                </CardBody>
            </Card>

            {/* Logo */}
            <Card shadow="sm">
                <CardBody className="gap-4 p-6">
                    <p className="text-sm font-semibold text-default-600">Logo</p>
                    <div className="flex items-center gap-5 flex-wrap">
                        {/* Preview */}
                        <div
                            className="w-20 h-20 rounded-xl border-2 border-dashed border-default-300 flex items-center justify-center bg-default-50 overflow-hidden shrink-0 cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {logoPreview ? (
                                <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain p-1" />
                            ) : (
                                <span className="text-xs text-default-400 text-center px-2">Click to upload</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Button
                                size="sm"
                                variant="flat"
                                color="primary"
                                type="button"
                                onPress={() => fileInputRef.current?.click()}
                            >
                                {logoPreview ? "Change Logo" : "Upload Logo"}
                            </Button>
                            {logoPreview && (
                                <Button
                                    size="sm"
                                    variant="light"
                                    color="danger"
                                    type="button"
                                    onPress={() => { setLogoPreview(""); setLogoFile(null); }}
                                >
                                    Remove
                                </Button>
                            )}
                            <p className="text-xs text-default-400">PNG, JPG, SVG · Max 2 MB</p>
                        </div>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/svg+xml,image/webp"
                        className="hidden"
                        onChange={handleLogoChange}
                    />
                </CardBody>
            </Card>

            {/* Brand Color */}
            <Card shadow="sm">
                <CardBody className="gap-4 p-6">
                    <p className="text-sm font-semibold text-default-600">Brand Color</p>
                    <div className="flex items-center gap-4">
                        <input
                            type="color"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="w-12 h-12 rounded-xl cursor-pointer border border-default-200 p-0.5 bg-transparent"
                        />
                        <Input
                            className="max-w-[160px]"
                            label="Hex value"
                            value={primaryColor}
                            onValueChange={(v) => {
                                if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) setPrimaryColor(v);
                            }}
                            maxLength={7}
                        />
                        {/* Live swatch */}
                        <div
                            className="flex-1 h-12 rounded-xl"
                            style={{ background: primaryColor, minWidth: 60 }}
                        />
                    </div>
                    <p className="text-xs text-default-400">
                        Sets the <code className="bg-default-100 px-1 rounded">--brand-primary</code> CSS variable used for sidebar accents and branding highlights.
                    </p>
                </CardBody>
            </Card>

            <Divider />

            {/* Save */}
            <div className="flex items-center gap-4">
                <Button color="primary" type="submit" isLoading={saving}>
                    Save Branding
                </Button>
                {status === "success" && (
                    <span className="text-sm text-success-600 font-medium">✓ Saved successfully</span>
                )}
                {status === "error" && (
                    <span className="text-sm text-danger font-medium">✗ Failed to save. Check your connection.</span>
                )}
            </div>
        </form>
    );
};
