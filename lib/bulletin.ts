import { createClient } from "@supabase/supabase-js";

export interface ServiceItem {
  time?: string;
  item: string;
  person?: string;
}

export interface BulletinData {
  id?: string;
  sabbathDate: string; // YYYY-MM-DD
  theme: string;
  preacher: string;
  scriptureReading: string;
  lessonStudy: {
    number: string;
    title: string;
    memoryVerse?: string;
  };
  sabbathSchool: ServiceItem[];
  divineService: ServiceItem[];
  announcements: string[];
  dutyRoster: {
    chorister?: string;
    pianist?: string;
    deacons?: string;
    deaconesses?: string;
    elderInCharge?: string;
  };
}

const DEFAULT_BULLETIN: BulletinData = {
  sabbathDate: "2026-10-17",
  theme: "Faithful Stewards of His Grace",
  preacher: "Pr. D. Omwega",
  scriptureReading: "1 Peter 4:10",
  lessonStudy: {
    number: "Lesson 3",
    title: "The Everlasting Gospel",
    memoryVerse: "Revelation 14:6, 7",
  },
  dutyRoster: {
    elderInCharge: "Elder Otieno",
    chorister: "Br. Brian",
    pianist: "Sr. Naomi",
    deacons: "Team A (Br. Kevin & Team)",
    deaconesses: "Team A (Sr. Grace & Team)",
  },
  sabbathSchool: [
    { time: "09:00 - 09:15", item: "Song Service", person: "Chorister & Congregation" },
    { time: "09:15 - 09:30", item: "Superintendent Remarks & Prayer", person: "SS Superintendent" },
    { time: "09:30 - 09:40", item: "Mission Spotlight / Story", person: "Communications Desk" },
    { time: "09:40 - 10:30", item: "Lesson Study (Classes)", person: "Class Teachers" },
    { time: "10:30 - 10:40", item: "Superintendent Summary", person: "SS Superintendent" },
  ],
  divineService: [
    { time: "10:45 - 11:00", item: "Song Service & Introit", person: "Chorister & Choir" },
    { time: "11:00 - 11:05", item: "Doxology & Invocation", person: "Pulpit Party" },
    { time: "11:05 - 11:15", item: "Welcome & Church Clerk Announcements", person: "Church Clerk" },
    { time: "11:15 - 11:25", item: "Tithe, Combined Offering & Prayer", person: "Deacons / Elder" },
    { time: "11:25 - 11:35", item: "Children's Story", person: "Children Ministries" },
    { time: "11:35 - 11:40", item: "Scripture Reading", person: "Youth Department" },
    { time: "11:40 - 11:45", item: "Special Item", person: "Jericho Church Choir" },
    { time: "11:45 - 12:45", item: "Sermon: Faithful Stewards", person: "Pr. D. Omwega" },
    { time: "12:45 - 12:50", item: "Closing Hymn & Benediction", person: "Congregation & Preacher" },
  ],
  announcements: [
    "Combined Estate Fellowship holds this Wednesday at 5:30 PM across all designated cell centres.",
    "Youth Choir rehearsals resume on Sunday afternoon at 2:00 PM in the main sanctuary.",
    "Annual Camp Meeting pledge redemption ongoing through M-PESA Paybill 752922.",
    "Jericho Dorcas & Welfare department visitation to Kenyatta National Hospital scheduled for next Sabbath afternoon.",
  ],
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.startsWith("https://your-")) return null;
  return createClient(url, key);
}

export async function getLatestBulletin(): Promise<BulletinData> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("bulletins")
        .select("*")
        .order("sabbath_date", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        return {
          id: data.id,
          sabbathDate: data.sabbath_date,
          theme: data.theme,
          preacher: data.preacher,
          scriptureReading: data.scripture_reading,
          lessonStudy: data.lesson_study || DEFAULT_BULLETIN.lessonStudy,
          sabbathSchool: data.sabbath_school || [],
          divineService: data.divine_service || [],
          announcements: data.announcements || [],
          dutyRoster: data.duty_roster || {},
        };
      }
    } catch (e) {
      console.warn("Failed to fetch bulletin from Supabase, using default:", e);
    }
  }

  return DEFAULT_BULLETIN;
}