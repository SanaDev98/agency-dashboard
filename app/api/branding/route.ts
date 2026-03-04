import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Branding from "@/lib/models/branding.model";

const SLUG = "default";

export async function GET() {
    try {
        await connectDB();
        const branding = await Branding.findOne({ slug: SLUG }).lean();
        return NextResponse.json(branding ?? { slug: SLUG, name: "", tagline: "", logoBase64: "", primaryColor: "#006FEE" });
    } catch (err) {
        console.error("GET /api/branding error:", err);
        return NextResponse.json({ error: "Failed to fetch branding" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const form = await req.formData();
        const name = (form.get("name") as string) ?? "";
        const tagline = (form.get("tagline") as string) ?? "";
        const primaryColor = (form.get("primaryColor") as string) ?? "#006FEE";
        const logoFile = form.get("logo") as File | null;

        let logoBase64 = (form.get("existingLogo") as string) ?? "";

        if (logoFile && logoFile.size > 0) {
            const buffer = Buffer.from(await logoFile.arrayBuffer());
            logoBase64 = `data:${logoFile.type};base64,${buffer.toString("base64")}`;
        }

        const branding = await Branding.findOneAndUpdate(
            { slug: SLUG },
            { slug: SLUG, name, tagline, logoBase64, primaryColor },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        ).lean();

        return NextResponse.json(branding);
    } catch (err) {
        console.error("POST /api/branding error:", err);
        return NextResponse.json({ error: "Failed to save branding" }, { status: 500 });
    }
}
