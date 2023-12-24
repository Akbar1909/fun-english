"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/clientStore/ui";

const AuthChecker = () => {
  const { status } = useSession();
  const { toggleAuthModal } = useUIStore();
  const searchParams = useSearchParams();

  const notSignin = searchParams.has("signin");

  useEffect(() => {
    if (status === "unauthenticated") {
      toggleAuthModal();
    }
  }, [status]);

  useEffect(() => {
    if (notSignin) {
      toggleAuthModal();
    }
  }, [notSignin]);

  return null;
};

export default AuthChecker;
