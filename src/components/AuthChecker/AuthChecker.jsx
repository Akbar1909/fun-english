"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/clientStore/ui";

const AuthChecker = () => {
  const { toggleAuthModal } = useUIStore();
  const searchParams = useSearchParams();

  const notSignin = searchParams.has("signin");

  useEffect(() => {
    if (notSignin) {
      toggleAuthModal();
    }
  }, [notSignin]);

  useEffect(() => {
    if (notSignin) {
      toggleAuthModal();
    }
  }, [notSignin]);

  return null;
};

export default AuthChecker;
