export interface PastoralRequest {
  id: string;
  type: "Prayer Request" | "Home Visit" | "Hospital Visit" | "Counseling" | "Child Dedication";
  submitterName: string;
  phone: string;
  estate: string;
  details: string;
  preferredDate?: string;
  isConfidential: boolean;
  status: "Pending" | "Assigned" | "Visited / Completed";
  assignedElder?: string;
  submittedAt: string;
}

export interface SuggestionBoxItem {
  id: string;
  category: "Welfare" | "Church Development" | "Worship & Liturgy" | "Youth Ministry" | "General";
  subject: string;
  message: string;
  isAnonymous: boolean;
  submittedBy?: string;
  contact?: string;
  status: "Unreviewed" | "Discussed in Session" | "Action Taken";
  submittedAt: string;
}

export const initialPastoralRequests: PastoralRequest[] = [
  {
    id: "req-101",
    type: "Hospital Visit",
    submitterName: "Bro. Patrick Ochieng",
    phone: "0712 345 678",
    estate: "Mama Lucy Kibaki Hospital (Ward 4B)",
    details: "Admitted following acute chest infection. Family requests pastoral prayer and encouragement.",
    preferredDate: "Earliest Sabbath afternoon",
    isConfidential: false,
    status: "Pending",
    submittedAt: "10th Sep 2026",
  },
  {
    id: "req-102",
    type: "Counseling",
    submitterName: "Confidential Member",
    phone: "0722 000 111",
    estate: "Buruburu Phase 2",
    details: "Facing severe marital strain and financial grief. Requests private consultation with Pastor.",
    preferredDate: "Wednesday pastoral hours",
    isConfidential: true,
    status: "Assigned",
    assignedElder: "Pr. District Pastor",
    submittedAt: "08th Sep 2026",
  },
  {
    id: "req-103",
    type: "Home Visit",
    submitterName: "Sr. Mary Moraa",
    phone: "0733 999 888",
    estate: "Jericho Estate Phase 1",
    details: "Elderly mother visiting from rural home; would love communion fellowship and home prayer.",
    preferredDate: "Sunday 10:00 AM",
    isConfidential: false,
    status: "Visited / Completed",
    assignedElder: "Eld. Nathan Khamala",
    submittedAt: "05th Sep 2026",
  },
];

export const initialSuggestions: SuggestionBoxItem[] = [
  {
    id: "sug-201",
    category: "Church Development",
    subject: "Sanctuary Wheelchair Ramp Handrails",
    message: "Appreciating the new ramp, but we request adding a sturdier double handrail to assist elderly and visually impaired members during rainy Sabbaths.",
    isAnonymous: true,
    status: "Discussed in Session",
    submittedAt: "07th Sep 2026",
  },
  {
    id: "sug-202",
    category: "Youth Ministry",
    subject: "Post-AY Mentorship Session Space",
    message: "Could the board approve the use of the lower vestry after AY for young professionals career mentorship breakout circles?",
    isAnonymous: false,
    submittedBy: "Job Kegesa",
    contact: "0711 222 333",
    status: "Unreviewed",
    submittedAt: "09th Sep 2026",
  },
];