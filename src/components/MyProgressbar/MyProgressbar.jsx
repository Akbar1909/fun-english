import { memo } from "react";
import { useTheme } from "@mui/material";
import { MotionDiv } from "../client-side/MotionDiv";

const MyProgressbar = ({ initialProcess, process, style }) => {
  const theme = useTheme();
  return (
    <MotionDiv
      style={{ ...style, backgroundColor: theme.palette.info.main }}
      initial={{ width: initialProcess }}
      animate={{ width: process }}
      transition={{ duration: 1 }}
    />
  );
};

export default memo(MyProgressbar);
