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
    <main className="min-h-screen bg-[#fcfbf9] text-stone-900 pb-32">
      {/* 1. HERO - Dignified, deep navy, sacred hymnody */}
      <section className="bg-[#001f44] text-white pt-36 sm:pt-42 pb-20 px-6 border-b border-stone-800">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-stone-300 text-xs tracking-wider uppercase">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span>Sacred Hymnody &bull; Jericho SDA Church</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-stone-50 tracking-tight">
            Church Hymnal
          </h1>

          <blockquote className="text-stone-300 text-sm md:text-base font-serif italic max-w-xl mx-auto pt-1 leading-relaxed">
            &ldquo;Speaking to one another with psalms, hymns, and songs from the Spirit. Sing and make music from your heart to the Lord.&rdquo;
            <cite className="block not-italic text-xs font-sans font-medium text-amber-300/90 mt-1.5">
              &mdash; Ephesians 5:19
            </cite>
          </blockquote>
        </div>
      </section>

      {/* 2. COLLECTION SWITCHER & INSTANT SEARCH */}
      <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-stone-100">
            {/* Tab Buttons */}
            <div className="flex bg-stone-100 p-1 rounded-lg w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleCollectionSwitch("sdah")}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-md text-xs font-medium transition cursor-pointer ${
                  collection === "sdah"
                    ? "bg-[#001f44] text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                SDA Church Hymnal (English)
              </button>
              <button
                type="button"
                onClick={() => handleCollectionSwitch("nzk")}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-md text-xs font-medium transition cursor-pointer ${
                  collection === "nzk"
                    ? "bg-[#001f44] text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Nyimbo za Kristo (Kiswahili)
              </button>
            </div>

            {/* Reading Font Size Toggle */}
            <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-lg self-end sm:self-center">
              <span className="text-[10px] uppercase font-semibold text-stone-400 mr-1 font-sans">
                Type:
              </span>
              <button
                type="button"
                onClick={() => setFontSize("sm")}
                className={`px-2 py-0.5 rounded text-xs font-medium transition ${
                  fontSize === "sm" ? "bg-[#001f44] text-white" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize("base")}
                className={`px-2 py-0.5 rounded text-xs font-medium transition ${
                  fontSize === "base" ? "bg-[#001f44] text-white" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize("lg")}
                className={`px-2 py-0.5 rounded text-xs font-medium transition ${
                  fontSize === "lg" ? "bg-[#001f44] text-white" : "text-stone-600 hover:text-stone-900"
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
              placeholder={`Search ${collection === "sdah" ? "SDAH" : "NZK"} by number (e.g. 590, 128) or hymn title...`}
              className="w-full text-xs sm:text-sm pl-10 pr-16 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#001f44] bg-stone-50/60"
            />
            <svg
              className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-800 font-medium"
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
          <div className="bg-white rounded-xl p-16 border border-stone-200 text-center space-y-3">
            <div className="w-7 h-7 border-3 border-[#001f44] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-stone-500 font-serif">
              Loading {collection.toUpperCase()} hymnal collection...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Hymn Directory List (5 cols) */}
            <div className="lg:col-span-5 space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
                  Hymn Register
                </span>
                <span className="text-xs text-stone-400 font-serif">
                  {filteredHymns.length} Hymns
                </span>
              </div>

              <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden max-h-[620px] overflow-y-auto divide-y divide-stone-100">
                {filteredHymns.length === 0 ? (
                  <div className="p-8 text-center text-stone-400 text-xs font-serif">
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
                        className={`w-full text-left p-3.5 transition flex items-center justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? "bg-[#001f44] text-white"
                            : "hover:bg-stone-50 text-stone-800"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`font-mono text-xs font-semibold w-10 shrink-0 text-center py-1 rounded ${
                              isSelected
                                ? "bg-amber-400 text-[#001f44]"
                                : "bg-stone-100 text-[#001f44]"
                            }`}
                          >
                            #{hymn.number}
                          </span>
                          <div className="truncate">
                            <p className="font-serif font-medium text-xs sm:text-sm truncate">
                              {hymn.title}
                            </p>
                            <span
                              className={`text-[10px] block truncate font-sans ${
                                isSelected ? "text-stone-300" : "text-stone-400"
                              }`}
                            >
                              {hymn.category}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`text-xs ${
                            isSelected ? "text-amber-300" : "text-stone-300"
                          }`}
                        >
                          &rarr;
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right: Lyrics Reader Canvas (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-9 border border-stone-200 shadow-sm space-y-6">
              {selectedHymn ? (
                <>
                  <div className="border-b border-stone-100 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-amber-800 block">
                        {collection === "sdah" ? "SDA Church Hymnal" : "Nyimbo za Kristo"} &bull; #{selectedHymn.number}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif text-[#001f44] mt-0.5">
                        {selectedHymn.title}
                      </h2>
                    </div>
                    <span className="self-start sm:self-center text-[10px] font-sans font-medium uppercase tracking-wider bg-stone-100 text-stone-600 px-2.5 py-1 rounded">
                      {selectedHymn.category}
                    </span>
                  </div>

                  {/* Verses */}
                  <div
                    className={`space-y-6 text-stone-800 font-serif leading-relaxed ${
                      fontSize === "sm"
                        ? "text-xs"
                        : fontSize === "lg"
                        ? "text-base sm:text-lg"
                        : "text-sm sm:text-base"
                    }`}
                  >
                    {selectedHymn.verses.map((verse, index) => (
                      <div key={index} className="space-y-1">
                        <span className="text-xs font-sans font-semibold text-amber-800 block">
                          Stanza {index + 1}
                        </span>
                        <p className="leading-relaxed whitespace-pre-line pl-3 border-l-2 border-stone-200">
                          {verse}
                        </p>
                      </div>
                    ))}

                    {/* Refrain */}
                    {selectedHymn.refrain && (
                      <div className="bg-amber-50/70 border border-amber-200/70 rounded-lg p-4 mt-6">
                        <span className="text-xs font-sans font-semibold uppercase tracking-wider text-amber-800 block mb-1">
                          Refrain / Kiitikio
                        </span>
                        <p className="font-serif italic text-stone-800 leading-relaxed whitespace-pre-line">
                          &ldquo;{selectedHymn.refrain}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400 font-serif">
                    <span>Sabbath Worship Companion</span>
                    <button
                      type="button"
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="text-[#001f44] font-medium hover:underline cursor-pointer"
                    >
                      Back to top &uarr;
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-16 text-stone-400 text-sm font-serif">
                  Select a hymn from the register to read its lyrics.
                </div>
              )}
            </div>

          </div>
        )}
      </section>
    </main>
  );
}