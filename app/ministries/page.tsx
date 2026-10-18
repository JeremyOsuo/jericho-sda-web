"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Ministry {
  id: string;
  name: string;
  category: "Worship & Music" | "Youth & Children" | "Care & Family" | "Outreach & Mission";
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
    leaderTitle: "Music Director",
    leaderName: "[Leader Name Placeholder]",
    summary: "Leading the congregation in sacred choral worship and hymnal praise.",
    fullDescription:
      "The Music Ministry coordinates choral presentations, congregational song service, and instrumental accompaniment to cultivate a reverent atmosphere for Divine Service and sacred programs.",
    activities: [
      "Sanctuary Choir & youth vocal ensembles",
      "Sabbath morning choral worship and special anthems",
      "Hymnal appreciation & voice training sessions",
    ],
    schedule: "Rehearsals: Sabbath 02:00 PM & Midweek Evenings",
    contactAction: {
      label: "Inquire About Choir Membership",
      href: "/care",
    },
    image: "/choir-worship.jpg",
    badge: "Active Sanctuary Ministry",
  },
  {
    id: "adventist-youth",
    name: "Adventist Youth Society (AY)",
    category: "Youth & Children",
    leaderTitle: "AY Leader",
    leaderName: "[Leader Name Placeholder]",
    summary: "Spiritual empowerment, missions, and youth fellowship programs.",
    fullDescription:
      "The AY Society engages senior youth and young adults in spiritual development, community outreach through One Voice 27, and peer mentorship.",
    activities: [
      "Weekly Sabbath afternoon AY programs",
      "Neighborhood evangelism & door-to-door visitation",
      "Social fellowships, sports days, and mentorship forums",
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
    leaderTitle: "Club Director",
    leaderName: "[Leader Name Placeholder]",
    summary: "Character building, outdoor honors, and drill training for young people.",
    fullDescription:
      "Designed for children and young teens aged 4–15, guiding them through spiritual study, campouts, community honors, marching drills, and nature appreciation.",
    activities: [
      "Classwork honors and skill badges",
      "Annual club campouts and nature expeditions",
      "Drill and marching presentations",
    ],
    schedule: "Alternating Sundays from 09:00 AM – 12:00 PM",
    contactAction: {
      label: "Enroll Your Child",
      href: "/care",
    },
  },
  {
    id: "personal-ministries",
    name: "Personal Ministries & Evangelism",
    category: "Outreach & Mission",
    leaderTitle: "PM Director",
    leaderName: "[Leader Name Placeholder]",
    summary: "Literature evangelism, Bible studies, and neighborhood outreach.",
    fullDescription:
      "Mobilizing church members to share the gospel across Eastlands through tract distribution, Bible correspondence studies, and visitor welcome initiatives.",
    activities: [
      "Door-to-door literature distribution",
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
    leaderTitle: "Council of Elders",
    leaderName: "Assigned Estate Elders",
    summary: "Neighborhood prayer circles, welfare visits, and mid-week care.",
    fullDescription:
      "Small fellowship circles organized across residential estates in Eastlands to provide close spiritual and welfare support near where members live.",
    activities: [
      "Midweek home prayer and testimony sessions",
      "Neighborhood welfare checks and family visits",
      "Estate WhatsApp communication channels",
    ],
    schedule: "Coordinated through Estate WhatsApp Groups",
    contactAction: {
      label: "Open Estate Directory",
      href: "/estates",
    },
    badge: "7 Eastlands Zones",
  },
  {
    id: "dorcas-women",
    name: "Dorcas & Women's Ministries",
    category: "Care & Family",
    leaderTitle: "Department Head",
    leaderName: "[Leader Name Placeholder]",
    summary: "Benevolence, welfare support, and nurturing spiritual sisterhood.",
    fullDescription:
      "Ministering practical love to the sick, elderly, widows, and needy in the community through food parcels, clothing drives, and intercessory visits.",
    activities: [
      "Community welfare and charitable support",
      "Hospital and home visitation ministries",
      "Women's prayer breakfast and empowerment sessions",
    ],
    schedule: "Sabbath Afternoons & Designated Visitation Days",
    contactAction: {
      label: "Request or Offer Welfare Aid",
      href: "/care",
    },
  },
  {
    id: "amo-men",
    name: "Adventist Men Organization (AMO)",
    category: "Care & Family",
    leaderTitle: "AMO Leader",
    leaderName: "[Leader Name Placeholder]",
    summary: "Christian manhood, family mentorship, and practical church service.",
    fullDescription:
      "Uniting Adventist men to lead faithfully at home, in church, and in society through mentorship, community service, and spiritual brotherhood.",
    activities: [
      "Men's prayer breakfasts and spiritual discussions",
      "Church maintenance and community work programs",
      "Fatherhood and family leadership forums",
    ],
    schedule: "Monthly Gatherings & Scheduled Service Days",
    contactAction: {
      label: "Connect with AMO Leadership",
      href: "/care",
    },
  },
  {
    id: "sabbath-school",
    name: "Sabbath School Department",
    category: "Worship & Music",
    leaderTitle: "Superintendent",
    leaderName: "[Leader Name Placeholder]",
    summary: "Interactive Bible lesson discussions and global mission focus.",
    fullDescription:
      "The primary instructional forum of the church, where members gather weekly in small classes to discuss the Bible study guide, sing, and support missions.",
    activities: [
      "Age-graded class discussions every Sabbath",
      "Weekly worldwide mission spotlights",
      "Teacher training and quarterly lesson distribution",
    ],
    schedule: "Every Sabbath from 08:00 AM – 10:45 AM",
    contactAction: {
      label: "View Weekly Bulletin & Order",
      href: "/bulletin",
    },
  },
  {
    id: "stewardship",
    name: "Stewardship & Church Development",
    category: "Care & Family",
    leaderTitle: "Stewardship Secretary",
    leaderName: "[Leader Name Placeholder]",
    summary: "Biblical financial principles, tithes, offerings, and campus care.",
    fullDescription:
      "Encouraging faithful stewardship of time, talents, and resources, and guiding members on the systematic support of the local church budget and conference funds.",
    activities: [
      "Tithe and offering education and reporting",
      "Personal and family financial wellness workshops",
      "Sanctuary improvement and project pledges",
    ],
    schedule: "Ongoing Stewardship Seminars",
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
    const matchesCat = selectedCategory === "All" || m.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      m.name.toLowerCase().includes(query) ||
      m.summary.toLowerCase().includes(query) ||
      m.leaderName.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  return (
    <main className="bg-[#fcfbf9] text-stone-900 min-h-screen pb-24 pt-32 sm:pt-40">
      <div className="max-w-5xl mx-auto px-6 space-y-8">

        {/* 1. Header Banner */}
        <section className="bg-[#001f44] text-white rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-300 bg-amber-400/10 border border-amber-300/20 px-3 py-1 rounded-full inline-block">
              Departments &amp; Ministries
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-stone-50 leading-tight">
              Serving God, Nurturing Believers, Reaching Nairobi
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm font-serif leading-relaxed pt-1">
              Tap any ministry card below to view department details, meeting schedules, and leader contact channels.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-300 relative z-10">
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
        <section className="space-y-4 pb-2 border-b border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#001f44]">
                Ministry Directory
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 font-serif mt-0.5">
                Click any department to open its overview.
              </p>
            </div>

            <div className="w-full sm:w-72">
              <input
                type="text"
                placeholder="Search ministries or leaders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#001f44] transition shadow-sm"
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[#001f44] text-white shadow-sm"
                      : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
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
                className="bg-white rounded-xl border border-stone-200/90 shadow-sm hover:border-[#001f44]/50 hover:shadow-md transition p-5 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded">
                      {ministry.category}
                    </span>
                    {ministry.badge && (
                      <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                        {ministry.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif font-semibold text-base text-stone-900 group-hover:text-[#001f44] transition">
                      {ministry.name}
                    </h3>
                    <p className="text-xs text-stone-600 font-serif mt-1.5 line-clamp-2 leading-relaxed">
                      {ministry.summary}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-medium">
                    {ministry.leaderTitle}
                  </span>
                  <span className="font-semibold text-[#001f44] group-hover:underline flex items-center gap-1">
                    Details &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        {filteredMinistries.length === 0 && (
          <div className="text-center py-12 bg-white border border-stone-200 rounded-xl p-6">
            <p className="text-stone-500 text-sm font-serif">
              No ministry found matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-xs text-[#001f44] font-semibold mt-2 hover:underline cursor-pointer"
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
            className="absolute inset-0 bg-[#001737]/75 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveMinistry(null)}
          />

          {/* Modal Container */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-lg w-full max-h-[90vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-150"
            role="dialog"
            aria-modal="true"
          >
            {/* Optional Header Image (e.g. Choir) */}
            {activeMinistry.image && (
              <div className="relative aspect-[16/9] w-full bg-stone-900 overflow-hidden">
                <img
                  src={activeMinistry.image}
                  alt={activeMinistry.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-4 text-[10px] font-semibold uppercase tracking-wider text-amber-300 bg-black/60 px-2.5 py-0.5 rounded">
                  {activeMinistry.category}
                </span>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {!activeMinistry.image && (
                    <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded inline-block mb-1.5">
                      {activeMinistry.category}
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl font-serif text-[#001f44] leading-snug">
                    {activeMinistry.name}
                  </h3>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveMinistry(null)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition cursor-pointer shrink-0"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed">
                {activeMinistry.fullDescription}
              </p>

              {/* Key Activities */}
              <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200/70">
                <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
                  Core Activities &amp; Programs
                </h4>
                <ul className="text-xs text-stone-600 space-y-1.5 pt-1">
                  {activeMinistry.activities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-600 font-semibold">&bull;</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Leadership & Schedule Details */}
              <div className="space-y-2 text-xs text-stone-600 pt-1 border-t border-stone-100">
                <p>
                  <span className="text-stone-400">Regular Schedule: </span>
                  <span className="font-medium text-stone-800">{activeMinistry.schedule}</span>
                </p>
                <p>
                  <span className="text-stone-400">{activeMinistry.leaderTitle}: </span>
                  <span className="font-medium text-stone-800">{activeMinistry.leaderName}</span>
                </p>
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center gap-3">
                <Link
                  href={activeMinistry.contactAction.href}
                  onClick={() => setActiveMinistry(null)}
                  className="flex-1 text-center py-2.5 px-4 bg-[#001f44] hover:bg-[#001633] text-white rounded-xl text-xs font-semibold transition shadow-sm"
                >
                  {activeMinistry.contactAction.label} &rarr;
                </Link>

                <button
                  type="button"
                  onClick={() => setActiveMinistry(null)}
                  className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium transition cursor-pointer"
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