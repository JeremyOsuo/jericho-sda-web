import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategic Plan (2026–2030) | Jericho SDA Church",
  description:
    "Official Strategic Plan 2026–2030: Anchored in Christ to Grow in Mission. Explore our five-year spiritual, developmental, and community outreach roadmap.",
  openGraph: {
    title: "Jericho SDA Church — Strategic Plan 2026–2030",
    description:
      "Theme: “Anchored in Christ to Grow in Mission.” Official roadmap launching Sabbath, 31 October 2026.",
    url: "https://jericho-sda-web.vercel.app/strategic-plan",
    siteName: "Jericho Seventh-day Adventist Church Nairobi",
    images: [
      {
        url: "/church-facade.jpg",
        width: 1200,
        height: 630,
        alt: "Jericho SDA Church Sanctuary",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jericho SDA Strategic Plan 2026–2030",
    description:
      "Theme: “Anchored in Christ to Grow in Mission.” Read our five-year roadmap.",
    images: ["/church-facade.jpg"],
  },
};

export default function StrategicPlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}