import { memo } from "react";
import { Typography, useTheme } from "@mui/material";
import { MotionDiv } from "../client-side/MotionDiv";

const Cell = ({
  char,
  size = 44,
  prefixId,
  className,
  index,
  pointer,
  hiddenContent,
  answerStatus,
  dirty,
}) => {
  const theme = useTheme();

  const variants = {
    correct: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.light,
      transform: "scale(1)",
    },
    initial: {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.common.white,
    },
    error: {
      border: "1px solid",
      borderColor: theme.palette.error.main,
      color: theme.palette.error.light,
    },
    done: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.light,
      transform: "scale(1)",
    },
  };

  return (
    <MotionDiv
      data-index={index}
      id={`${prefixId}-${char}`}
      className={`char-view ${className}`}
      data-char={char}
      variants={variants}
      animate={answerStatus}
      transition={{ delay: index * 0.05 }}
      whileTap={{ scale: 1.2, transform: "translate(2px,2px)", transition: 1 }}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        border: "1px solid",
        backgroundColor: theme.palette.common.white,
        borderColor: theme.palette.grey[300],
        borderRadius: "4px",
        ...(pointer && { cursor: "pointer" }),
        ...(dirty && variants[answerStatus]),
      }}
    >
      {!hiddenContent && <Typography variant="h3">{char}</Typography>}
    </MotionDiv>
  );
};

export default memo(Cell);
