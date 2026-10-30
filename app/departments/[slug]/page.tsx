import Link from "next/link";
import { notFound } from "next/navigation";
import AdventistLogo from "../../../components/AdventistLogo";
import { departments } from "@/data/departments";
import { churchCalendar2026, type ChurchEvent } from "@/data/events";
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

// Generate static params for all 17 departments
export function generateStaticParams() {
  return departments.map((d) => ({
    slug: d.slug,
  }));
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = departments.find((d) => d.slug === slug);

  if (!department) {
    notFound();
  }

  // Safely find events on the 2026 calendar related to this department or leader
  const deptEvents = (churchCalendar2026 || []).filter((evt: ChurchEvent) => {
    const deptFullName = (department.name || "").toLowerCase();
    const deptShortName = (department.shortName || department.name || "").toLowerCase();
    const leaderKey = (department.leader || "").trim().split(" ")[0].toLowerCase();

    const matchesDept =
      (evt.department && evt.department.toLowerCase().includes(deptShortName)) ||
      (evt.department && evt.department.toLowerCase().includes(deptFullName));
    const matchesTitle =
      evt.title && evt.title.toLowerCase().includes(deptShortName);
    const matchesLeader =
      leaderKey !== "" &&
      evt.inCharge &&
      evt.inCharge.toLowerCase().includes(leaderKey);

    return matchesDept || matchesTitle || matchesLeader;
  });

  const churchPhone = "254700000000";
  const whatsappInquiryUrl = `https://wa.me/${churchPhone}?text=${encodeURIComponent(
    `Hello Jericho SDA Secretariat, I would like to get involved with or inquire about the ${department.name} department.`
  )}`;

  return (
    <main className="min-h-screen bg-[#fcfbf9] text-stone-900 pb-32">
      {/* 1. HERO - Dignified, deep navy, clear department title */}
      <section className="bg-[#001f44] text-white pt-36 sm:pt-42 pb-20 px-6 border-b border-stone-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-300">
            <Link
              href="/ministries"
              className="text-amber-300 hover:underline font-medium"
            >
              &larr; All Ministries
            </Link>
            <span className="text-white/30">&bull;</span>
            <span className="text-stone-300 font-serif">
              {department.category}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-5 pt-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-400 flex items-center justify-center font-serif text-2xl font-bold text-[#001f44] shadow-sm shrink-0">
              {department.name.charAt(0)}
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                <AdventistLogo className="w-3.5 h-3.5 text-amber-400" />
                <span>Jericho SDA Department</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-stone-50 tracking-tight leading-tight">
                {department.name}
              </h1>
              <p className="text-stone-300 text-sm sm:text-base font-serif max-w-2xl leading-relaxed">
                {department.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BODY CONTENT */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20 space-y-8">
        {/* Department Overview Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-serif text-[#001f44]">
              Purpose &amp; Objective
            </h2>
            <span className="text-xs font-mono text-stone-400">
              Department Profile
            </span>
          </div>

          <p className="text-stone-700 font-serif text-sm leading-relaxed">
            {department.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-[10px] uppercase font-semibold text-amber-800 flex items-center gap-1.5 font-sans">
                <User className="w-3.5 h-3.5 text-amber-700" />
                <span>Leader / In-Charge</span>
              </span>
              <strong className="text-stone-900 font-serif text-sm block">
                {department.leader}
              </strong>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-[10px] uppercase font-semibold text-amber-800 flex items-center gap-1.5 font-sans">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Fellowship &amp; Meeting Schedule</span>
              </span>
              <strong className="text-stone-900 font-serif text-sm block">
                {department.meetingTime}
              </strong>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans">
              Key Ministry Pillars &amp; Responsibilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {department.keyResponsibilities.map((resp, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-stone-50 border border-stone-100 text-xs font-serif text-stone-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action to Join or Inquire */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <p className="font-semibold text-slate-900 font-serif">
                Interested in serving in this ministry?
              </p>
              <p className="text-slate-600 font-serif text-[11px]">
                Connect with the leadership team to get involved in upcoming departmental programs.
              </p>
            </div>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-4 py-2 rounded-xl transition inline-flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 3. UPCOMING 2026 CALENDAR EVENTS */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="text-lg font-serif text-[#001f44]">
                Scheduled Ministry Days &amp; Convocations
              </h3>
              <p className="text-xs text-stone-500 font-serif mt-0.5">
                Key dates synced from the 2026 Master Church Calendar.
              </p>
            </div>
            <Link
              href="/events"
              className="text-xs font-semibold text-[#001f44] hover:underline flex items-center gap-1"
            >
              <span>Full Calendar</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {deptEvents.length > 0 ? (
            <div className="space-y-3">
              {deptEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#001f44] text-white font-mono text-[9px] font-semibold px-2 py-0.5 rounded uppercase">
                        {evt.quarter}
                      </span>
                      <strong className="text-xs font-mono font-medium text-amber-800">
                        {evt.dates}
                      </strong>
                    </div>
                    <h4 className="text-sm font-serif font-semibold text-stone-900">
                      {evt.title}
                    </h4>
                    {evt.description && (
                      <p className="text-xs text-stone-600 font-serif">
                        {evt.description}
                      </p>
                    )}
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs text-stone-500 font-serif block">
                      Leader: <strong className="text-stone-800">{evt.inCharge || "Department Head"}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-500 font-serif">
              Regular weekly Sabbath programming. Check the{" "}
              <Link href="/events" className="text-[#001f44] font-semibold underline">
                2026 Master Calendar
              </Link>{" "}
              for church-wide convocations and retreat dates.
            </div>
          )}
        </div>

        {/* Back navigation footer */}
        <div className="text-center pt-2">
          <Link
            href="/ministries"
            className="inline-flex items-center gap-2 bg-[#001f44] hover:bg-slate-900 text-white font-medium text-xs px-5 py-2.5 rounded-xl transition shadow-sm"
          >
            &larr; Return to All Ministries
          </Link>
        </div>
      </div>
    </main>
  );
}