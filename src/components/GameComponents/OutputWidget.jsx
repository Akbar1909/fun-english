import React from "react";
import { useTheme } from "@mui/material";
import { MotionDiv } from "../client-side/MotionDiv";

const OutputWidget = () => {
  const theme = useTheme();

  return (
    <MotionDiv
      style={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: theme.palette.common.white,
      }}
      initial={{ height: 0 }}
      transition={{ duration: 0.3 }}
      animate={{ height: "100dvh" }}
    >
      OutputWidget
    </MotionDiv>
  );
};

export default OutputWidget;
