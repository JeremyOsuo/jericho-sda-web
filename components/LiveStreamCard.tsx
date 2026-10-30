"use client";

import { useState, useEffect } from "react";
import AdventistLogo from "./AdventistLogo";
import ErrorModal from "./ErrorModal";
import LoadingModal from "./LoadingModal";

interface LiveStreamCardProps {
  channelHandle?: string;
  channelId?: string;
  featuredVideoId?: string;
}

export default function LiveStreamCard({
  channelHandle = "jerichosdanairobi",
  channelId = "UCrcRFa9oS22hMfwMog9zhVA",
  featuredVideoId = "",
}: LiveStreamCardProps) {
  const [mounted, setMounted] = useState(false);
  const [isSabbathServiceTime, setIsSabbathServiceTime] = useState(false);

  // Modal Feedback States
  const [isConnecting, setIsConnecting] = useState(false);
  const [isOffAirModalOpen, setIsOffAirModalOpen] = useState(false);

  const channelUrl = `https://www.youtube.com/@${channelHandle}`;
  const liveUrl = `https://www.youtube.com/@${channelHandle}/live`;

  useEffect(() => {
    setMounted(true);
    const checkSabbathTime = () => {
      const now = new Date();
      // Calculate East Africa Time (UTC+3)
      const eatString = now.toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      });
      const eatDate = new Date(eatString);

      const dayOfWeek = eatDate.getDay(); // 6 = Saturday (Sabbath)
      const hours = eatDate.getHours();
      const minutes = eatDate.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      // Sabbath Divine Worship window: 08:30 AM (510 min) to 01:00 PM (780 min) EAT
      const isDuringService =
        dayOfWeek === 6 && totalMinutes >= 510 && totalMinutes <= 780;
      setIsSabbathServiceTime(isDuringService);
    };

    checkSabbathTime();
    const interval = setInterval(checkSabbathTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinStream = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsConnecting(true);

    setTimeout(() => {
      setIsConnecting(false);
      if (isSabbathServiceTime) {
        window.open(liveUrl, "_blank", "noopener,noreferrer");
      } else {
        setIsOffAirModalOpen(true);
      }
    }, 700);
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden text-stone-900">
      {/* Top Status Header */}
      <div className="px-5 py-3.5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50/70">
        <div className="flex items-center gap-2">
          {mounted && isSabbathServiceTime ? (
            <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-sans font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              Sabbath Divine Service Hours
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-stone-600 text-[10px] font-sans font-medium uppercase tracking-wider">
              <AdventistLogo className="w-3.5 h-3.5 text-amber-800" />
              Sanctuary Media Ministry
            </span>
          )}
          <span className="text-stone-300">&bull;</span>
          <span className="text-[11px] text-stone-500 font-serif">
            @{channelHandle}
          </span>
        </div>

        <span className="text-[11px] text-stone-500 font-serif">
          Sabbaths &bull; 08:30 AM &ndash; 01:00 PM EAT
        </span>
      </div>

      {/* Viewport */}
      {featuredVideoId ? (
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${featuredVideoId}?rel=0`}
            title="Jericho SDA Church Divine Service"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="relative aspect-video sm:aspect-[21/9] bg-[#001f44] text-white flex items-center justify-center p-6 text-center">
          <div className="space-y-3 max-w-lg">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-amber-400">
              <svg
                className="w-6 h-6 ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-lg sm:text-xl text-stone-50">
                {mounted && isSabbathServiceTime
                  ? "Sabbath Divine Worship Broadcast"
                  : "Jericho SDA Sanctuary Broadcasts"}
              </h3>
              <p className="text-xs text-stone-300 font-serif leading-relaxed">
                {mounted && isSabbathServiceTime
                  ? "Divine service is currently in session. Join the congregation online via our official YouTube live feed."
                  : "Join our Sabbath services live every Saturday morning, or watch sermon replays and choir presentations on YouTube."}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={handleJoinStream}
                className="bg-amber-400 hover:bg-amber-300 text-[#001f44] font-semibold text-xs px-4 py-2 rounded-lg transition shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>
                  {mounted && isSabbathServiceTime
                    ? "Join Live Stream Now"
                    : "Go to YouTube Live Feed"}
                </span>
                <span>&rarr;</span>
              </button>

              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/15 text-stone-100 border border-white/20 text-xs font-medium px-4 py-2 rounded-lg transition"
              >
                Browse Video Archives &rarr;
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info Strip */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-white">
        <div className="space-y-0.5">
          <h4 className="font-serif font-medium text-stone-900">
            Jericho SDA Media &amp; Communication Ministry
          </h4>
          <p className="text-stone-500 font-serif text-[11px]">
            Divine Service, Sabbath School Panel, &amp; Music Ministry.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-700 hover:text-stone-900 font-medium text-[11px]"
          >
            Visit Channel &rarr;
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

      {/* Loading Overlay */}
      <LoadingModal
        isOpen={isConnecting}
        title="Checking Live Broadcast…"
        subtitle="Connecting to the church sanctuary media stream."
      />

      {/* Broadcast Notice Modal */}
      <ErrorModal
        isOpen={isOffAirModalOpen}
        onClose={() => setIsOffAirModalOpen(false)}
        title="Broadcast Notice"
        message="There is no active divine service broadcast at this moment. Our Sabbath worship streams live every Saturday from 08:30 AM to 01:00 PM EAT. You can explore recorded sermons and choir presentations in our video archives."
        supportPhone="254700000000"
        onRetry={() => window.open(channelUrl, "_blank", "noopener,noreferrer")}
      />
    </div>
  );
}