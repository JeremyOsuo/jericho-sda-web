"use client";

import { useState, useEffect, useMemo } from "react";
import AdventistLogo from "../components/AdventistLogo";

export interface Hymn {
  number: number;
  title: string;
  category: string;
  refrain?: string;
  verses: string[];
}

export default function HymnalPage() {
  const [collection, setCollection] = useState<"sdah" | "nzk">("sdah");
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");

  // Fetch the selected JSON collection from public/data/
  useEffect(() => {
    async function loadHymnal() {
      setLoading(true);
      try {
        const res = await fetch(`/data/${collection}.json`);
        if (!res.ok) throw new Error("Failed to load hymns");
        const rawData: any[] = await res.json();

        // Normalize data fields across various public formats
        const normalized: Hymn[] = rawData.map((item: any) => ({
          number: Number(item.number || item.id || 0),
          title: item.title || `Hymn ${item.number}`,
          category: item.category || item.theme || "General",
          refrain: item.refrain || item.chorus || undefined,
          verses: Array.isArray(item.verses)
            ? item.verses.map((v: any) => (typeof v === "string" ? v : v.text || v.lyrics || ""))
            : typeof item.lyrics === "string"
            ? item.lyrics.split("\n\n")
            : ["Lyrics unavailable"],
        }));

        // Sort sequentially by hymn number
        normalized.sort((a, b) => a.number - b.number);

        setHymns(normalized);
        if (normalized.length > 0) {
          setSelectedHymn(normalized[0]);
        }
      } catch (err) {
        console.error("Hymnal load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadHymnal();
  }, [collection]);

  // Real-time filter across numbers, title, category, and lyrics
  const filteredHymns = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return hymns;

    return hymns.filter((h) => {
      const matchNum = h.number.toString().includes(q);
      const matchTitle = h.title.toLowerCase().includes(q);
      const matchCategory = h.category.toLowerCase().includes(q);
      const matchLyrics = h.verses.some((v) => v.toLowerCase().includes(q));
      return matchNum || matchTitle || matchCategory || matchLyrics;
    });
  }, [searchQuery, hymns]);

  const handleCollectionSwitch = (col: "sdah" | "nzk") => {
    if (col === collection) return;
    setCollection(col);
    setSearchQuery("");
  };

  return (
    <main className="bg-slate-50 min-h-screen pb-24">
      {/* 1. HERO HEADER */}
      <section className="relative bg-gradient-to-br from-[#001737] via-[#002f6c] to-[#001433] text-white pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 border border-amber-300/30 text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md">
            <AdventistLogo className="w-3.5 h-3.5 text-amber-300" />
            <span>Jericho SDA Sanctuary Hymnody</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight leading-tight drop-shadow-md">
            Digital Church Hymnal
          </h1>

          <p className="text-blue-100 text-xs sm:text-sm font-serif max-w-xl mx-auto leading-relaxed">
            &ldquo;Speaking to one another with psalms, hymns, and songs from the Spirit. Sing and make music from your heart to the Lord.&rdquo;
            <span className="block text-xs font-sans font-bold text-amber-300 mt-1">
              — Ephesians 5:19
            </span>
          </p>
        </div>
      </section>

      {/* 2. COLLECTION SWITCHER & INSTANT SEARCH */}
      <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
            
            {/* Tab Buttons */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleCollectionSwitch("sdah")}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  collection === "sdah"
                    ? "bg-[#002f6c] text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                SDA Church Hymnal (English)
              </button>
              <button
                type="button"
                onClick={() => handleCollectionSwitch("nzk")}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  collection === "nzk"
                    ? "bg-[#002f6c] text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Nyimbo za Kristo (Kiswahili)
              </button>
            </div>

            {/* Reading Font Size Toggle */}
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl self-end sm:self-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">
                Text:
              </span>
              <button
                type="button"
                onClick={() => setFontSize("sm")}
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  fontSize === "sm" ? "bg-[#002f6c] text-white" : "text-slate-600"
                }`}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize("base")}
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  fontSize === "base" ? "bg-[#002f6c] text-white" : "text-slate-600"
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize("lg")}
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  fontSize === "lg" ? "bg-[#002f6c] text-white" : "text-slate-600"
                }`}
              >
                A+
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${collection === "sdah" ? "SDAH" : "NZK"} by number (e.g. 590, 128) or song title...`}
              className="w-full text-xs sm:text-sm pl-11 pr-20 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002f6c] bg-slate-50/50"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🔍
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2.5 py-1 rounded-md font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. TWO-COLUMN INTERFACE */}
      <section className="max-w-5xl mx-auto px-6 pt-10">
        {loading ? (
          <div className="bg-white rounded-3xl p-16 border border-slate-200 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-[#002f6c] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Loading {collection.toUpperCase()} database...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Hymn Directory List (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#b08400]">
                  Hymn Register
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {filteredHymns.length} Hymns Found
                </span>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden max-h-[640px] overflow-y-auto divide-y divide-slate-100">
                {filteredHymns.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs font-serif">
                    No hymns match &ldquo;{searchQuery}&rdquo;.
                  </div>
                ) : (
                  filteredHymns.map((hymn) => {
                    const isSelected = selectedHymn?.number === hymn.number;

                    return (
                      <button
                        key={hymn.number}
                        type="button"
                        onClick={() => setSelectedHymn(hymn)}
                        className={`w-full text-left p-4 transition-all duration-150 flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-[#002f6c] text-white"
                            : "hover:bg-slate-50 text-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`font-mono text-sm font-black w-10 shrink-0 text-center py-1 rounded-lg ${
                              isSelected
                                ? "bg-amber-400 text-[#00224f]"
                                : "bg-slate-100 text-[#002f6c]"
                            }`}
                          >
                            #{hymn.number}
                          </span>
                          <div className="truncate">
                            <p className="font-bold text-xs sm:text-sm truncate">
                              {hymn.title}
                            </p>
                            <span
                              className={`text-[10px] font-medium block truncate ${
                                isSelected ? "text-blue-200" : "text-slate-400"
                              }`}
                            >
                              {hymn.category}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`text-xs ${
                            isSelected ? "text-amber-300" : "text-slate-300"
                          }`}
                        >
                          →
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right: Clean Lyrics Reader Canvas (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
              {selectedHymn ? (
                <>
                  <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono uppercase font-bold text-[#b08400] tracking-wider block">
                        {collection === "sdah" ? "SDA Hymnal" : "Nyimbo za Kristo"} • #{selectedHymn.number}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#002f6c]">
                        {selectedHymn.title}
                      </h2>
                    </div>
                    <span className="self-start sm:self-center text-[11px] font-semibold bg-blue-50 text-[#002f6c] border border-blue-100 px-3 py-1 rounded-full">
                      {selectedHymn.category}
                    </span>
                  </div>

                  {/* Verses */}
                  <div
                    className={`space-y-6 text-slate-700 font-serif leading-relaxed ${
                      fontSize === "sm"
                        ? "text-xs"
                        : fontSize === "lg"
                        ? "text-base sm:text-lg"
                        : "text-sm sm:text-base"
                    }`}
                  >
                    {selectedHymn.verses.map((verse, index) => (
                      <div key={index} className="space-y-1">
                        <span className="text-[11px] font-sans font-bold text-[#b08400] block">
                          Stanza {index + 1}
                        </span>
                        <p className="leading-relaxed whitespace-pre-line pl-3 border-l-2 border-slate-200">
                          {verse}
                        </p>
                      </div>
                    ))}

                    {/* Refrain */}
                    {selectedHymn.refrain && (
                      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 mt-6">
                        <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#b08400] block mb-1">
                          Refrain / Kiitikio
                        </span>
                        <p className="font-semibold text-slate-800 italic leading-relaxed whitespace-pre-line">
                          &ldquo;{selectedHymn.refrain}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>Sabbath Worship Companion</span>
                    <button
                      type="button"
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="text-[#002f6c] font-bold hover:underline"
                    >
                      Back to top ↑
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-16 text-slate-400 text-sm font-serif">
                  Select a hymn from the list to view its lyrics.
                </div>
              )}
            </div>

          </div>
        )}
      </section>
    </main>
  );
}