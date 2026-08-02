import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

const SESSION_TIMEOUT_MS = 40 * 60 * 1000;
const ACTIVITY_EVENTS = ["mousedown", "mousemove", "keydown", "scroll", "touchstart", "focus", "click"] as const;

export default function SessionTimeoutWatcher() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handlingExpiryRef = useRef(false);

  useEffect(() => {
    const clearTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const expireSession = async () => {
      if (handlingExpiryRef.current) return;
      handlingExpiryRef.current = true;
      try {
        clearTimer();
        await logout();
        navigate("/login");
      } finally {
        handlingExpiryRef.current = false;
      }
    };

    if (!user) {
      clearTimer();
      return;
    }

    const resetTimer = () => {
      clearTimer();
      timeoutRef.current = setTimeout(() => {
        void expireSession();
      }, SESSION_TIMEOUT_MS);
    };

    resetTimer();

    ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, resetTimer, { passive: true });
    });

    return () => {
      clearTimer();
      ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, resetTimer);
      });
    };
  }, [logout, navigate, user]);

  useEffect(() => {
    const handleAuthExpired = () => {
      if (handlingExpiryRef.current) return;
      handlingExpiryRef.current = true;
      void logout()
        .finally(() => {
          navigate("/login");
          handlingExpiryRef.current = false;
        });
    };

    window.addEventListener("dern-auth-expired", handleAuthExpired);
    return () => window.removeEventListener("dern-auth-expired", handleAuthExpired);
  }, [logout, navigate]);

  return null;
}
