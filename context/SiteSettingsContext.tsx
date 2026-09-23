"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SiteSettingsContextType {
  urgentBannerActive: boolean;
  urgentBannerText: string;
  bulletinUrl: string;
  liveStreamUrl: string;
  setUrgentBanner: (active: boolean, text: string) => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  urgentBannerActive: false,
  urgentBannerText: "",
  bulletinUrl: "#",
  liveStreamUrl: "https://www.youtube.com/@JerichoSDANairobi",
  setUrgentBanner: () => {},
});

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [urgentBannerActive, setUrgentBannerActive] = useState(false);
  const [urgentBannerText, setUrgentBannerText] = useState("");
  const [bulletinUrl, setBulletinUrl] = useState("/camp-meeting-2026.pdf");
  const [liveStreamUrl, setLiveStreamUrl] = useState(
    "https://www.youtube.com/@JerichoSDANairobi"
  );

  useEffect(() => {
    try {
      const savedBanner = localStorage.getItem("jesdac_urgent_banner");
      if (savedBanner) {
        const parsed = JSON.parse(savedBanner);
        setUrgentBannerActive(parsed.active || false);
        setUrgentBannerText(parsed.text || "");
      }
    } catch {
      // safe fallback
    }
  }, []);

  const setUrgentBanner = (active: boolean, text: string) => {
    setUrgentBannerActive(active);
    setUrgentBannerText(text);
    try {
      localStorage.setItem(
        "jesdac_urgent_banner",
        JSON.stringify({ active, text })
      );
    } catch {
      // safe fallback
    }
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        urgentBannerActive,
        urgentBannerText,
        bulletinUrl,
        liveStreamUrl,
        setUrgentBanner,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
}

export const useSiteSettings = () => useContext(SiteSettingsContext);