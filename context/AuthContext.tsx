"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "guest" | "member" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  portalTitle: string;
  portalUrl: string;
  estate?: string;
  department?: string;
  avatarInitials: string;
}

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isLoading: boolean;
  isMounted: boolean;
  loginAs: (role: UserRole) => void;
  updateAffiliatedEstate: (estateName: string) => void;
  logout: () => void;
}

const demoProfiles: Record<Exclude<UserRole, "guest">, UserProfile> = {
  admin: {
    id: "adm-01",
    name: "Church Web Administrator",
    email: "admin@jerichosda.church",
    role: "admin",
    portalTitle: "Admin Console",
    portalUrl: "/admin",
    avatarInitials: "AD",
  },
  member: {
    id: "mem-01",
    name: "Bro. Brian Otieno",
    email: "member@jerichosda.church",
    role: "member",
    portalTitle: "Member Portal",
    portalUrl: "/portal",
    estate: "Uhuru Estate Prayer Fellowship",
    department: "Adventist Youth",
    avatarInitials: "BO",
  },
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: "guest",
  isLoading: true,
  isMounted: false,
  loginAs: () => {},
  updateAffiliatedEstate: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("jesdac_session_role") as UserRole | null;
      const savedEstate = localStorage.getItem("jesdac_member_estate");

      if (saved && saved !== "guest" && demoProfiles[saved]) {
        const profile = { ...demoProfiles[saved] };
        if (savedEstate && saved === "member") {
          profile.estate = savedEstate;
        }
        setUser(profile);
      } else {
        // Default to demo member so user features work right out of the box
        const defaultMember = { ...demoProfiles.member };
        if (savedEstate) {
          defaultMember.estate = savedEstate;
        }
        setUser(defaultMember);
      }
    } catch {
      setUser(demoProfiles.member);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginAs = (targetRole: UserRole) => {
    if (targetRole === "guest") {
      setUser(null);
      try {
        localStorage.removeItem("jesdac_session_role");
      } catch {
        /* safe ignore */
      }
      return;
    }

    const profile = { ...demoProfiles[targetRole] };
    try {
      const savedEstate = localStorage.getItem("jesdac_member_estate");
      if (savedEstate && targetRole === "member") {
        profile.estate = savedEstate;
      }
      localStorage.setItem("jesdac_session_role", targetRole);

      const currentCount = parseInt(localStorage.getItem("jesdac_metric_logins") || "142", 10);
      localStorage.setItem("jesdac_metric_logins", (currentCount + 1).toString());
    } catch {
      /* safe ignore */
    }

    setUser(profile);
  };

  const updateAffiliatedEstate = (estateName: string) => {
    if (!user) return;
    const updated = { ...user, estate: estateName };
    setUser(updated);
    try {
      localStorage.setItem("jesdac_member_estate", estateName);
    } catch {
      /* safe ignore */
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("jesdac_session_role");
    } catch {
      /* safe ignore */
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : "guest",
        isLoading,
        isMounted,
        loginAs,
        updateAffiliatedEstate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);