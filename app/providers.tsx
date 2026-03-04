"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { BrandingProvider } from "@/context/branding-context";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme='system'
        attribute='class'
        {...themeProps}>
        <BrandingProvider>
          {children}
        </BrandingProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
