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

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL("https://ring-ceremony-invitation.vercel.app"),
  title: "Ashindra & Himanshi - Royal Ring Ceremony Invitation",
  description: "You are cordially invited to celebrate the auspicious Ring Ceremony of Ashindra & Himanshi on July 3, 2026. Join us for a royal celebration.",
  openGraph: {
    title: "Ashindra & Himanshi - Royal Ring Ceremony Invitation",
    description: "आप सादर आमंत्रित हैं। हमारे रिंग समारोह (03 July 2026) में आपकी स्नेहमयी उपस्थिति हमारे लिए अत्यंत हर्ष एवं सौभाग्य का विषय होगी।",
    siteName: "Ashindra & Himanshi Ring Ceremony Invitation",
    images: [
      {
        url: "/assets/image/welcome.png",
        width: 1200,
        height: 630,
        alt: "Ashindra & Himanshi Ring Ceremony Invitation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashindra & Himanshi - Royal Ring Ceremony Invitation",
    description: "You are cordially invited to celebrate the auspicious Ring Ceremony of Ashindra & Himanshi on July 3, 2026.",
    images: ["/assets/image/welcome.png"],
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

