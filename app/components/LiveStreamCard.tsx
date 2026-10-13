"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdventistLogo from "./AdventistLogo";

interface LiveStreamCardProps {
  channelHandle?: string;
  channelId?: string;
}

export default function LiveStreamCard({
  channelHandle = "jerichosdanairobi",
  channelId = "UCrcRFa9oS22hMfwMog9zhVA",
}: LiveStreamCardProps) {
  const [isSabbathServiceTime, setIsSabbathServiceTime] = useState(false);
  // Default to live player during Sabbath service, or allow toggling to recent uploads playlist
  const [viewMode, setViewMode] = useState<"live" | "recent">("live");

  useEffect(() => {
    const checkSabbathTime = () => {
      const now = new Date();
      // Calculate East Africa Time (UTC+3)
      const eatString = now.toLocaleString("en-US", { timeZone: "Africa/Nairobi" });
      const eatDate = new Date(eatString);

      const dayOfWeek = eatDate.getDay(); // 6 = Saturday (Sabbath)
      const hours = eatDate.getHours();
      const minutes = eatDate.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      // Sabbath Divine Worship window: 08:30 AM (510 min) to 01:00 PM (780 min) EAT
      const isDuringService = dayOfWeek === 6 && totalMinutes >= 510 && totalMinutes <= 780;
      setIsSabbathServiceTime(isDuringService);
      if (isDuringService) {
        setViewMode("live");
      }
    };

    checkSabbathTime();
    const interval = setInterval(checkSabbathTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Uploads playlist ID is channel ID with 'U' as the second character
  const uploadsPlaylistId = channelId.startsWith("UC")
    ? `UU${channelId.slice(2)}`
    : channelId;

  const liveEmbedUrl = `https://www.youtube-nocookie.com/embed/live_stream?channel=${channelId}&autoplay=0`;
  const recentPlaylistEmbedUrl = `https://www.youtube-nocookie.com/embed/videoseries?list=${uploadsPlaylistId}`;
  
  const channelUrl = `https://www.youtube.com/@${channelHandle}`;
  const liveUrl = `https://www.youtube.com/@${channelHandle}/live`;

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden text-stone-900">
      {/* Top Status Header */}
      <div className="px-5 py-3.5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50/70">
        <div className="flex items-center gap-2">
          {isSabbathServiceTime ? (
            <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-sans font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              Sabbath Service Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-stone-600 text-[10px] font-sans font-medium uppercase tracking-wider">
              <AdventistLogo className="w-3.5 h-3.5 text-amber-800" />
              Sanctuary Media Ministry
            </span>
          )}
          <span className="text-stone-300">&bull;</span>
          <span className="text-[11px] text-stone-500 font-serif">
            @jerichosdanairobi
          </span>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-1 bg-stone-200/60 p-0.5 rounded-lg text-xs self-start sm:self-auto font-sans">
          <button
            type="button"
            onClick={() => setViewMode("live")}
            className={`px-3 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
              viewMode === "live"
                ? "bg-[#001f44] text-white shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            {isSabbathServiceTime ? "🔴 Live Broadcast" : "Live Stream Feed"}
          </button>
          <button
            type="button"
            onClick={() => setViewMode("recent")}
            className={`px-3 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
              viewMode === "recent"
                ? "bg-[#001f44] text-white shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Recent Sermons
          </button>
        </div>
      </div>

      {/* Embedded YouTube Player Viewport */}
      <div className="relative aspect-video w-full bg-black">
        <iframe
          key={viewMode}
          src={viewMode === "live" ? liveEmbedUrl : recentPlaylistEmbedUrl}
          title="Jericho SDA Church Sanctuary Broadcast"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Footer Info & Quick Links */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-white">
        <div className="space-y-0.5">
          <h4 className="font-serif font-medium text-stone-900">
            Jericho SDA Church YouTube Channel
          </h4>
          <p className="text-stone-500 font-serif text-[11px]">
            {viewMode === "live"
              ? "Displaying the active or upcoming sanctuary broadcast stream."
              : "Browsing latest uploaded sermons and Sabbath services."}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={viewMode === "live" ? liveUrl : channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#001f44] hover:bg-[#001530] text-white text-xs font-medium px-3.5 py-1.5 rounded-lg transition inline-flex items-center gap-1.5"
          >
            <span>Open in YouTube</span>
            <span>&rarr;</span>
          </a>
          <span className="text-stone-300">&bull;</span>
          <a
            href="mailto:jericho.sda@gmail.com?subject=Media%20Ministry%20Inquiry"
            className="text-stone-600 hover:text-stone-900 font-medium text-[11px]"
          >
            Media Desk &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}