"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  BookOpen,
  Music,
  Compass,
  X,
} from "lucide-react";

interface Ministry {
  id: string;
  name: string;
  category:
    | "Worship & Music"
    | "Youth & Children"
    | "Care & Family"
    | "Outreach & Mission";
  forWho: string;
  leaderTitle: string;
  leaderName: string;
  summary: string;
  fullDescription: string;
  activities: string[];
  schedule: string;
  contactAction: {
    label: string;
    href: string;
    isExternal?: boolean;
  };
  image?: string;
  badge?: string;
}

const MINISTRIES_DATA: Ministry[] = [
  {
    id: "music-ministry",
    name: "Sanctuary Choir & Music Ministry",
    category: "Worship & Music",
    forWho: "Vocalists, choristers, and sacred instrumentalists",
    leaderTitle: "Music Director",
    leaderName: "Director Brian / Elder Mwangi",
    summary:
      "Leading the congregation in sacred choral worship and classical hymnal praise.",
    fullDescription:
      "The Music Ministry coordinates choral presentations, congregational song service, and instrumental accompaniment to cultivate a reverent atmosphere for Divine Service and sacred programs.",
    activities: [
      "Sanctuary Choir & youth vocal ensembles",
      "Sabbath morning choral worship and special anthems",
      "Hymnal appreciation, four-part harmony & voice training sessions",
    ],
    schedule: "Rehearsals: Sabbath 02:00 PM & Midweek Evenings",
    contactAction: {
      label: "Inquire About Choir Membership",
      href: "/care",
    },
    image: "/choir-worship.jpg",
    badge: "Sanctuary Choirs",
  },
  {
    id: "adventist-youth",
    name: "Adventist Youth Society (AY)",
    category: "Youth & Children",
    forWho: "Teens, campus students, and young professionals (16–30 yrs)",
    leaderTitle: "AY Leader",
    leaderName: "Bro. Kevin / Elder Kariuki",
    summary:
      "Spiritual empowerment, open discussions, missions, and youth fellowship.",
    fullDescription:
      "The AY Society engages senior youth and young adults in spiritual development, community outreach through One Voice 27, and peer mentorship navigating campus and career life.",
    activities: [
      "Weekly Sabbath afternoon interactive youth discussions",
      "Neighborhood evangelism & door-to-door visitation",
      "Social fellowships, sports days, and career mentorship forums",
    ],
    schedule: "Every Sabbath from 02:00 PM – 04:00 PM",
    contactAction: {
      label: "Connect with Youth Leadership",
      href: "/care",
    },
    badge: "One Voice 27 Active",
  },
  {
    id: "pathfinders-adventurers",
    name: "Pathfinder & Adventurer Club",
    category: "Youth & Children",
    forWho: "Children & young teens aged 4 to 15 years",
    leaderTitle: "Club Director",
    leaderName: "Director Omwamba",
    summary:
      "Character building, outdoor honors, camping, and marching drill training.",
    fullDescription:
      "A Christ-centered scout development program guiding young people through Bible study, outdoor camping, first aid, nature appreciation, and marching drills.",
    activities: [
      "Classwork honors and practical skill badges",
      "Annual club campouts, hiking, and nature expeditions",
      "Drill and marching team presentations",
    ],
    schedule: "Alternating Sundays from 09:00 AM – 12:00 PM",
    contactAction: {
      label: "Enroll Your Child",
      href: "/care",
    },
    badge: "Junior Youth",
  },
  {
    id: "personal-ministries",
    name: "Personal Ministries & Evangelism",
    category: "Outreach & Mission",
    forWho: "All believers desiring to share the gospel in Eastlands",
    leaderTitle: "PM Director",
    leaderName: "Elder Mutua",
    summary:
      "Literature evangelism, neighborhood Bible studies, and mission outreach.",
    fullDescription:
      "Mobilizing church members to share the gospel across Nairobi Eastlands through literature distribution, Bible correspondence studies, and community evangelistic campaigns.",
    activities: [
      "Door-to-door literature distribution and community prayer walks",
      "Individual and group Bible study enrollments",
      "Coordination of community evangelistic campaigns",
    ],
    schedule: "Outreach: Sabbath 04:00 PM & Sunday Mornings",
    contactAction: {
      label: "Request Bible Study Guides",
      href: "/care",
    },
  },
  {
    id: "estate-prayer-cells",
    name: "Estate Fellowships & Prayer Cells",
    category: "Outreach & Mission",
    forWho: "Households residing in Buruburu, Jericho, Lumumba, Makadara & Donholm",
    leaderTitle: "Council of Elders",
    leaderName: "Assigned Estate Elders",
    summary:
      "Neighborhood prayer circles, welfare visits, and midweek fellowship.",
    fullDescription:
      "Small fellowship circles organized across residential estates in Eastlands to provide close spiritual care, mutual support, and prayer near where members live.",
    activities: [
      "Midweek home prayer and testimony sessions",
      "Neighborhood welfare checks and family visits",
      "Estate WhatsApp communication channels",
    ],
    schedule: "Midweek Wednesdays &bull; 6:00 PM (Rotating Homes)",
    contactAction: {
      label: "Open Estate Directory",
      href: "/members/cells",
    },
    badge: "5 Active Zones",
  },
  {
    id: "dorcas-women",
    name: "Dorcas & Women's Ministries (AWM)",
    category: "Care & Family",
    forWho: "All women, mothers, and young adult ladies",
    leaderTitle: "Department Head",
    leaderName: "Sister Ochieng / Elder Otieno",
    summary:
      "Benevolence, community welfare, hospital visits, and spiritual sisterhood.",
    fullDescription:
      "Ministering practical love to the sick, elderly, widows, and vulnerable households in the community through food parcels, clothing drives, and intercessory visits.",
    activities: [
      "Community welfare and charitable food basket support",
      "Hospital and home visitation ministries",
      "Women's prayer breakfast, parenting, and empowerment sessions",
    ],
    schedule: "2nd Sunday of the month &bull; 2:00 PM",
    contactAction: {
      label: "Request or Offer Welfare Aid",
      href: "/care",
    },
  },
  {
    id: "amo-men",
    name: "Adventist Men Organization (AMO)",
    category: "Care & Family",
    forWho: "Men, fathers, husbands, and young male adults",
    leaderTitle: "AMO Leader",
    leaderName: "Elder Mwangi",
    summary:
      "Christian manhood, family stewardship, mentorship, and practical church service.",
    fullDescription:
      "Uniting Adventist men to lead faithfully at home, in church, and in society through mentorship, community service projects, and spiritual brotherhood.",
    activities: [
      "Monthly men's breakfast prayer fellowships",
      "Church maintenance, infrastructure, and community work bees",
      "Fatherhood, financial management, and family leadership forums",
    ],
    schedule: "3rd Sunday of the month &bull; 8:00 AM",
    contactAction: {
      label: "Connect with AMO Leadership",
      href: "/care",
    },
  },
  {
    id: "sabbath-school",
    name: "Sabbath School Department",
    category: "Worship & Music",
    forWho: "The entire church family and first-time guests of all backgrounds",
    leaderTitle: "Superintendent",
    leaderName: "Elder Mutua",
    summary:
      "Interactive small-group Bible study discussions and global mission focus.",
    fullDescription:
      "The primary instructional heart of the church, where members gather weekly in small classes to discuss the Bible study guide (Quarterly), ask honest questions, and support world missions.",
    activities: [
      "Age-graded and visitor-friendly class discussions",
      "Weekly worldwide mission spotlights and missionary reports",
      "Teacher training and quarterly study guide distribution",
    ],
    schedule: "Every Sabbath from 08:00 AM – 10:45 AM",
    contactAction: {
      label: "View Weekly Bulletin",
      href: "/bulletin",
    },
  },
  {
    id: "stewardship",
    name: "Stewardship & Church Development",
    category: "Care & Family",
    forWho: "Every church member and household steward",
    leaderTitle: "Stewardship Secretary",
    leaderName: "Elder Kariuki",
    summary:
      "Biblical financial principles, tithes, combined offerings, and project pledges.",
    fullDescription:
      "Encouraging faithful stewardship of time, talents, and resources, and guiding members on the systematic support of the local church budget and conference trust funds.",
    activities: [
      "Tithe and offering education and transparent reporting",
      "Personal and family financial wellness workshops",
      "Sanctuary improvement and project development pledges",
    ],
    schedule: "Quarterly Stewardship Seminars",
    contactAction: {
      label: "Go to Online Giving Portal",
      href: "/giving",
    },
  },
];

