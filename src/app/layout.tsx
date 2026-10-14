import type { Metadata, Viewport } from "next";
import { Public_Sans, Sora } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SITE } from "@/lib/config";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#49A4AE",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  title: {
    default: `${SITE.name} | IT Careers`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Comtanix",
    "IT careers",
    "global IT jobs",
    "software engineering",
    "IT support",
    "Pakistan IT company",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | IT Careers`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | IT Careers`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  appleWebApp: {
    title: SITE.name,
    capable: true,
    statusBarStyle: "default",
  },
  other: {
    "og:site_name": SITE.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${publicSans.variable}`}>
      <body className="flex min-h-dvh min-w-0 flex-col overflow-x-clip bg-canvas font-sans text-ink antialiased [overflow-wrap:anywhere]">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
