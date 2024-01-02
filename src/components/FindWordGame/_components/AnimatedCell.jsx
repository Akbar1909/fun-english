import React from "react";
import Typography from "@mui/material/Typography";
import { MotionDiv } from "@/components/client-side/MotionDiv";

const AnimatedCell = ({
  handleAnimationComplete,
  targetOptions,
  originalOptions,
  char,
}) => {
  return (
    <MotionDiv
      initial={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        left: `${originalOptions.left}px`,
        top: `${originalOptions.top}`,
        zIndex: 20,
        width: `${originalOptions.width}px`,
        height: `${originalOptions.height}px`,
      }}
      animate={{
        left: `${targetOptions.left}px`,
        top: `${targetOptions.top}px`,
      }}
      onAnimationComplete={handleAnimationComplete}
      transition={{ duration: 0.4 }}
    >
      <Typography variant="h3">{char}</Typography>
    </MotionDiv>
  );
};

export default AnimatedCell;
