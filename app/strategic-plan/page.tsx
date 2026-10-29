"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  FileText,
  ShieldCheck,
} from "lucide-react";

export default function StrategicPlanPage() {
  const strategicPlanPdf = "/docs/JESDA_STRATEGICPLAN_2026.2030.pdf";

  const schedule = [
    { time: "8:00 – 8:30 AM", activity: "Arrival and Registration" },
    { time: "8:30 – 10:00 AM", activity: "Sabbath School" },
    { time: "10:00 – 10:15 AM", activity: "Song Session" },
    {
      time: "10:15 – 11:00 AM",
      activity: "Presentation of the Strategic Plan 2026–2030",
    },
    { time: "11:00 – 11:15 AM", activity: "Song Session" },
    {
      time: "11:15 AM – 12:15 PM",
      activity: "Divine Service",
      details:
        "Welcome Remarks; Key Text, Song and Prayer; Offering; Children's Story; Special Item; Sermon",
    },
    { time: "12:15 – 12:30 PM", activity: "Church Choir Presentation" },
    {
      time: "12:30 – 1:00 PM",
      activity: "Official Launch of the Strategic Plan",
    },
    {
      time: "1:00 – 1:30 PM",
      activity: "Strategic Plan Fundraising Drive and Cake Cutting",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 font-sans py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Navigation Strip */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-900 transition"
          >
            <ArrowLeft className="w-4 h-4 text-amber-500" />
            <span>Back to Church Home</span>
          </Link>

          <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-200/60 px-2.5 py-1 rounded-md">
            Official Document &bull; Read Only
          </span>
        </div>

        {/* 1:1 Clean Programme Sheet Card */}
        <div className="bg-white rounded-2xl border border-slate-300/80 shadow-md p-6 sm:p-10 space-y-6">
          {/* Top Metadata Banner (Date, Venue, Time) */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 border border-slate-200 rounded-xl bg-slate-50/70 text-xs text-center">
            <div className="p-3 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-center gap-1">
                <Calendar className="w-3 h-3 text-amber-500" /> Date
              </span>
              <p className="font-bold text-slate-900">Saturday, 31 October 2026</p>
            </div>

            <div className="p-3 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3 text-amber-500" /> Venue
              </span>
              <p className="font-bold text-slate-900">
                Jericho SDA Church, Shule Road, Nairobi
              </p>
            </div>

            <div className="p-3 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-amber-500" /> Time
              </span>
              <p className="font-bold text-slate-900">8:00 AM – 1:30 PM</p>
            </div>
          </div>

          {/* Title & Theme Header */}
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block">
              Seventh-Day Adventist Church
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-slate-950 uppercase">
              Jericho SDA Church
            </h1>
            <h2 className="text-sm sm:text-base font-bold text-blue-900 tracking-wide">
              STRATEGIC PLAN LAUNCH 2026–2030
            </h2>
            <p className="text-xs sm:text-sm italic font-serif text-slate-600 pt-0.5">
              Theme: “Anchored in Christ to Grow in Mission”
            </p>
          </div>

          {/* Section Divider with Badge */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 bg-slate-900 text-amber-400 rounded-md">
              Official Programme
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Schedule Table */}
          <div className="overflow-hidden border border-slate-200 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/90 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                  <th className="py-2.5 px-4 w-40 sm:w-48 border-r border-slate-200">Time</th>
                  <th className="py-2.5 px-4">Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                {schedule.map((item, idx) => (
                  <tr
                    key={idx}
                    className={
                      idx % 2 === 0
                        ? "bg-white hover:bg-blue-50/40 transition"
                        : "bg-slate-50/50 hover:bg-blue-50/40 transition"
                    }
                  >
                    <td className="py-3 px-4 font-mono font-semibold text-slate-900 border-r border-slate-200 align-top">
                      {item.time}
                    </td>
                    <td className="py-3 px-4 align-top">
                      <span className="font-bold text-slate-900">{item.activity}</span>
                      {item.details && (
                        <p className="text-[11px] text-slate-500 mt-0.5 font-normal leading-relaxed">
                          {item.details}
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fundraising & Welcome Callout Box */}
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 block">
                Strategic Plan Fundraising Drive
              </span>
              <p className="text-[11px] leading-relaxed">
                Members, guests, friends and well-wishers are warmly invited to
                support the implementation of the Jericho SDA Church Strategic
                Plan 2026–2030.
              </p>
            </div>

            <div className="text-center space-y-1 text-xs text-slate-600 px-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-900 block">
                You Are Warmly Invited
              </span>
              <p className="text-[11px] leading-relaxed text-slate-500 max-w-2xl mx-auto">
                Join us for this important milestone as we launch our roadmap for
                spiritual growth, mission advancement, discipleship, and community
                impact. Let us come together in prayer, fellowship, and commitment
                as we embrace the vision of a Christ-centred church that transforms
                lives and serves the community.
              </p>
              <p className="font-bold text-slate-900 text-[11px] pt-1">
                ANCHOR YOURSELF IN CHRIST. GROW IN MISSION. MAKE A LASTING IMPACT.
              </p>
              <p className="text-[10px] text-slate-400 italic">
                Your presence, prayers, participation and support will be highly appreciated.
              </p>
            </div>
          </div>

          {/* Protected Embedded Document Section */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-700" />
                <span className="text-xs font-bold text-slate-900">
                  Strategic Plan (2026–2030) &bull; Online Viewer
                </span>
              </div>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                Protected Preview
              </span>
            </div>

            <div
              onContextMenu={(e) => e.preventDefault()}
              className="select-none w-full h-[700px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100"
            >
              <iframe
                src={`${strategicPlanPdf}#toolbar=0&navpanes=0`}
                width="100%"
                height="100%"
                title="Jericho SDA Strategic Plan 2026-2030"
                className="border-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}