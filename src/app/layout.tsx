import type { Metadata } from "next";
import { Cinzel, Playfair_Display, Great_Vibes, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://ring-ceremony-invitation.vercel.app";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || productionUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ashindra & Himanshi - Royal Ring Ceremony Invitation",
  description: "आप सादर आमंत्रित हैं।\n\nहमारे रिंग समारोह (03 July 2026) में आपकी स्नेहमयी उपस्थिति हमारे लिए अत्यंत हर्ष एवं सौभाग्य का विषय होगी।",
  keywords: [
    "Ring Ceremony",
    "Wedding Invitation",
    "Ashindra",
    "Himanshi",
    "Pandav Guest House",
    "Digital Invitation",
    "Indian Wedding"
  ],
  authors: [{ name: "Anendra Sengar" }],
  applicationName: "Ashindra & Himanshi",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ashindra & Himanshi - Royal Ring Ceremony Invitation",
    description: "💍 Ring Ceremony\n📅 03 July 2026\n📍 Pandav Guest House & Resort\nRagaul, Uttar Pradesh",
    siteName: "Ashindra & Himanshi Ring Ceremony",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ashindra & Himanshi Ring Ceremony Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashindra & Himanshi - Royal Ring Ceremony Invitation",
    description: "💍 Ring Ceremony\n📅 03 July 2026\n📍 Pandav Guest House & Resort\nRagaul, Uttar Pradesh",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${playfair.variable} ${greatVibes.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0805] text-[#ebd8c1] overflow-x-hidden selection:bg-[#cba358] selection:text-[#0b0805]">
        {children}
      </body>
    </html>
  );
}

