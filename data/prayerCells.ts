export interface PrayerCell {
  id: string;
  name: string;
  estate: string;
  zone: string;
  leader: string;
  hostFamily?: string;
  meetingDay: string;
  meetingTime: string;
  venue: string;
  contactPhone: string;
  description: string;
  focusAreas: string[];
}

export const prayerCells: PrayerCell[] = [
  {
    id: "jericho-core",
    name: "Jericho Central Prayer Cell",
    estate: "Jericho Estate",
    zone: "Zone A (Central)",
    leader: "Eld. Nathan Khamala",
    hostFamily: "Rotating Family Fellowship",
    meetingDay: "Every Wednesday",
    meetingTime: "06:00 PM – 07:30 PM",
    venue: "Main Church Sanctuary Annex / Phase 1 Homes",
    contactPhone: "+254 700 000 001",
    description:
      "Serving residents within Jericho Phase 1, Phase 2, and around the church perimeter for midweek prayer, scripture reflection, and mutual care.",
    focusAreas: ["Midweek Prayer", "Neighborhood Evangelism", "Sick Visitation"],
  },
  {
    id: "uhuru-estate",
    name: "Uhuru Fellowship Cell",
    estate: "Uhuru Estate",
    zone: "Zone B (Uhuru & Surroundings)",
    leader: "Eld. Charles Omollo",
    hostFamily: "Bro. Oloo & Family",
    meetingDay: "Every Wednesday",
    meetingTime: "06:30 PM – 08:00 PM",
    venue: "Uhuru Community Point / Designated Residences",
    contactPhone: "+254 700 000 002",
    description:
      "Uniting Adventist families and seekers living across Uhuru Estate for interactive Bible study, song ministry, and member support.",
    focusAreas: ["Family Enrichment", "Community Welfare", "Intercessory Prayer"],
  },
  {
    id: "buruburu-zone",
    name: "Buruburu Fellowship Circle",
    estate: "Buruburu (Phases 1–5)",
    zone: "Zone C (Buruburu & Harambee)",
    leader: "Eld. William Obonyo",
    hostFamily: "Rotating Homes",
    meetingDay: "Every Wednesday",
    meetingTime: "06:30 PM – 08:00 PM",
    venue: "Buruburu Phase 2 & 4 Resident Houses",
    contactPhone: "+254 700 000 003",
    description:
      "Providing a spiritual haven for students, professionals, and families residing in Buruburu and Harambee estates.",
    focusAreas: ["Youth & Professional Discipleship", "Bible Prophecy", "Benevolence"],
  },
  {
    id: "harambee-rabai",
    name: "Harambee & Rabai Cell",
    estate: "Harambee / Rabai Road",
    zone: "Zone C (Buruburu & Harambee)",
    leader: "Eld. Christopher Ombati",
    hostFamily: "Sister Nyatuka & Family",
    meetingDay: "Every Wednesday",
    meetingTime: "06:00 PM – 07:30 PM",
    venue: "Harambee Estate Common Hall / Member Residences",
    contactPhone: "+254 700 000 004",
    description:
      "A warm, welcoming fellowship focused on practical Christian living, literature distribution, and mutual support during times of bereavement or joy.",
    focusAreas: ["Dorcas Welfare", "Literature Outreach", "Midweek Testimonies"],
  },
  {
    id: "pioneer-lumumba",
    name: "Pioneer & Lumumba Cell",
    estate: "Pioneer / Lumumba Drive",
    zone: "Zone D (Pioneer & Outer Ring)",
    leader: "Eld. Vincent Samuel",
    hostFamily: "Bro. Ocholla Residence",
    meetingDay: "Every Wednesday",
    meetingTime: "06:30 PM – 07:45 PM",
    venue: "Designated Host Families",
    contactPhone: "+254 700 000 005",
    description:
      "Active fellowship cell bringing neighbors together for devotional study, prayer for community youth, and spiritual renewal.",
    focusAreas: ["Family Health", "Youth Mentorship", "Bible Studies"],
  },
  {
    id: "campus-diaspora",
    name: "Campus & Young Professionals Cell",
    estate: "University Hostels & Town Diaspora",
    zone: "Special Interest Fellowship",
    leader: "Youth Leadership Council",
    hostFamily: "Hybrid (In-person & Virtual Zoom/Meet)",
    meetingDay: "Every Thursday",
    meetingTime: "07:30 PM – 08:45 PM",
    venue: "Google Meet & Youth Upper Room",
    contactPhone: "+254 700 000 006",
    description:
      "A tailored cell group catering to university students and young professionals navigating campus life, career growth, and consecrated living.",
    focusAreas: ["Campus Discipleship", "Career Mentorship", "Virtual Prayer"],
  },
];