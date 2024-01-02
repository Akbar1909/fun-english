import { Stack, Box, IconButton, Typography, Button } from "@mui/material";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import FindWordGameWidget from "./FindWordGameWidget";
import useFindWordGameController, {
  FIND_WORD_GAME_ACTION_TYPES,
} from "./_hooks/useFindWordGameController";
import MyProgressbar from "../MyProgressbar/MyProgressbar";

const styles = {
  root: {
    height: "100%",
    maxWidth: "450px",
    width: "100%",
  },
  paginationButtonBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderColor: (theme) => theme.palette.grey[300],
  },
};

const FindWordGameBoard = ({ words }) => {
  const [index, setIndex] = useState(19);
  const { state, dispatch, currentWordState } = useFindWordGameController(
    words,
    index
  );

  const [maxIndex, setMaxIndex] = useState(0);

  const total = words.length;

  const handleNext = () => {
    if (index === words.length - 1) {
      return;
    }

    const nextIndex = index + 1;

    setIndex(nextIndex);
    setMaxIndex(Math.max(nextIndex, maxIndex));

    dispatch({
      type: FIND_WORD_GAME_ACTION_TYPES.SET_SELECTED_WORD,
      payload: words[nextIndex]?.word.trim(),
    });
  };

  const handlePrev = () => {
    if (index === 0) {
      return;
    }

    const prevIndex = index - 1;

    setIndex(prevIndex);

    dispatch({
      type: FIND_WORD_GAME_ACTION_TYPES.SET_SELECTED_WORD,
      payload: words[prevIndex]?.word.trim(),
    });
  };

  return (
    <>
      <Stack sx={styles.root} direction="column">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            height: "40px",
            borderBottom: "1px solid",
            borderColor: (theme) => theme.palette.grey[300],
          }}
        >
          <Box sx={[{ borderRight: "1px solid" }, styles.paginationButtonBox]}>
            {index > 0 && (
              <IconButton onClick={handlePrev}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </IconButton>
            )}
          </Box>

          <Box>
            <Typography sx={{ fontWeight: "bold" }}>
              {index + 1} / {total}
            </Typography>
          </Box>

          <Box sx={[{ borderLeft: "1px solid" }, styles.paginationButtonBox]}>
            {index < words.length - 1 && (
              <IconButton onClick={handleNext}>
                <FontAwesomeIcon icon={faChevronRight} />
              </IconButton>
            )}
          </Box>
        </Stack>
        <MyProgressbar
          initialProcess={"0%"}
          process={`${Math.ceil(((maxIndex + 1) * 100) / total)}%`}
          style={{ height: "3px" }}
        />

        <FindWordGameWidget
          dispatch={dispatch}
          state={currentWordState}
          {...words[index]}
          key={index}
          index={index}
          handleNext={handleNext}
        />
      </Stack>
    </>
  );
};

export default FindWordGameBoard;
