import { useEffect, useLayoutEffect, useRef } from "react";
import Cells from "../GameComponents/Cells";
import { Box, useTheme } from "@mui/material";

const WordTetrisWidget = ({ word, description, index }) => {
  const wordRef = useRef(null);
  const theme = useTheme();

  useLayoutEffect(() => {
    if (!wordRef.current) {
      return;
    }

    const { bottom } = wordRef.current.getBoundingClientRect();
  }, []);

  return (
    <Box
      ref={wordRef}
      id={`word-tetris-${word}`}
      style={{
        position: "absolute",
        bottom: `calc(100dvh + 20px)`,
        margin: "auto",
        width: "94%",
        left: "3%",
      }}
    >
      <div
        style={{
          padding: "3px",
          border: "1px solid",
          borderColor: theme.palette.grey[500],
          borderRadius: "4px",
        }}
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <Cells word={word.trim()} />
    </Box>
  );
};

export default WordTetrisWidget;
