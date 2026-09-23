export interface Announcement {
  id: string;
  active: boolean;
  badge: string;
  dateOrQuarter: string;
  title: string;
  subtitle: string;
  highlightPoints: string[];
  ctaLabel: string;
  ctaLink: string;
  imageUrl: string;
  videoUrl?: string;
}

export interface Announcement {
  id: string;
  active: boolean;
  badge: string;
  dateOrQuarter: string;
  title: string;
  subtitle: string;
  highlightPoints: string[];
  ctaLabel: string;
  ctaLink: string;
  imageUrl: string;
  videoUrl?: string;
}

export const currentAnnouncement: Announcement = {
  id: "one-voice-27",
  active: true,
  badge: "Global Mission Priority",
  dateOrQuarter: "2026 – 2027 Strategic Initiative",
  title: "One Voice 27: Mobilizing Eastlands for Christ",
  subtitle:
    "An evangelistic, total-member-involvement campaign connecting every Jericho SDA family, youth ambassador, and prayer cell to personal community mission.",
  highlightPoints: [
    "Neighborhood door-to-door visitation & prayer walks across Eastlands",
    "Digital evangelism & youth-led multimedia ministry distribution",
    "Community health expos and pastoral care in Lumumba, Buruburu, and Uhuru",
  ],
  ctaLabel: "Join Mission Team",
  ctaLink: "/departments/adventist-youth",
  imageUrl: "/one-voice-cover.png",
  videoUrl: "/onevoice27.mp4",
};

/* ============================================================
   WEEKLY BULLETIN & ORDER OF SERVICE DATA
   ============================================================ */

export interface OrderOfServiceItem {
  part: string;
  detail: string;
  facilitator: string;
  hymnOrScripture?: string;
}

export interface DepartmentNotice {
  id: string;
  department: string;
  title: string;
  content: string;
  actionText?: string;
  actionLink?: string;
  badgeColor?: string;
}

export interface WeeklyBulletinData {
  sabbathDate: string;
  sunsetFriday: string;
  sunsetSabbath: string;
  sabbathSchoolTheme: string;
  sabbathSchoolMemoryVerse: string;
  divineSermonTitle: string;
  divinePreacher: string;
  divineScripture: string;
  dutyOfficers: {
    dutyElder: string;
    associateElder: string;
    headDeacon: string;
    headDeaconess: string;
    chorister: string;
    pianist: string;
  };
  orderOfDivineService: OrderOfServiceItem[];
  departmentNotices: DepartmentNotice[];
}

export const weeklyBulletin: WeeklyBulletinData = {
  sabbathDate: "Upcoming Sabbath, September 2026",
  sunsetFriday: "6:24 PM",
  sunsetSabbath: "6:24 PM",
  sabbathSchoolTheme: "Growing in Grace & The Holy Word",
  sabbathSchoolMemoryVerse:
    "Thy word is a lamp unto my feet, and a light unto my path. — Psalm 119:105",
  divineSermonTitle: "Grounded In The Word: Obey, Trust & Live",
  divinePreacher: "Pst. Hudson Machoka",
  divineScripture: "Isaiah 1:19-20",
  dutyOfficers: {
    dutyElder: "Eld. Nathan Khamala",
    associateElder: "Eld. Charles Omollo",
    headDeacon: "Bro. Evans Johny",
    headDeaconess: "Sister Dorcas Atieno",
    chorister: "Sister Lillian Nyangie",
    pianist: "Brother Gideon Oloo",
  },
  orderOfDivineService: [
    {
      part: "Song Service",
      detail: "Songs of Zion & Congregational Warm-up",
      facilitator: "Chorister & Praise Team",
      hymnOrScripture: "SDAH 590 / NZK 128",
    },
    {
      part: "Doxology & Processional",
      detail: "Congregation Stands as Roster Enters",
      facilitator: "Sanctuary Choir & Congregation",
      hymnOrScripture: "SDAH 694",
    },
    {
      part: "Invocation & Welcome",
      detail: "Opening Prayer & Fellowship Greeting",
      facilitator: "Duty Elder",
    },
    {
      part: "Scripture Reading",
      detail: "Holy Word Proclamation",
      facilitator: "Assisting Officer",
      hymnOrScripture: "Isaiah 1:19-20",
    },
    {
      part: "Pastoral Intercessory Prayer",
      detail: "Congregational Kneeling Intercession",
      facilitator: "Elder on Duty",
    },
    {
      part: "Tithes & Worship Offerings",
      detail: "Conference & Local Church Budget (Paybill 752922)",
      facilitator: "Deacons & Stewardship Committee",
    },
    {
      part: "Children’s Story",
      detail: "Object Lesson for Beginners & Primary",
      facilitator: "Children's Ministries Leader",
    },
    {
      part: "Ministry of Music",
      detail: "Special Song of Meditation",
      facilitator: "Jericho SDA Sanctuary Choir",
    },
    {
      part: "The Spoken Word",
      detail: "Grounded In The Word: Obey, Trust & Live",
      facilitator: "Pst. Hudson Machoka",
    },
    {
      part: "Hymn of Consecration",
      detail: "Closing Dedication",
      facilitator: "Congregation",
      hymnOrScripture: "SDAH 304",
    },
    {
      part: "Benediction",
      detail: "Dismissal Blessing & Silent Prayer",
      facilitator: "Preacher",
    },
  ],
  departmentNotices: [
    {
      id: "notice-1",
      department: "Adventist Youth (AY)",
      title: "One Voice 27 Outreach Walk",
      content:
        "All Ambassadors and AY members meet at 2:30 PM for neighborhood outreach and tract distribution across Lumumba and Jericho Phase 2.",
      actionText: "View Youth Ministry",
      actionLink: "/departments/adventist-youth",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      id: "notice-2",
      department: "Dorcas & Welfare",
      title: "Elderly Care & Food Basket Collection",
      content:
        "The Dorcas society requests non-perishable food donations (flour, rice, cooking oil) for vulnerable families in our Eastlands community.",
      actionText: "Support Welfare",
      actionLink: "/giving",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    {
      id: "notice-3",
      department: "Midweek Prayer",
      title: "Wednesday Night Sanctuary Intercession",
      content:
        "Join us this Wednesday from 5:45 PM to 7:00 PM for songs, prayer circles, and study in the sanctuary or through neighborhood prayer cells.",
      actionText: "Find Your Cell",
      actionLink: "/estates",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    },
    {
      id: "notice-4",
      department: "Adventist Men (AMO)",
      title: "Men’s Breakfast & Stewardship Forum",
      content:
        "All men of the church are invited for a monthly fellowship breakfast this coming Sunday at 7:30 AM in the church multipurpose hall.",
      actionText: "Contact Pastoral Desk",
      actionLink: "/care",
      badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
    },
  ],
};