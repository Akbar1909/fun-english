"use client";
import { useEffect, useState, useRef } from "react";
import { flushSync, createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Stack, Button } from "@mui/material";
import { httpGetWordTagsCount } from "@/data/word-tag/word-tag.requests";
import WordTagView from "../server-side/WordTagView/WordTagView.server";
import { MotionDiv } from "../client-side/MotionDiv";

const styles = {
  backlog: {
    width: "100%",
    border: "1px solid",
    p: 1,
    overflow: "auto",
  },
  wordTag: {
    px: "8px",
    flex: 1,
    minWidth: "120px",
    cursor: "pointer",
  },
};

const Exchange = () => {
  const firstBoxRef = useRef(null);
  const secondBoxRef = useRef(null);
  const [firstBox, setFirstBox] = useState(new Map());
  const [secondBox, setSecondBox] = useState(new Map());
  const [animatedEl, setAnimatedEl] = useState(null);

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
            <Box>
              <WordTagView
                data-id={cur.wordTagId}
                data-color={cur.color}
                sx={styles.wordTag}
                {...cur}
              />
            </Box>
          ),
        new Map()
      )
    );
  }, [data, isSuccess]);

  const handleClick = (e, type) => {
    let clickedElement = e.target;

    const receiverSetter = type === "first" ? setSecondBox : setFirstBox;
    const senderSetter = type === "first" ? setFirstBox : setSecondBox;
    const currentBox = type === "first" ? firstBox : secondBox;

    while (
      clickedElement &&
      !clickedElement.classList.contains("word-tag-view")
    ) {
      clickedElement = clickedElement.parentNode;
    }

    const id = parseInt(clickedElement.getAttribute("data-id"), 10);
    const color = clickedElement.getAttribute("data-color");

    const wordTagEl = currentBox.get(id);

    const oldClientRect = document
      .getElementById(`word-tag-${id}`)
      .getBoundingClientRect();

    const el = (
      <Box
        data-id={id}
        data-color={color}
        id={`word-tag-${id}`}
        style={{ opacity: 0 }}
      >
        {wordTagEl}
      </Box>
    );

    flushSync(() => {
      senderSetter(
        (map) =>
          new Map(
            map.set(
              id,
              <Box
                sx={{
                  width: oldClientRect.width,
                  height: oldClientRect.height,
                  border: "1px dashed",
                  borderColor: color,
                }}
              />
            )
          )
      );
      receiverSetter((map) => new Map(map.set(id, el)));
    });

    const currentChild = document.getElementById(`word-tag-${id}`);

    const newClientRect = currentChild.getBoundingClientRect();

    const animatedEl = (
      <MotionDiv
        style={{
          position: "fixed",
          left: `${oldClientRect.left}px`,
          top: `${oldClientRect.top}`,
          zIndex: 20,
          width: `${oldClientRect.width}px`,
          height: `${oldClientRect.height}px`,
        }}
        animate={{
          left: `${newClientRect.left}px`,
          top: `${newClientRect.top}px`,
        }}
        onAnimationComplete={() => {
          const el = document.getElementById(`word-tag-${id}`);

          el.style.opacity = 1;

          setAnimatedEl(null);
        }}
      >
        {wordTagEl}
      </MotionDiv>
    );

    setAnimatedEl(animatedEl);
  };

  return (
    <>
      <Stack
        sx={{ height: "100vh", backgroundColor: "common.white", py: 1, px: 1 }}
      >
        {isLoading ? (
          <h3>Laoding tags....</h3>
        ) : isError ? (
          <h3>Something went wrong</h3>
        ) : (
          <Stack direction="column" rowGap="20px">
            <Box
              ref={firstBoxRef}
              onClick={(e) => handleClick(e, "first")}
              display="flex"
              flexDirection="row"
              gap="10px"
              flexWrap="wrap"
              sx={[styles.backlog, { height: "45vh" }]}
            >
              {Array.from(firstBox.values())}
            </Box>

            <Box
              ref={secondBoxRef}
              onClick={(e) => handleClick(e, "second")}
              id="word-tetris-board"
              display="flex"
              flexDirection="row"
              gap="10px"
              flexWrap="wrap"
              sx={[styles.backlog, { height: "45vh" }]}
            >
              {Array.from(secondBox.values())}
            </Box>
          </Stack>
        )}

        <Button size="large" sx={{ mt: "auto" }} variant="contained">
          Start Game
        </Button>
      </Stack>

      {animatedEl && createPortal(animatedEl, document.body)}
    </>
  );
};

export default Exchange;
