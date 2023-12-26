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
  },
};

const Exchange = () => {
  const clickedElRef = useRef(null);
  const firstBoxRef = useRef(null);
  const secondBoxRef = useRef(null);
  const [firstBox, setFirstBox] = useState({});
  const [secondBox, setSecondBox] = useState({});
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
      data?.data.reduce((acc, cur) => ({ ...acc, [cur.wordTagId]: cur }), {})
    );
  }, [data, isSuccess]);

  console.log(secondBox);

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
              onClick={(e) => {
                let clickedElement = e.target;

                while (
                  clickedElement &&
                  !clickedElement.classList.contains("word-tag-view")
                ) {
                  clickedElement = clickedElement.parentNode;
                }

                const id = clickedElement.getAttribute("data-id");

                const wordTag = firstBox[id];

                const wordTagEl = (
                  <WordTagView data-id={id} sx={styles.wordTag} {...wordTag} />
                );

                const oldClientRect = document
                  .getElementById(`word-tag-${id}`)
                  .getBoundingClientRect();

                const el = (
                  <div id={`clicked-${id}`} style={{ opacity: 0 }}>
                    {wordTagEl}
                  </div>
                );
                clickedElRef.current = el;

                flushSync(() => {
                  setFirstBox((prev) => ({ ...prev, [id]: null }));
                  setSecondBox((prev) => ({
                    ...prev,
                    [id]: el,
                  }));
                });

                const lastChild = secondBoxRef.current.lastChild;

                const newClientRect = lastChild.getBoundingClientRect();

                const animatedEl = (
                  <MotionDiv
                    style={{
                      position: "fixed",
                      right: `${oldClientRect.right}px`,
                      top: `${oldClientRect.top}`,
                      zIndex: 20,
                      width: `${oldClientRect.width}px`,
                      height: `${oldClientRect.height}px`,
                    }}
                    animate={{
                      top: `${newClientRect.top}px`,
                      left: `${newClientRect.left}px`,
                    }}
                    onAnimationComplete={() => {
                      document.getElementById(
                        `clicked-${id}`
                      ).style.opacity = 1;

                      setAnimatedEl(null);
                    }}
                  >
                    {wordTagEl}
                  </MotionDiv>
                );

                setAnimatedEl(animatedEl);
              }}
              display="flex"
              flexDirection="row"
              gap="10px"
              flexWrap="wrap"
              sx={[styles.backlog, { height: "45vh" }]}
            >
              {Object.values(firstBox)
                .filter((wordTag) => wordTag)
                .map((wordTag, i) => (
                  <Box key={i}>
                    <WordTagView
                      data-id={wordTag.wordTagId}
                      sx={styles.wordTag}
                      {...wordTag}
                    />
                  </Box>
                ))}
            </Box>

            <Box
              ref={secondBoxRef}
              id="word-tetris-board"
              display="flex"
              flexDirection="row"
              gap="10px"
              flexWrap="wrap"
              sx={[styles.backlog, { height: "45vh" }]}
            >
              {Object.values(secondBox)}
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
