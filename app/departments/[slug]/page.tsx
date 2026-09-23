import Link from "next/link";
import { notFound } from "next/navigation";
import AdventistLogo from "../../components/AdventistLogo";
import { departments, type Department } from "@/data/departments";
import { churchCalendar2026, type ChurchEvent } from "@/data/events";

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

  // Find events on the 2026 calendar related to this department or leader
  const deptEvents = churchCalendar2026.filter((evt: ChurchEvent) => {
    const q1 = department.name.toLowerCase();
    const q2 = department.shortName.toLowerCase();
    const leaderKey = department.leader.split(" ")[0].toLowerCase();
    
    return (
      evt.department.toLowerCase().includes(q2) ||
      evt.title.toLowerCase().includes(q2) ||
      (evt.inCharge && evt.inCharge.toLowerCase().includes(leaderKey))
    );
  });

  return (
    <main className="min-h-screen bg-slate-100/90 pb-36 relative z-10 selection:bg-amber-300 selection:text-[#001737]">
      
      {/* 1. HERO BANNER */}
      <section className="relative bg-gradient-to-br from-[#001129] via-[#001f49] to-[#002f6c] text-white pt-36 sm:pt-40 pb-24 sm:pb-28 px-4 sm:px-6 overflow-hidden border-b border-amber-400/20 shadow-xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-4 relative z-10 text-center sm:text-left">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <Link
              href="/ministries"
              className="text-xs font-mono text-amber-300 hover:underline flex items-center gap-1 font-bold"
            >
              ← All Ministries
            </Link>
            <span className="text-white/40">•</span>
            <span className="text-xs font-mono text-blue-200">{department.category}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pt-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-3xl sm:text-4xl shadow-xl shrink-0">
              {department.emoji}
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif text-white tracking-tight">
                {department.name}
              </h1>
              <p className="text-blue-100 text-xs sm:text-sm font-serif max-w-2xl leading-relaxed">
                {department.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BODY CONTENT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-14 relative z-20 space-y-8">
        
        {/* Department Overview Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1">
              Ministry Mission
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#002f6c]">
              Purpose &amp; Objective
            </h2>
          </div>

          <p className="text-slate-700 font-serif text-sm leading-relaxed">
            {department.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block mb-1">
                Leader / In-Charge
              </span>
              <strong className="text-slate-900 font-serif text-sm block">
                {department.leader}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block mb-1">
                Fellowship &amp; Meeting Schedule
              </span>
              <strong className="text-slate-900 font-serif text-sm block">
                {department.meetingTime}
              </strong>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-mono">
              Key Ministry Pillars &amp; Responsibilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {department.keyResponsibilities.map((resp, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-serif text-slate-700"
                >
                  <span className="text-amber-500 font-bold">✓</span>
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. UPCOMING 2026 CALENDAR EVENTS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1">
                2026 Master Calendar Sync
              </span>
              <h3 className="text-xl font-bold font-serif text-[#002f6c]">
                Scheduled Ministry Days &amp; Convocations
              </h3>
            </div>
            <Link
              href="/events"
              className="text-xs font-bold text-[#002f6c] hover:underline"
            >
              Full Calendar →
            </Link>
          </div>

          {deptEvents.length > 0 ? (
            <div className="space-y-3">
              {deptEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#002f6c] text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {evt.quarter}
                      </span>
                      <strong className="text-xs font-mono font-bold text-[#b08400]">
                        {evt.dates}
                      </strong>
                    </div>
                    <h4 className="text-sm font-bold font-serif text-slate-900">
                      {evt.title}
                    </h4>
                    {evt.description && (
                      <p className="text-xs text-slate-600 font-serif">
                        {evt.description}
                      </p>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-serif text-slate-500 block">
                      Leader: <strong className="text-slate-800">{evt.inCharge}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 font-serif">
              Regular weekly Sabbath programming. Check the{" "}
              <Link href="/events" className="text-[#002f6c] font-bold underline">
                2026 Calendar
              </Link>{" "}
              for church-wide dates.
            </div>
          )}
        </div>

        {/* Back navigation footer */}
        <div className="text-center pt-2">
          <Link
            href="/ministries"
            className="inline-flex items-center gap-2 bg-[#002f6c] hover:bg-[#001f49] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow transition"
          >
            ← Return to All Ministries
          </Link>
        </div>

      </div>
    </main>
  );
}