import { Typography, useTheme } from "@mui/material";
import { MotionDiv } from "../client-side/MotionDiv";

const Cell = ({
  char,
  size = 40,
  prefixId,
  className,
  index,
  pointer,
  hiddenContent,
  correct,
}) => {
  const theme = useTheme();

  const variants = {
    success: {
      backgroundColor: theme.palette.success.main,
      color: "white",
      transform: "scale(1.05)",
    },
    initial: {
      backgroundColor: "white",
    },
  };

  return (
    <MotionDiv
      data-index={index}
      id={`${prefixId}-${char}`}
      className={`char-view ${className}`}
      data-char={char}
      variants={variants}
      animate={correct ? "success" : "initial"}
      transition={{ delay: index * 0.05 }}
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
      {!hiddenContent && <Typography variant="h6">{char}</Typography>}
    </MotionDiv>
  );
};

export default Cell;
