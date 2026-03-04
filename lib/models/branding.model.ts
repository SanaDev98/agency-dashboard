import mongoose, { Schema, Model } from "mongoose";

export interface IBranding {
    slug: string;
    name: string;
    tagline: string;
    logoBase64: string;
    primaryColor: string;
}

const BrandingSchema = new Schema<IBranding>({
    slug: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    tagline: { type: String, default: "" },
    logoBase64: { type: String, default: "" },
    primaryColor: { type: String, default: "#006FEE" },
});

// Prevent model re-compilation during Next.js hot reload
// @ts-ignore
const Branding: Model<IBranding> = mongoose.models["Branding"] || mongoose.model<IBranding>("Branding", BrandingSchema);

export default Branding;
