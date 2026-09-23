import type { Metadata, Viewport } from "next";
import { Inter, Cinzel } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#001737",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jerichosda.church"),
  title: {
    default: "Jericho Seventh-day Adventist Church | Nairobi, Kenya",
    template: "%s | Jericho SDA Church",
  },
  description:
    "Official portal of Jericho Seventh-day Adventist Church in Nairobi Eastlands. Explore our 2026 Church Calendar, Ministries & Departments, Prayer Cells, Online Giving (M-PESA Paybill 752922), and Pastoral Care.",
  keywords: [
    "Jericho SDA Church",
    "Seventh-day Adventist Nairobi",
    "Jericho Nairobi Church",
    "Eastlands SDA Church",
    "Central Kenya Conference",
    "Ambassadors Club",
    "Adventist Possibility Ministries",
    "Sabbath Worship Nairobi",
    "Jericho Estate Prayer Cells",
    "Lipa na M-PESA 752922",
  ],
  authors: [{ name: "Jericho SDA Church Communication Department" }],
  creator: "Jericho SDA Church",
  publisher: "Jericho Seventh-day Adventist Church",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Jericho Seventh-day Adventist Church | Nairobi",
    description:
      "A Christ-centered sanctuary in Nairobi Eastlands. Join us for Sabbath School at 08:00 AM, Divine Worship at 11:00 AM, and Adventist Youth (AY) at 02:00 PM.",
    url: "https://jerichosda.church",
    siteName: "Jericho SDA Church",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/church-1.jpg",
        width: 1200,
        height: 630,
        alt: "Jericho Seventh-day Adventist Church Sanctuary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jericho Seventh-day Adventist Church | Nairobi",
    description:
      "Proclaiming Christ's grace, truth, and soon return in Nairobi Eastlands. Explore our ministries, calendar, and prayer cells.",
    images: ["/church-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const churchJsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: "Jericho Seventh-day Adventist Church",
    alternateName: "JESDAC",
    url: "https://jerichosda.church",
    logo: "https://jerichosda.church/adventist-logo.png",
    description:
      "A Bible-believing Seventh-day Adventist sanctuary located in Jericho Estate, Nairobi Eastlands under the Central Kenya Conference (CKC).",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jericho Estate, Off Jogoo Road & Rabai Road Perimeter",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      postalCode: "00100",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.2917,
      longitude: 36.8775,
    },
    telephone: "+254700000100",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Wednesday",
        opens: "18:00",
        closes: "19:30",
      },
    ],
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`scroll-smooth ${inter.variable} ${cinzel.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 flex flex-col min-h-screen selection:bg-amber-300 selection:text-[#001737]">
        <SiteSettingsProvider>
          <Navbar />
          <div className="flex-1 w-full">{children}</div>
          <Footer />
        </SiteSettingsProvider>
      </body>
    </html>
  );
}