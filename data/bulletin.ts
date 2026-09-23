export interface AnnouncementItem {
  id: string;
  category: "General" | "Youth" | "Camp Meeting" | "Welfare";
  headline: string;
  detail: string;
  date: string;
  badge?: string;
  actionUrl?: string;
  actionLabel?: string;
}

export interface DivineServiceRoster {
  date: string;
  sabbathTheme: string;
  scriptureReading: string;
  preacher: string;
  keyElder: string;
  chorister: string;
  dutyDeacon: string;
  dutyDeaconess: string;
}

export const weeklyServiceRoster: DivineServiceRoster = {
  date: "Sabbath, 12th September 2026",
  sabbathTheme: "Walking in Faith and Total Obedience",
  scriptureReading: "2 Corinthians 5:7",
  preacher: "Pr. District Pastor",
  keyElder: "Eld. Nathan Khamala",
  chorister: "Sanctuary Choir",
  dutyDeacon: "Bro. Head Deacon & Team",
  dutyDeaconess: "Sr. Head Deaconess & Team",
};

export const currentAnnouncements: AnnouncementItem[] = [
  {
    id: "ann-1",
    category: "Camp Meeting",
    headline: "Annual Camp Meeting Preparations in Progress",
    detail: "Members are encouraged to remit camp meeting pledges and confirm fellowship cell arrangements.",
    date: "Sep 2026",
    badge: "Urgent",
    actionUrl: "/camp-meeting",
    actionLabel: "View Details",
  },
  {
    id: "ann-2",
    category: "Youth",
    headline: "Ambassadors Club Fellowship Potluck & Social Event",
    detail: "All ambassadors and youth are invited for team building and spiritual reflection.",
    date: "Sep 2026",
    badge: "Youth",
    actionUrl: "/departments/ambassadors",
    actionLabel: "Ambassadors Plan",
  },
  {
    id: "ann-3",
    category: "General",
    headline: "Midweek Prayer & Fasting Service",
    detail: "Every Wednesday from 06:00 PM across all Estate Prayer Cells and Main Sanctuary.",
    date: "Wednesdays",
    badge: "Weekly",
    actionUrl: "/estates",
    actionLabel: "Find Your Cell",
  },
];