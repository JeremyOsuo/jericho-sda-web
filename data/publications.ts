export interface Publication {
  id: string;
  title: string;
  issue: string;
  quarter: string;
  coverImage: string;
  description: string;
  category: "Magazine" | "Weekly Bulletin" | "Camp Guide" | "Sabbath School";
  readLink: string;
  downloadSize: string;
  featured?: boolean;
}

export const publications: Publication[] = [
  {
    id: "jericho-voice-q3",
    title: "The Jericho Herald: Living the Blessed Hope",
    issue: "Quarter 3 • Issue 14",
    quarter: "July – September 2026",
    coverImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    description:
      "Special Camp Meeting retrospective edition: personal testimonies, youth evangelism spotlights, and health articles for the family.",
    category: "Magazine",
    readLink: "#",
    downloadSize: "3.4 MB",
    featured: true,
  },
  {
    id: "sabbath-bulletin-current",
    title: "Sabbath Divine Bulletin & Order of Service",
    issue: "Vol. 42 • No. 36",
    quarter: "September 2026",
    coverImage: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=800&q=80",
    description:
      "Order of service for Sabbath morning, weekly announcements, duty elders schedule, and prayer requests list.",
    category: "Weekly Bulletin",
    readLink: "#",
    downloadSize: "1.1 MB",
  },
  {
    id: "camp-meeting-program-2026",
    title: "August Camp Meeting Souvenir & Program",
    issue: "Annual Convocation",
    quarter: "August 2026",
    coverImage: "https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?auto=format&fit=crop&w=800&q=80",
    description:
      "Complete theme guide, guest evangelist profiles, daily song sheet, and baptismal candidate register.",
    category: "Camp Guide",
    readLink: "#",
    downloadSize: "5.8 MB",
  },
  {
    id: "youth-quarterly-voice",
    title: "One Voice Youth Evangelism Handbook",
    issue: "Global Mission Edition",
    quarter: "2026 / 2027",
    coverImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    description:
      "Practical strategies for digital evangelism, campus ministry, and community neighborhood outreach in Jericho.",
    category: "Magazine",
    readLink: "#",
    downloadSize: "2.7 MB",
  },
];