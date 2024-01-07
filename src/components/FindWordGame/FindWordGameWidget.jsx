import React, { useState, useEffect, useMemo, Fragment, useRef } from "react";
import { createPortal, flushSync } from "react-dom";
import Image from "next/image";
import { Box, Stack, useTheme } from "@mui/material";
import Cells from "@/components/GameComponents/Cells";
import Cell from "../GameComponents/Cell";
import {
  compareCaseInsensitive,
  getClickedElement,
  removeEmptySpace,
  replaceAt,
} from "@/helpers/common";
import { MotionDiv } from "../client-side/MotionDiv";
import { FIND_WORD_GAME_ACTION_TYPES } from "./_hooks/useFindWordGameController";
import AnimatedCell from "./_components/AnimatedCell";

let temp = {};

const FindWordGameWidget = ({
  word,
  description,
  media: { filename, aspectRatio },
  handleNext,
  dispatch,
  state,
}) => {
  const theme = useTheme();
  const dirtyRef = useRef(false);
  const { textWithoutEmptySpace, emptySpaceIndexes, trimmedWord, dirty } =
    state;
  const [animatedEls, setAnimatedEls] = useState(new Map());
  const [input, setInput] = useState(() => state.input);
  const [shuffledWord, setShuffledWord] = useState(() => state.shuffledWord);
  const [history, setHistory] = useState(() => state.history);
  const [firstBox, setFirstBox] = useState(() => state.firstBox);
  const [secondBox, setSecondBox] = useState(() => state.secondBox);
  const [answerStatus, setAnswerStatus] = useState(() => state.answerStatus);
  const cleanInput = useMemo(() => removeEmptySpace(input), [input]);

  const handleInput = (e) => {
    dirtyRef.current = true;

    dispatch({
      type: FIND_WORD_GAME_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY,
      payload: { word: trimmedWord, dirty: true },
    });

    const clickedElement = getClickedElement(e.target, "char-view");
    const textContent = clickedElement.textContent;

    if (textContent.trim().length === 0) {
      return;
    }

    const clickedIndex = parseInt(clickedElement.dataset.index, 10);
    const targetIndex = input
      .split("")
      .findIndex((char, i) => char === " " && !firstBox.includes(i));
    const originalOptions = clickedElement.getBoundingClientRect();
    const targetOptions = document
      .getElementsByClassName("first")
      [targetIndex].getBoundingClientRect();

    const newShuffledWord = replaceAt(shuffledWord, " ", clickedIndex);
    const newFirstBox = [...firstBox, targetIndex];
    const newInput = replaceAt(input, textContent, targetIndex);

    flushSync(() => {
      setShuffledWord(newShuffledWord);
      setFirstBox((pre) => [...pre, targetIndex]);
      setInput(newInput);
    });

    temp = {
      ...temp,
      shuffledWord: newShuffledWord,
      firstBox: newFirstBox,
      input: newInput,
    };

    const animatedEl = (
      <AnimatedCell
        originalOptions={originalOptions}
        targetOptions={targetOptions}
        char={textContent}
        handleAnimationComplete={() => {
          setFirstBox((preFirstBox) => {
            const tempFirstBox = preFirstBox.filter(
              (item) => item !== targetIndex
            );

            temp.firstBox = tempFirstBox;

            return tempFirstBox;
          });
          setAnimatedEls((map) => new Map(map.set(targetIndex, null)));
          setHistory((preHistory) => {
            const tempHistory = [
              ...preHistory,
              { des: targetIndex, org: clickedIndex, char: textContent },
            ];

            temp.history = tempHistory;

            return tempHistory;
          });
        }}
      />
    );

    setAnimatedEls((map) => new Map(map.set(targetIndex, animatedEl)));
  };

  const handleRevert = (e) => {
    dirtyRef.current = true;

    dispatch({
      type: FIND_WORD_GAME_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY,
      payload: { word: trimmedWord, dirty: true },
    });

    const clickedElement = getClickedElement(e.target, "char-view");
    const textContent = clickedElement.textContent;

    if (textContent.trim().length === 0) {
      return;
    }

    const clickedIndex = parseInt(clickedElement.dataset.index, 10);
    const { org, des } = history.find(
      ({ des, org }) => des === clickedIndex && !secondBox.includes(org)
    );

    const originalOptions = clickedElement.getBoundingClientRect();
    const targetOptions = document
      .getElementsByClassName("second")
      [org].getBoundingClientRect();

    flushSync(() => {
      setInput((preInput) => {
        temp.input = replaceAt(preInput, " ", clickedIndex);
        return temp.input;
      });
      setSecondBox((pre) => {
        temp.secondBox = [...pre, org];
        return temp.secondBox;
      });
      setShuffledWord((preShuffledWord) => {
        temp.shuffledWord = replaceAt(preShuffledWord, textContent, org);
        return temp.shuffledWord;
      });
    });

    const animatedEl = (
      <AnimatedCell
        originalOptions={originalOptions}
        targetOptions={targetOptions}
        handleAnimationComplete={() => {
          setSecondBox((pre) => {
            temp.secondBox = pre.filter((item) => item !== org);
            return temp.secondBox;
          });
          setHistory((preHistory) => {
            temp.history = preHistory.filter((item) => item.org !== org);
            return temp.history;
          });
          setAnimatedEls((map) => new Map(map.set(`${org}${des}`, null)));
        }}
        char={textContent}
      />
    );

    setAnimatedEls((map) => new Map(map.set(`${org}${des}`, animatedEl)));
  };

  useEffect(() => {
    if (!dirtyRef.current) {
      return;
    }

    if (
      compareCaseInsensitive(input.trim(), textWithoutEmptySpace) &&
      firstBox.length === 0 &&
      secondBox.length === 0
    ) {
      setAnswerStatus("correct");
      temp.answerStatus = "correct";
      setTimeout(() => handleNext(), input.length * 0.05 * 1000 + 500);

      return;
    }

    if (
      cleanInput.length === textWithoutEmptySpace.length &&
      firstBox.length === 0 &&
      secondBox.length === 0
    ) {
      setAnswerStatus("error");
      temp.answerStatus = "error";

      return;
    }

    setAnswerStatus("initial");
    temp.answerStatus = "initial";

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanInput, input, word, firstBox, secondBox, textWithoutEmptySpace]);

  useEffect(() => {
    return () => {
      if (dirtyRef.current) {
        dispatch({
          type: FIND_WORD_GAME_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY,
          payload: {
            ...temp,
            word: trimmedWord,
          },
        });
      }
    };
  }, [dispatch, word, trimmedWord]);

  const splitedWord = word.split(" ");

  return (
    <>
      <MotionDiv
        style={{
          flex: 1,
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          transformOrigin: "right",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
        }}
        initial={{ opacity: 0, left: "-100%" }}
        transition={{ duration: 0.3 }}
        animate={{ opacity: 1, left: "100%" }}
      >
        <Stack
          sx={{ fontSize: "20px" }}
          direction="row"
          alignItems="center"
          mb={3}
        >
          <Box
            sx={{
              position: "relative",
              pl: 2,
              fontSize: "22px",
              color: theme.palette.info.contrastText,
              "&::before": {
                fontWeight: "bold",
                content: '"-"',
                position: "absolute",
                left: 0,
                top: 0,
              },
            }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </Stack>
        <Box
          sx={{
            width: `${window.innerWidth * 0.8}px`,
            height: `${window.innerHeight * 0.3}px`,
            position: "relative",
          }}
        >
          <Image
            className="text-center"
            layout="fill"
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/files/serve/${filename}`}
            alt="bird"
            objectFit="contain"
          />
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          mt={3}
          sx={{ display: "flex", justifyContent: "center" }}
          onClick={handleRevert}
        >
          {splitedWord.map((wordChunk, i) => {
            const word =
              i === 0
                ? input.slice(0, wordChunk.length)
                : input.slice(
                    emptySpaceIndexes[i - 1],
                    emptySpaceIndexes[i - 1] + wordChunk.length
                  );

            return (
              <Fragment key={i}>
                {i !== 0 && (
                  <Box
                    sx={{
                      width: "30px",
                      height: "44px",
                    }}
                  />
                )}
                {word.split("").map((char, ix) => {
                  const index = ix + (splitedWord?.[i - 1]?.length || 0);

                  return (
                    <Cell
                      key={ix}
                      hiddenContent={firstBox.includes(index)}
                      className="first"
                      prefixId="first"
                      char={char}
                      answerStatus={answerStatus}
                      withWrapper={false}
                      index={index}
                      pointer
                      dirty={dirty}
                    />
                  );
                })}
              </Fragment>
            );
          })}
        </Stack>
        <Box
          sx={{
            bottom: "10px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "auto",
          }}
          onClick={handleInput}
        >
          <Cells
            inVisibleIndexes={secondBox}
            className="second"
            prefixId="second"
            word={shuffledWord}
            dirty={dirty}
          />
        </Box>
      </MotionDiv>

      {Array.from(animatedEls.values()).map(
        (an) => an && createPortal(an, document.body)
      )}
    </>
  );
};

export default FindWordGameWidget;