const CATEGORIES = [
  "All",
  "Worship & Music",
  "Youth & Children",
  "Outreach & Mission",
  "Care & Family",
];

export default function MinistriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMinistry, setActiveMinistry] = useState<Ministry | null>(null);

  // Close modal when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMinistry(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeMinistry) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeMinistry]);

  const filteredMinistries = MINISTRIES_DATA.filter((m) => {
    const matchesCat =
      selectedCategory === "All" || m.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      m.name.toLowerCase().includes(query) ||
      m.summary.toLowerCase().includes(query) ||
      m.forWho.toLowerCase().includes(query) ||
      m.leaderName.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  return (
    <main
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #e0edff 50%, #bfdbfe 100%)",
        minHeight: "100vh",
      }}
      className="text-slate-800 min-h-screen pb-28 pt-32 sm:pt-40 font-sans"
    >
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        {/* 1. Header Banner */}
        <section className="bg-[#001f44] text-white rounded-3xl p-6 sm:p-10 shadow-md relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-300 bg-amber-400/10 border border-amber-300/20 px-3 py-1 rounded-full inline-block">
              Departments &amp; Ministries
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-white leading-tight">
              Serving God, Nurturing Believers, Reaching Nairobi
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm font-sans leading-relaxed pt-1">
              Tap any ministry card below to view department details, meeting
              schedules, and leadership contacts.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs text-blue-100 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Coordinated under the Church Board &amp; Pastorate</span>
            </div>
            <Link
              href="/leadership"
              className="text-amber-300 hover:text-white font-medium underline underline-offset-4 transition"
            >
              View Full Leadership Directory &rarr;
            </Link>
          </div>
        </section>

        {/* 2. Interactive Category Filter & Search Bar */}
        <section className="space-y-4 pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-blue-950 font-normal">
                Ministry Directory
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Click any department card to explore full activities and schedules.
              </p>
            </div>

            <div className="w-full sm:w-72 relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-blue-500" />
              <input
                type="text"
                placeholder="Search ministries or leaders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white/90 border border-blue-200/80 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition shadow-xs"
              />
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white/80 text-slate-600 hover:bg-white hover:text-blue-600 border border-blue-100"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Ministries Grid Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMinistries.map((ministry) => {
            return (
              <div
                key={ministry.id}
                onClick={() => setActiveMinistry(ministry)}
                className="bg-white/85 backdrop-blur-md rounded-2xl border border-blue-100 shadow-xs hover:border-blue-400/80 hover:bg-white hover:shadow-md transition p-5 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      {ministry.category}
                    </span>
                    {ministry.badge && (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {ministry.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-blue-700 transition">
                      {ministry.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {ministry.summary}
                    </p>
                  </div>

                  {/* Target Audience Pill */}
                  <div className="bg-blue-50/50 border border-blue-100/70 rounded-lg p-2.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Ideal For
                    </span>
                    <p className="text-xs font-medium text-slate-700 mt-0.5">
                      {ministry.forWho}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    {ministry.leaderTitle}
                  </span>
                  <span className="font-bold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        {filteredMinistries.length === 0 && (
          <div className="text-center py-12 bg-white/80 border border-blue-100 rounded-2xl p-6">
            <p className="text-slate-500 text-sm font-medium">
              No ministry found matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-xs text-blue-600 font-bold mt-2 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* 4. MODAL POP-UP */}
      {activeMinistry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-blue-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveMinistry(null)}
          />

          {/* Modal Container */}
          <div
            className="relative bg-white rounded-3xl shadow-2xl border border-blue-100 max-w-lg w-full max-h-[90vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-150"
            role="dialog"
            aria-modal="true"
          >
            {/* Optional Header Image */}
            {activeMinistry.image && (
              <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                <img
                  src={activeMinistry.image}
                  alt={activeMinistry.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <span className="absolute bottom-3 left-4 text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-blue-950/80 px-2.5 py-0.5 rounded border border-amber-300/30">
                  {activeMinistry.category}
                </span>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {!activeMinistry.image && (
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 inline-block mb-1.5">
                      {activeMinistry.category}
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl font-serif text-blue-950 leading-snug font-normal">
                    {activeMinistry.name}
                  </h3>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveMinistry(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                {activeMinistry.fullDescription}
              </p>

              {/* Target Audience Pill */}
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3">
                <span className="text-[10px] uppercase font-bold text-blue-900 block tracking-wider">
                  Audience &amp; Life Stage
                </span>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">
                  {activeMinistry.forWho}
                </p>
              </div>

              {/* Key Activities */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Core Activities &amp; Programs
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                  {activeMinistry.activities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">&bull;</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Leadership & Schedule Details */}
              <div className="space-y-2 text-xs text-slate-600 pt-1 border-t border-slate-100">
                <p className="flex items-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-800">Regular Schedule:</strong>{" "}
                    {activeMinistry.schedule}
                  </span>
                </p>
                <p>
                  <span className="text-slate-400">{activeMinistry.leaderTitle}: </span>
                  <strong className="text-slate-800">{activeMinistry.leaderName}</strong>
                </p>
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center gap-3">
                <Link
                  href={activeMinistry.contactAction.href}
                  onClick={() => setActiveMinistry(null)}
                  className="flex-1 text-center py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition shadow-xs"
                >
                  {activeMinistry.contactAction.label} &rarr;
                </Link>

                <button
                  type="button"
                  onClick={() => setActiveMinistry(null)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}