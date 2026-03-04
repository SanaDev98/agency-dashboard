import mongoose, { Schema, model, models } from "mongoose";

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
const Branding = models.Branding || model<IBranding>("Branding", BrandingSchema);
export default Branding;
