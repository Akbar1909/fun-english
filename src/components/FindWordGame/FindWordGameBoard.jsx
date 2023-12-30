import { Stack, Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import FindWordGameWidget from "./FindWordGameWidget";

const styles = {
  root: {
    px: "8px",
    height: "100%",
    maxWidth: "450px",
    width: "100%",
  },
  paginationButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(50%)",
    zIndex: 10,
  },
};

const FindWordGameBoard = ({ words }) => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index === words.length - 1) {
      return;
    }

    setIndex((preIndex) => preIndex + 1);
  };

  const handlePrev = () => {
    setIndex((preIndex) => preIndex - 1);
  };

  return (
    <Stack sx={styles.root} direction="column">
      {/* {index > 0 && (
        <IconButton
          sx={[
            {
              left: "10px",
            },
            styles.paginationButton,
          ]}
          onClick={handlePrev}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </IconButton>
      )} */}

      {/* {index < words.length - 1 && (
        <IconButton
          sx={[
            {
              right: "10px",
            },
            styles.paginationButton,
          ]}
          onClick={handleNext}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </IconButton>
      )} */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pt: 1 }}
      >
        <Box></Box>
        <Typography variant="h2">{index + 1}</Typography>
        <Typography></Typography>
      </Stack>

      <FindWordGameWidget
        {...words[index]}
        word={words[index].word.trim()}
        key={index}
        index={index}
        handleNext={handleNext}
      />
    </Stack>
  );
};

export default FindWordGameBoard;
