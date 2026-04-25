"use client";

import { getProfile } from "@/actions/auth/get-user";
import { UserProfile } from "@/types";
import { createClient } from "@/lib/supabase/client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

export type AppUser = UserProfile["user"] & {
  email: string | null;
  roles: string[];
};

export interface AuthContextType {
  user: AppUser | null;
  permissions: string[];
  navigation: UserProfile["navigation"];
  isLoading: boolean;
  getUserData: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [supabaseEmail, setSupabaseEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = useMemo(() => createClient(), []);

  const getUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const profile = await getProfile();

      if (!profile) {
        await supabase.auth.signOut();
        window.location.href = "/error";
        return;
      }

      setUserProfile(profile);
    } catch {
      setUserProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const fetchEvents = [
        "INITIAL_SESSION",
        "SIGNED_IN",
        "USER_UPDATED",
        "TOKEN_REFRESHED",
        "PASSWORD_RECOVERY",
      ];

      if (fetchEvents.includes(event) && session) {
        setSupabaseEmail(session.user.email ?? null);
        await getUserData();
      } else if (event === "SIGNED_OUT") {
        setSupabaseEmail(null);
        setUserProfile(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [getUserData, supabase]);

  const value = useMemo(
    () => ({
      user: userProfile
        ? {
            ...userProfile.user,
            email: supabaseEmail,
            roles: userProfile.roles.map((r) => String(r.name)),
          }
        : null,
      permissions: userProfile?.permissions ?? [],
      navigation: userProfile?.navigation ?? [],
      isLoading,
      getUserData,
    }),

    [userProfile, supabaseEmail, isLoading, getUserData],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
