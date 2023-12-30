"use client";
import { useEffect, useState, useRef, Suspense, lazy } from "react";
import { flushSync, createPortal } from "react-dom";
import { useAnimate } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Box, Stack, Button } from "@mui/material";
import { httpGetWordTagsCount } from "@/data/word-tag/word-tag.requests";
import WordTagView from "../server-side/WordTagView/WordTagView.server";
import { MotionDiv } from "../client-side/MotionDiv";
import { getClickedElement } from "@/helpers/common";
import useWordsByWordTags from "@/hooks/api/useWordsByWordTags";

const FindWordGameBoard = lazy(() =>
  import("../FindWordGame/FindWordGameBoard")
);

const styles = {
  backlog: {
    width: "100%",
    border: "1px solid",
    p: 1,
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    height: "42dvh",
  },
  wordTag: {
    px: "8px",
    flex: 1,
    cursor: "pointer",
  },
};

const Exchange = () => {
  const [rootRef, rootRefAnimate] = useAnimate();
  const [gameBoardTetrisRef, setGameBoardTetrisRef] = useAnimate();
  const gameBoardValues = useRef([]);
  const [firstBox, setFirstBox] = useState(new Map());
  const [secondBox, setSecondBox] = useState(new Map());
  const [animatedEl, setAnimatedEl] = useState(new Map());

  const wordsState = useWordsByWordTags(gameBoardValues.current);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["word-tags-count"],
    queryFn: httpGetWordTagsCount,
    select: (response) => response.data,
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    setFirstBox(
      data?.data.reduce(
        (acc, cur) =>
          acc.set(
            cur.wordTagId,
            <WordTagView
              data-id={cur.wordTagId}
              data-color={cur.color}
              {...cur}
              wordTagId={`first-${cur.wordTagId}`}
            />
          ),
        new Map()
      )
    );
    setSecondBox(
      data?.data.reduce(
        (acc, cur) =>
          acc.set(
            cur.wordTagId,
            <WordTagView
              sx={[
                {
                  border: "1px dashed",
                  borderColor: cur.color,
                  height: "fit-content",
                },
                { "&>div": { opacity: 0 } },
              ]}
              data-id={cur.wordTagId}
              data-color={cur.color}
              {...cur}
              wordTagId={`second-${cur.wordTagId}`}
            />
          ),
        new Map()
      )
    );
  }, [data, isSuccess]);

  const firstBoxHandleClick = (e) => {
    let clickedElement = getClickedElement(e.target);

    const id = parseInt(clickedElement.getAttribute("data-id"), 10);
    const color = clickedElement.getAttribute("data-color");

    const wordTagEl = firstBox.get(id);

    const originalOptions = document
      .getElementById(`word-tag-first-${id}`)
      .getBoundingClientRect();

    const el = wordTagEl;

    flushSync(() => {
      setFirstBox(
        (map) =>
          new Map(
            map.set(
              id,
              <Box
                id={`word-tag-first-${id}`}
                sx={{
                  width: originalOptions.width,
                  height: originalOptions.height,
                  border: "1px dashed",
                  borderColor: color,
                }}
              />
            )
          )
      );
    });

    const currentChild = document.getElementById(`word-tag-second-${id}`);

    const targetOptions = currentChild.getBoundingClientRect();

    const animatedEl = (
      <MotionDiv
        style={{
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
          transitionEnd: {
            display: "none",
          },
        }}
        onAnimationComplete={() => {
          setSecondBox((map) => new Map(map.set(id, el)));

          gameBoardValues.current.push(id);

          setAnimatedEl((map) => new Map(map.set(id, null)));
        }}
      >
        {wordTagEl}
      </MotionDiv>
    );

    setAnimatedEl((map) => new Map(map.set(id, animatedEl)));
  };

  const secondBoxHandleClick = (e) => {
    const clickedElement = getClickedElement(e.target);

    const id = parseInt(clickedElement.getAttribute("data-id"), 10);
    const color = clickedElement.getAttribute("data-color");
    clickedElement.style.opacity = 0;

    const originalOptions = clickedElement.getBoundingClientRect();
    const targetOptions = document
      .getElementById(`word-tag-first-${id}`)
      .getBoundingClientRect();

    const currentEl = secondBox.get(id);

    flushSync(() => {
      setSecondBox(
        (map) =>
          new Map(
            map.set(
              id,
              <Box
                id={`word-tag-second-${id}`}
                sx={{
                  width: originalOptions.width,
                  height: originalOptions.height,
                  border: "1px dashed",
                  borderColor: color,
                }}
              />
            )
          )
      );
    });

    const animatedEl = (
      <MotionDiv
        style={{
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
        transition={{
          type: "spring",
          duration: 1,
        }}
        onAnimationComplete={() => {
          gameBoardValues.current = gameBoardValues.current.filter(
            (item) => item !== id
          );
          setFirstBox((map) => new Map(map.set(id, currentEl)));
          setAnimatedEl((map) => new Map(map.set(id, null)));
        }}
      >
        {currentEl}
      </MotionDiv>
    );

    setAnimatedEl((map) => new Map(map.set(id, animatedEl)));
  };

  const handleStart = async () => {
    await wordsState.refetch();

    setGameBoardTetrisRef(
      gameBoardTetrisRef.current,
      {
        display: "flex",
        justifyContent: "center",
        left: 0,
      },
      { duration: 0.5 }
    );

    rootRefAnimate(
      rootRef.current,
      { opacity: 0, transform: "translateX(-500px)" },
      { duration: 0.5 }
    );

    setTimeout(() => {
      rootRef.current.remove();
    }, 500);
  };

  return (
    <>
      <Stack
        ref={rootRef}
        sx={{ height: "100dvh", backgroundColor: "common.white", py: 1, px: 1 }}
      >
        {isLoading ? (
          <h3>Loading tags....</h3>
        ) : isError ? (
          <h3>Something went wrong</h3>
        ) : (
          <Stack direction="column" rowGap="20px">
            <Box onClick={firstBoxHandleClick} sx={styles.backlog}>
              {Array.from(firstBox.values())}
            </Box>

            <Box
              onClick={secondBoxHandleClick}
              id="word-tetris-board"
              sx={styles.backlog}
            >
              {Array.from(secondBox.values())}
            </Box>
          </Stack>
        )}

        <Button
          onClick={handleStart}
          size="large"
          sx={{ mt: "auto" }}
          variant="contained"
        >
          {wordsState.isLoading ? "Starting..." : "Start"}
        </Button>
      </Stack>

      <MotionDiv
        ref={gameBoardTetrisRef}
        style={{
          display: "none",
          position: "absolute",
          left: "101vw",
          width: "100vw",
          height: "100dvh",
        }}
      >
        {wordsState.isSuccess && (
          <Suspense fallback={<div />}>
            <FindWordGameBoard words={wordsState?.data?.data || []} />
          </Suspense>
        )}
      </MotionDiv>

      {Array.from(animatedEl.values()).map(
        (an) => an && createPortal(an, document.body)
      )}
    </>
  );
};

export default Exchange;
