import React, { useState, useEffect, useMemo, Fragment } from "react";
import { createPortal, flushSync } from "react-dom";
import Image from "next/image";
import { Box, Stack } from "@mui/material";
import Cells from "@/components/GameComponents/Cells";
import Cell from "../GameComponents/Cell";
import {
  compareCaseInsensitive,
  findSpecialCharIndexes,
  getClickedElement,
  removeEmptySpace,
  replaceAt,
  shuffle,
} from "@/helpers/common";
import { MotionDiv } from "../client-side/MotionDiv";

const FindWordGameWidget = ({
  word,
  description,
  media: { filename, aspectRatio },
  handleNext,
}) => {
  const textWithoutEmptySpace = useMemo(() => removeEmptySpace(word), [word]);
  const emptySpaceIndexes = useMemo(() => findSpecialCharIndexes(word), [word]);

  const [animatedEls, setAnimatedEls] = useState(new Map());
  const [input, setInput] = useState(() => " ".repeat(word.length));
  const [shuffledWord, setShuffledWord] = useState(() =>
    shuffle(textWithoutEmptySpace)
  );
  const [history, setHistory] = useState([]);
  const [firstBox, setFirstBox] = useState([]);
  const [secondBox, setSecondBox] = useState([]);
  const [answerStatus, setAnswerStatus] = useState("initial");

  const cleanInput = useMemo(() => removeEmptySpace(input), [input]);

  const handleInput = (e) => {
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

    flushSync(() => {
      setShuffledWord((preShuffleWord) =>
        replaceAt(preShuffleWord, " ", clickedIndex)
      );

      setFirstBox((pre) => [...pre, targetIndex]);
      setInput((preInput) => replaceAt(preInput, textContent, targetIndex));
    });

    const animatedEl = (
      <MotionDiv
        initial={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          left: `${originalOptions.left}px`,
          top: `${originalOptions.top}`,
          zIndex: 20,
          width: `${originalOptions.width}px`,
          height: `${originalOptions.height}px`,
        }}
        animate={{
          left: `${targetOptions.left}px`,
          top: `${targetOptions.top}px`,
        }}
        onAnimationComplete={() => {
          setFirstBox((pre) => pre.filter((item) => item !== targetIndex));
          setAnimatedEls((map) => new Map(map.set(targetIndex, null)));
          setHistory((preHistory) => [
            ...preHistory,
            { des: targetIndex, org: clickedIndex, char: textContent },
          ]);
        }}
      >
        {textContent}
      </MotionDiv>
    );

    setAnimatedEls((map) => new Map(map.set(targetIndex, animatedEl)));
  };

  const handleRevert = (e) => {
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
      setInput((preInput) => replaceAt(preInput, " ", clickedIndex));
      setSecondBox((pre) => [...pre, org]);
      setShuffledWord((preShuffledWord) =>
        replaceAt(preShuffledWord, textContent, org)
      );
    });

    const animatedEl = (
      <MotionDiv
        initial={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          left: `${originalOptions.left}px`,
          top: `${originalOptions.top}`,
          zIndex: 20,
          width: `${originalOptions.width}px`,
          height: `${originalOptions.height}px`,
        }}
        animate={{
          left: `${targetOptions.left}px`,
          top: `${targetOptions.top}px`,
        }}
        onAnimationComplete={() => {
          setSecondBox((pre) => pre.filter((item) => item !== org));
          setHistory((preHistory) =>
            preHistory.filter((item) => item.org !== org)
          );
          setAnimatedEls((map) => new Map(map.set(`${org}${des}`, null)));
        }}
      >
        {textContent}
      </MotionDiv>
    );

    setAnimatedEls((map) => new Map(map.set(`${org}${des}`, animatedEl)));
  };

  useEffect(() => {
    console.log({ cleanInput, word });

    if (
      compareCaseInsensitive(input.trim(), textWithoutEmptySpace) &&
      firstBox.length === 0 &&
      secondBox.length === 0
    ) {
      setAnswerStatus("correct");
      setTimeout(() => handleNext(), input.length * 0.05 * 1000 + 500);

      return;
    }

    if (
      cleanInput.length === textWithoutEmptySpace.length &&
      firstBox.length === 0 &&
      secondBox.length === 0
    ) {
      setAnswerStatus("error");

      return;
    }
    setAnswerStatus("initial");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanInput, input, word, firstBox, secondBox, textWithoutEmptySpace]);

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
                      hiddenContent={firstBox.includes(index)}
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
          <Cells
            inVisibleIndexes={secondBox}
            className="second"
            prefixId="second"
            word={shuffledWord}
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
