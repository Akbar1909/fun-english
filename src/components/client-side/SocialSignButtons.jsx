"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Stack from "@mui/material/Stack";
import { useAuthStore } from "@/clientStore/auth";

const SocialSignButtons = () => {
  const { setAuthType } = useAuthStore();
  const options = [
    {
      label: "Github",
      icon: faGoogle,
      type: "github",
    },
  ];

  return (
    <Stack direction="column" mb={"8px"}>
      {options.map(({ icon, label, type }, i) => (
        <Stack
          onClick={async () => {
            const response = await signIn(type);

            console.log(response);
          }}
          key={i}
          position="relative"
          sx={{ width: "100%", backgroundColor: "red", cursor: "pointer" }}
          direction="row"
          alignItems="center"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: "common.white",
            }}
          >
            <FontAwesomeIcon icon={icon} />
          </Box>
          <Typography
            sx={{
              justifySelf: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            {label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default SocialSignButtons;
