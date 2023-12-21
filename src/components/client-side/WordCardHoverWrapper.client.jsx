import { useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import { MotionDiv } from "./MotionDiv";
import { useFixedFolderStore } from "@/clientStore/fixed-folder";

const styles = {
  root: {
    position: "relative",
    borderRadius: "12px",
  },
};

const variants = {
  clicked: {
    bottom: "200px",
  },
};

const WordCardHoverWrapper = ({ children, color }) => {
  const actionContainerRef = useRef(null);
  const rootRef = useRef(null);

  const { push, savedWordIds, incrementCount } = useFixedFolderStore();

  const handleSave = () => {
    const { bottom, right, x, y, width, height, top, left } =
      rootRef.current.getBoundingClientRect();

    console.log({ bottom, right, top, left, height });

    push({
      wordElement: (
        <MotionDiv
          variants={variants}
          style={{
            width: "240px",
            height: "240px",
            position: "fixed",
            bottom: window.innerHeight - bottom + height / 2,
            right: window.innerWidth - x - width,
            zIndex: 19 + savedWordIds.length,
            scale: 0.5,
            rotateY: 0,
          }}
          transition={5}
          drag
          animate={{
            bottom: "-40px",
            right: "-40px",
            scale: [0.5, 0.4, 0.4, 0.3, 0.2, 0.1, 0],
            rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
          }}
          onAnimationComplete={() => incrementCount()}
        >
          {children}
        </MotionDiv>
      ),
      wordId: 1,
    });
  };

  return (
    <>
      <MotionDiv
        ref={rootRef}
        onHoverStart={() =>
          (actionContainerRef.current.style.display = "block")
        }
        onHoverEnd={() => (actionContainerRef.current.style.display = "none")}
        whileHover={{ scale: 1.02, cursor: "pointer" }}
        sx={[styles.root]}
      >
        {children}

        <Box
          ref={actionContainerRef}
          sx={{
            position: "absolute",
            right: "10px",
            top: "27px",
            display: "none",
          }}
        >
          <Button
            onClick={handleSave}
            sx={{
              minWidth: "80px",
              py: "8px",
              backgroundColor: color,
              color: "colors.white",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: color,
                opacity: 0.7,
              },
            }}
          >
            Save
          </Button>
        </Box>
      </MotionDiv>
    </>
  );
};

export default WordCardHoverWrapper;
