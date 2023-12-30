import React, { useState, useEffect, useMemo } from "react";
import { createPortal, flushSync } from "react-dom";
import { useAnimation } from "framer-motion";
import Image from "next/image";
import { Box, Stack } from "@mui/material";
import Cells from "@/components/GameComponents/Cells";
import {
  compareCaseInsensitive,
  getClickedElement,
  replaceAt,
  shuffle,
} from "@/helpers/common";
import { MotionDiv } from "../client-side/MotionDiv";

const FindWordGameWidget = ({ word, description, media, handleNext }) => {
  const [animatedEls, setAnimatedEls] = useState(new Map());
  const [input, setInput] = useState(() => " ".repeat(word.length));
  const [shuffledWord, setShuffledWord] = useState(() => shuffle(word));
  const [history, setHistory] = useState([]);
  const [firstBox, setFirstBox] = useState([]);
  const [secondBox, setSecondBox] = useState([]);
  const [answerStatus, setAnswerStatus] = useState("initial");

  const cleanInput = useMemo(
    () =>
      input
        .split("")
        .filter((char) => char.trim())
        .join(""),
    [input]
  );

  const controls = useAnimation();

  const handleInput = (e) => {
    const clickedElement = getClickedElement(e.target, "char-view");
    const textContent = clickedElement.textContent;

    if (textContent.trim().length === 0) {
      return;
    }

    const clickedIndex = parseInt(clickedElement.dataset.index, 10);
    const targetIndex = input.split("").findIndex((char) => char === " ");
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
        style={{
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
    const targetIndex = history.find(({ des }) => des === clickedIndex);

    const originalOptions = clickedElement.getBoundingClientRect();
    const targetOptions = document
      .getElementsByClassName("second")
      [targetIndex.org].getBoundingClientRect();

    flushSync(() => {
      setInput((preInput) => replaceAt(preInput, " ", clickedIndex));
      setSecondBox((pre) => [...pre, targetIndex.org]);
      setShuffledWord((preShuffleWord) =>
        replaceAt(preShuffleWord, textContent, targetIndex.org)
      );
    });

    const animatedEl = (
      <MotionDiv
        style={{
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
          setSecondBox((pre) => pre.filter((item) => item !== targetIndex.org));
          setAnimatedEls(
            (map) =>
              new Map(map.set(`${targetIndex.org}${targetIndex.des}`, null))
          );
        }}
      >
        {textContent}
      </MotionDiv>
    );

    setAnimatedEls(
      (map) =>
        new Map(map.set(`${targetIndex.org}${targetIndex.des}`, animatedEl))
    );
  };

  useEffect(() => {
    if (
      compareCaseInsensitive(input, word) &&
      firstBox.length === 0 &&
      secondBox.length === 0
    ) {
      setAnswerStatus("correct");
      setTimeout(() => handleNext(), input.length * 0.05 * 1000 + 500);

      return;
    }

    if (
      cleanInput.length === word.length &&
      firstBox.length === 0 &&
      secondBox.length === 0
    ) {
      setAnswerStatus("error");

      return;
    }
    setAnswerStatus("initial");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanInput, input, word, firstBox, secondBox, controls]);

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
        <Image
          className="text-center"
          style={{ margin: "auto", width: "100%", borderRadius: "4px" }}
          width={300}
          height={300}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/files/serve/${media.filename}`}
          alt="bird"
        />
        <Box
          mt={2}
          sx={{ display: "flex", justifyContent: "center" }}
          onClick={handleRevert}
        >
          <Cells
            inVisibleIndexes={firstBox}
            className="first"
            prefixId="first"
            word={input}
            answerStatus={answerStatus}
          />
        </Box>
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
