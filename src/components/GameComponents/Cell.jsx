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
}) => {
  const theme = useTheme();

  const correct = answerStatus === "correct";
  const error = answerStatus === "error";

  const variants = {
    success: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.light,
      transform: "scale(1)",
    },
    initial: {
      backgroundColor: theme.palette.common.white,
    },
    error: {
      border: "1px solid",
      borderColor: theme.palette.error.main,
      color: theme.palette.error.light,
    },
  };

  return (
    <MotionDiv
      data-index={index}
      id={`${prefixId}-${char}`}
      className={`char-view ${className}`}
      data-char={char}
      variants={variants}
      animate={correct ? "success" : error ? "error" : "initial"}
      transition={{ delay: index * 0.05 }}
      whileTap={{ scale: 1.2, transform: "translate(2px,2px)", transition: 1 }}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        backgroundColor: theme.palette.common.white,
        border: "1px solid",
        borderColor: theme.palette.grey[300],
        borderRadius: "4px",
        ...(pointer && { cursor: "pointer" }),
      }}
    >
      {!hiddenContent && <Typography variant="h3">{char}</Typography>}
    </MotionDiv>
  );
};

export default Cell;
