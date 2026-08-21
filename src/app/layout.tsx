import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { VelouraProvider } from "@/context/VelouraContext";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "VELOURA — Premium Luxury Contemporary Fashion House",
  description: "A refined collection of timeless silhouettes, fluid silk-satin drapes, and structured tailoring. Designed for modern luxury and effortless proportions.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#FAF9F6] text-[#111215] antialiased">
        <VelouraProvider>
          {/* Noise Film Overlay */}
          <div className="editorial-grain" />
          
          {/* Custom Desktop Cursor */}
          <CustomCursor />
          
          {/* Page Contents */}
          {children}
        </VelouraProvider>
      </body>
    </html>
  );
}
