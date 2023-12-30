import { useRef, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { MotionDiv } from "../client-side/MotionDiv";
import Cells from "../GameComponents/Cells";
import WordTetrisWidget from "./WordTetrisWidget";

const WordTetrisGameBoard = ({ words }) => {
  const theme = useTheme();
  const [bottomOffset, setBottomOffset] = useState(0);

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      {words.map((word, i) => (
        <WordTetrisWidget key={i} {...word} />
      ))}
    </Box>
  );
};

export default WordTetrisGameBoard;
