"use client";

import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";

const LogoutButton = () => {
  const { status } = useSession();

  if (status !== "authenticated") {
    return null;
  }

  return <Button onClick={() => signOut()}>Sign out</Button>;
};

export default LogoutButton;
