import { Stack } from "@mui/material";
import Cell from "./Cell";

export const CellsWrapper = ({ children }) => (
  <Stack direction="row" flexWrap="wrap" justifyContent="center">
    {children}
  </Stack>
);

const Cells = ({
  word,
  prefixId,
  className,
  pointer = true,
  answerStatus,
  withWrapper = true,
  inVisibleIndexes = [],
  dirty = false,
  handleClick,
}) => {
  if (withWrapper) {
    return (
      <CellsWrapper>
        {word.split("").map((char, i) => (
          <Cell
            dirty={dirty}
            hiddenContent={inVisibleIndexes.includes(i)}
            pointer={pointer}
            index={i}
            className={className}
            prefixId={prefixId}
            key={i}
            char={char.toUpperCase()}
            answerStatus={answerStatus}
          />
        ))}
      </CellsWrapper>
    );
  }

  return (
    <>
      {word.split("").map((char, i) => (
        <Cell
          hiddenContent={inVisibleIndexes.includes(i)}
          pointer={pointer}
          index={i}
          className={className}
          prefixId={prefixId}
          key={i}
          char={char.toUpperCase()}
          answerStatus={answerStatus}
        />
      ))}
    </>
  );
};

export default Cells;
