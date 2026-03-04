import React from "react";
import Link from "next/link";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { BrandingForm } from "@/components/settings/branding-form";

const SettingsPage = () => {
    return (
        <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            {/* Breadcrumb */}
            <ul className="flex items-center gap-1 text-sm text-default-500">
                <li className="flex gap-1 items-center">
                    <HouseIcon />
                    <Link href="/">Home</Link>
                    <span>/</span>
                </li>
                <li className="flex gap-1 items-center text-default-800 font-medium">
                    Settings
                </li>
            </ul>

            <div className="flex flex-col gap-1 mb-2">
                <h3 className="text-xl font-semibold">Branding Settings</h3>
                <p className="text-sm text-default-500">
                    Customise how this dashboard is presented to each client. Changes are saved to MongoDB and persist across sessions.
                </p>
            </div>

            <BrandingForm />
        </div>
    );
};

export default SettingsPage;
