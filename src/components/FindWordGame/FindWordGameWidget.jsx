import React, { useState, useEffect, useMemo, Fragment, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Box, Stack } from "@mui/material";
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

const map = new Map();

const FindWordGameWidget = ({
  word,
  description,
  media: { filename, aspectRatio },
  handleNext,
  dispatch,
  state,
}) => {
  const {
    textWithoutEmptySpace,
    emptySpaceIndexes,
    shuffledWord,
    input,
    history,
    answerStatus,
  } = state;

  const hiddenInputText = useRef(input);
  const hiddenShuffledWord = useRef(shuffledWord);
  const [animatedEls, setAnimatedEls] = useState(new Map());

  const cleanInput = useMemo(() => removeEmptySpace(input), [input]);

  const handleInput = (e) => {
    const clickedElement = getClickedElement(e.target, "char-view");
    const char = clickedElement.textContent;

    if (char.trim().length === 0) {
      return;
    }

    const clickedIndex = parseInt(clickedElement.dataset.index, 10);
    const targetIndex = hiddenInputText.current
      .split("")
      .findIndex((char) => char === " ");

    const originalOptions = clickedElement.getBoundingClientRect();
    const targetOptions = document
      .getElementsByClassName("first")
      [targetIndex].getBoundingClientRect();

    const newShuffledWord = replaceAt(shuffledWord, " ", clickedIndex);
    const updatedInput = replaceAt(hiddenInputText.current, char, targetIndex);

    hiddenInputText.current = updatedInput;
    hiddenShuffledWord.current = newShuffledWord;

    dispatch({
      type: FIND_WORD_GAME_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY,
      payload: {
        shuffledWord: newShuffledWord,
        lastEmptyCharIndex: targetIndex,
        history: [
          ...history,
          {
            des: targetIndex,
            org: clickedIndex,
            char,
          },
        ],
      },
    });

    const animatedEl = (
      <AnimatedCell
        dataValue={`${updatedInput}-${targetIndex}-${clickedIndex}`}
        className={"first-animated"}
        targetOptions={targetOptions}
        originalOptions={originalOptions}
        char={char}
        handleAnimationComplete={() => {
          const el = document.getElementsByClassName("first-animated")?.[0];

          if (!el) {
            return;
          }

          let [updatedInput, targetIndex, clickedIndex] = el
            .getAttribute("data-value")
            .split("-");

          targetIndex = parseInt(targetIndex, 10);
          clickedIndex = parseInt(clickedIndex, 10);

          dispatch({
            type: FIND_WORD_GAME_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY,
            payload: {
              input: updatedInput,
            },
          });

          setAnimatedEls((map) => new Map(map.set(targetIndex, null)));
        }}
      />
    );

    setAnimatedEls((map) => new Map(map.set(targetIndex, animatedEl)));
  };

  const handleRevert = (e) => {
    const clickedElement = getClickedElement(e.target, "char-view");
    const char = clickedElement.textContent;

    if (char.trim().length === 0 && clickedElement) {
      return;
    }

    const clickedIndex = parseInt(clickedElement.dataset.index, 10);

    const { org, des } = history.find(({ des }) => des === clickedIndex);

    const originalOptions = clickedElement.getBoundingClientRect();
    const targetOptions = document
      .getElementsByClassName("second")
      [org].getBoundingClientRect();

    const key = `${org}${des}`;

    hiddenInputText.current = replaceAt(
      hiddenInputText.current,
      " ",
      clickedIndex
    );

    const updatedShuffledWord = replaceAt(
      hiddenShuffledWord.current,
      char,
      org
    );

    hiddenShuffledWord.current = updatedShuffledWord;

    dispatch({
      type: FIND_WORD_GAME_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY,
      payload: {
        input: hiddenInputText.current,
      },
    });

    map.set(key, history);

    const animatedEl = (
      <AnimatedCell
        className="second-animated"
        dataValue={`${org}-${updatedShuffledWord}-${des}`}
        originalOptions={originalOptions}
        targetOptions={targetOptions}
        char={char}
        handleAnimationComplete={() => {
          const el = document.getElementsByClassName("second-animated")?.[0];

          if (!el) {
            return;
          }

          let [org, updatedShuffledWord, des] = el
            .getAttribute("data-value")
            .split("-");

          org = parseInt(org, 10);
          des = parseInt(des, 10);

          const history = map.get(`${org}${des}`);

          dispatch({
            type: FIND_WORD_GAME_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY,
            payload: {
              history: history.filter((item) => item.org !== org),
              shuffledWord: updatedShuffledWord,
            },
          });

          setAnimatedEls((map) => new Map(map.set(`${org}${des}`, null)));
        }}
      />
    );

    setAnimatedEls((map) => new Map(map.set(`${org}${des}`, animatedEl)));
  };

  useEffect(() => {
    if (compareCaseInsensitive(input.trim(), textWithoutEmptySpace)) {
      dispatch({
        type: FIND_WORD_GAME_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY,
        payload: {
          answerStatus: "correct",
        },
      });

      setTimeout(() => handleNext(), input.length * 0.05 * 1000 + 500);

      return;
    }

    if (cleanInput.length === textWithoutEmptySpace.length) {
      dispatch({
        type: FIND_WORD_GAME_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY,
        payload: {
          answerStatus: "error",
        },
      });

      return;
    }

    dispatch({
      type: FIND_WORD_GAME_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY,
      payload: {
        answerStatus: "initial",
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanInput, input, word, textWithoutEmptySpace]);

  return (
    <>
      <MotionDiv
        style={{
          flex: 1,
          position: "relative",
          opacity: 0,
          left: "100%",
          scaleZ: 0,
        }}
        transition={{ duration: 0.5 }}
        animate={{ opacity: 1, left: 0, scaleZ: 1 }}
      >
        <Stack direction="row" alignItems="center" mb={3}>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </Stack>
        <Box>
          <Image
            className="text-center"
            width={300}
            height={300 * (aspectRatio || 1)}
            style={{ margin: "auto" }}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/files/serve/${filename}`}
            alt="bird"
          />
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          mt={2}
          sx={{ display: "flex", justifyContent: "center" }}
          onClick={handleRevert}
        >
          {word.split(" ").map((wordChunk, i) => {
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
                  const index = ix + i * wordChunk.length - i;

                  return (
                    <Cell
                      key={ix}
                      hiddenContent={false}
                      className="first"
                      prefixId="first"
                      char={char}
                      answerStatus={answerStatus}
                      withWrapper={false}
                      index={index}
                      pointer
                    />
                  );
                })}
              </Fragment>
            );
          })}
        </Stack>
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
          onClick={handleInput}
        >
          <Cells className="second" prefixId="second" word={shuffledWord} />
        </Box>
      </MotionDiv>

      {Array.from(animatedEls.values()).map(
        (an) => an && createPortal(an, document.body)
      )}
    </>
  );
};

export default FindWordGameWidget;
