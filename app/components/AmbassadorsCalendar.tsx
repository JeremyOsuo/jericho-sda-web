"use client";

import { useState, useMemo } from "react";
import {
  ambassadorYearPlan,
  ambassadorLeadership,
} from "@/data/ambassadorsEvents";

export default function AmbassadorsCalendar() {
  const [selectedQuarter, setSelectedQuarter] = useState<string>("All");

  const filteredEvents = useMemo(() => {
    if (selectedQuarter === "All") return ambassadorYearPlan;
    return ambassadorYearPlan.filter((ev) => ev.quarter === selectedQuarter);
  }, [selectedQuarter]);

  const totalBudget = useMemo(() => {
    return ambassadorYearPlan.reduce((acc, curr) => acc + curr.estimatedCost, 0);
  }, []);

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
      {/* Header Banner with Leadership Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#b08400] font-bold block">
            {ambassadorLeadership.year} Calendar of Activities
          </span>
          <h3 className="text-2xl font-black font-serif text-[#002f6c] mt-0.5">
            Ambassadors Year Plan & Roadmap
          </h3>
          <p className="text-xs text-slate-500 font-serif mt-1">
            Director: <strong className="text-slate-800">{ambassadorLeadership.director}</strong>[cite: 1] • 
            Assistant Director: <strong className="text-slate-800">{ambassadorLeadership.assistantDirector}</strong>[cite: 1]
          </p>
        </div>

        {/* Quick Budget Pill */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 px-5 self-start md:self-center text-right">
          <span className="text-[10px] uppercase font-bold text-[#b08400] block tracking-wider">
            Total Year Plan Budget[cite: 1]
          </span>
          <span className="text-base font-mono font-black text-[#002f6c]">
            KES {totalBudget.toLocaleString()}[cite: 1]
          </span>
        </div>
      </div>

      {/* Quarter Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {["All", "Q1", "Q2", "Q3", "Q4"].map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => setSelectedQuarter(q)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition shrink-0 ${
              selectedQuarter === q
                ? "bg-[#002f6c] text-white shadow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {q === "All" ? "All Quarters" : `${q} (Quarter ${q.replace("Q", "")})`}
          </button>
        ))}
      </div>

      {/* Responsive Event Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-mono text-slate-500">
              <th className="py-3 px-4 rounded-l-xl">Date / Month</th>
              <th className="py-3 px-4">Activity & Objective</th>
              <th className="py-3 px-4">Lead</th>
              <th className="py-3 px-4">Est. Cost</th>
              <th className="py-3 px-4 rounded-r-xl">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredEvents.map((ev) => {
              const isDone = ev.status === "Done";
              return (
                <tr
                  key={ev.id}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    isDone ? "opacity-75" : ""
                  }`}
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800 whitespace-nowrap align-top">
                    <div>{ev.date}[cite: 1]</div>
                    <span className="text-[10px] text-slate-400 font-sans block">{ev.month}[cite: 1]</span>
                  </td>

                  <td className="py-3.5 px-4 align-top max-w-xs sm:max-w-md">
                    <p className="font-bold text-slate-900 text-sm">{ev.activity}[cite: 1]</p>
                    <p className="text-slate-500 font-serif text-[11px] mt-0.5 leading-snug">
                      {ev.objective}[cite: 1]
                    </p>
                    <span className="text-[10px] text-amber-700 font-mono mt-1 block">
                      Target: {ev.deliverables}[cite: 1]
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap align-top">
                    {ev.leaderResponsible}[cite: 1]
                  </td>

                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-700 whitespace-nowrap align-top">
                    KES {ev.estimatedCost.toLocaleString()}[cite: 1]
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap align-top">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isDone
                          ? "bg-slate-100 text-slate-600"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {isDone ? "✓ Completed" : "Upcoming"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}