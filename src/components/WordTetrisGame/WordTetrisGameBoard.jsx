import { useRef, useState } from "react";
import { Box } from "@mui/material";
import { MotionDiv } from "../client-side/MotionDiv";

const WordTetrisGameBoard = ({ words }) => {
  console.log(words);

  const [s, setS] = useState(() =>
    words.map((word, i) => (
      <MotionDiv
        style={{ position: "absolute", bottom: "102vh" }}
        animate={{ bottom: 0, left: 0 }}
        transition={{ duration: 30, delay: i * 10, ease: "linear" }}
        key={i}
      >
        <div dangerouslySetInnerHTML={{ __html: word.description }}></div>
      </MotionDiv>
    ))
  );

  const wordsRef = useRef();

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>{s}</Box>
  );
};

export default WordTetrisGameBoard;
