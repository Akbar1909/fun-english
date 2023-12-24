"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button, Stack } from "@mui/material";
import { useUIStore } from "@/clientStore/ui";
import AnimatedModal from "../client-side/AnimatedModal.client";
import AuthForm from "../client-side/AuthForm.client";

const LoginButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { status, data, ...rest } = useSession();
  const { toggleAuthModal, authModalOpen } = useUIStore();

  console.log({ status, data });

  if (status === "authenticated") {
    return null;
  }

  const handleClose = () => {
    router.push(pathname);
    toggleAuthModal();
  };

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Button onClick={toggleAuthModal}>Login</Button>
        <Button onClick={toggleAuthModal}>Sign up</Button>
      </Stack>

      {authModalOpen && (
        <AnimatedModal isOpen={authModalOpen} onClose={handleClose}>
          <AuthForm />
        </AnimatedModal>
      )}
    </>
  );
};

export default LoginButton;
