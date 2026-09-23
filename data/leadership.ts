export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  category: "Pastoral" | "Elders" | "Secretariat & Finance" | "Deaconry" | "Departmental";
  phone?: string;
  email?: string;
  term?: string;
  image?: string; // Path in public/ e.g. "/images/leaders/pastor.jpg"
  avatarInitials: string;
  bio: string;
}

export const churchLeadership: LeaderProfile[] = [
  // 1. PASTORAL
  {
    id: "pastor-district",
    name: "Pr. District Pastor",
    role: "Senior District Pastor",
    category: "Pastoral",
    phone: "+254 700 000 100",
    email: "pastor@jerichosda.church",
    term: "Central Kenya Conference (CKC)",
    image: "",
    avatarInitials: "PR",
    bio: "Provides overarching spiritual direction, pastoral oversight, biblical counseling, and conference administration for Jericho SDA Church.",
  },

  // 2. ELDERSHIP (SESSION)
  {
    id: "first-elder",
    name: "Eld. Nathan Khamala",
    role: "First Elder",
    category: "Elders",
    phone: "+254 700 000 101",
    email: "firstelder@jerichosda.church",
    image: "",
    avatarInitials: "NK",
    bio: "Leads the local board of elders, coordinating pulpit ministry, estate fellowship clusters, and church administrative harmony.",
  },
  {
    id: "elder-worship",
    name: "Eld. Charles Omollo",
    role: "Associate Elder (Worship & Liturgy)",
    category: "Elders",
    image: "",
    avatarInitials: "CO",
    bio: "Oversees weekly divine service order, platform coordination, and mid-week prayer meeting agendas.",
  },
  {
    id: "elder-evangelism",
    name: "Eld. William Obonyo",
    role: "Associate Elder (Evangelism & Personal Ministries)",
    category: "Elders",
    image: "",
    avatarInitials: "WO",
    bio: "Spearheads neighborhood missionary campaigns, Voice of Prophecy enrollments, and baptismal class guidance.",
  },
  {
    id: "elder-nurture",
    name: "Eld. Christopher Ombati",
    role: "Associate Elder (Nurture & Discipleship)",
    category: "Elders",
    image: "",
    avatarInitials: "CO",
    bio: "Supervises youth societies, Sabbath school unit classes, and member retention initiatives.",
  },

  // 3. SECRETARIAT & FINANCE
  {
    id: "church-clerk",
    name: "Sr. Church Clerk",
    role: "Head Church Clerk",
    category: "Secretariat & Finance",
    email: "clerk@jerichosda.church",
    image: "",
    avatarInitials: "CC",
    bio: "Maintains the official church membership register, baptismal records, membership transfers, and church business meeting minutes.",
  },
  {
    id: "church-treasurer",
    name: "Bro. Head Treasurer",
    role: "Church Treasurer",
    category: "Secretariat & Finance",
    email: "treasury@jerichosda.church",
    image: "",
    avatarInitials: "TR",
    bio: "Manages receipting, sacred tithe remittance to the Conference, local church budget allocations, and M-PESA paybill reconciliation.",
  },

  // 4. DEACONRY
  {
    id: "head-deacon",
    name: "Bro. Head Deacon",
    role: "Head Deacon",
    category: "Deaconry",
    image: "",
    avatarInitials: "HD",
    bio: "Coordinates sanctuary order, ushering, church security, physical facility maintenance, and communion service logistics.",
  },
  {
    id: "head-deaconess",
    name: "Sr. Head Deaconess",
    role: "Head Deaconess",
    category: "Deaconry",
    image: "",
    avatarInitials: "SD",
    bio: "Directs sanctuary floral care, communion linen preparations, visitation of the sick, and candidate preparation for sacred baptism.",
  },

  // 5. DEPARTMENTAL DIRECTORS
  {
    id: "ambassadors-director",
    name: "Hazel Osuo",
    role: "Ambassadors Club Director",
    category: "Departmental",
    email: "ambassadors@jerichosda.church",
    image: "",
    avatarInitials: "HO",
    bio: "Directs post-Pathfinder youth (ages 16–21) across spiritual development, 2026 calendar activities, leadership formation, and community outreach.",
  },
  {
    id: "ambassadors-asst-director",
    name: "Micah Mitoko",
    role: "Assistant Ambassadors Director",
    category: "Departmental",
    image: "",
    avatarInitials: "MM",
    bio: "Assists in program execution, logistics, event documentation, and member mobilization for the Ambassadors Club.",
  },
  {
    id: "youth-director",
    name: "Youth Society Leader",
    role: "Adventist Youth (AY) Leader",
    category: "Departmental",
    image: "",
    avatarInitials: "AY",
    bio: "Mobilizes senior youth and young adults for Friday vespers, Sabbath afternoon AY programs, and district congresses.",
  },
  {
    id: "possibility-leader",
    name: "Possibility Ministries Coordinator",
    role: "Adventist Possibility Ministries (APM) Leader",
    category: "Departmental",
    image: "",
    avatarInitials: "PM",
    bio: "Fosters an inclusive sanctuary environment for persons living with disabilities, advocating sign language access and caregiver support.",
  },
  {
    id: "health-leader",
    name: "Health Ministries Leader",
    role: "Health & Temperance Leader",
    category: "Departmental",
    image: "",
    avatarInitials: "HM",
    bio: "Promotes preventative health principles (NEWSTART), monthly screenings, and community medical clinics.",
  },
  {
    id: "dorcas-leader",
    name: "Dorcas Society Leader",
    role: "Community Services & Dorcas Leader",
    category: "Departmental",
    image: "",
    avatarInitials: "DS",
    bio: "Orchestrates food bank distribution, hospital visitations, and compassionate welfare relief for vulnerable families.",
  },
];