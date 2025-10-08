import type React from "react";
import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ConvexClientProvider } from "@/components/convex-client-provider";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HiFive - Mémorisez l’anglais par le contexte",
  description:
    "HiFive aide les francophones à apprendre et mémoriser le vocabulaire anglais à travers des leçons contextuelles et interactives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={monaSans.className}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <ConvexClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
