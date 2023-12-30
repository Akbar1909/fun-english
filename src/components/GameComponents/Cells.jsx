import { Stack } from "@mui/material";
import Cell from "./Cell";

const Cells = ({
  word,
  prefixId,
  className,
  pointer = true,
  inVisibleIndexes,
  correct,
}) => {
  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="center">
      {word.split("").map((char, i) => (
        <Cell
          hiddenContent={inVisibleIndexes.includes(i)}
          pointer={pointer}
          index={i}
          className={className}
          prefixId={prefixId}
          key={i}
          char={char}
          correct={correct}
        />
      ))}
    </Stack>
  );
};

export default Cells;
