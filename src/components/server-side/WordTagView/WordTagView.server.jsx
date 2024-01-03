import { Box, Typography } from "@mui/material";
import { forwardRef } from "react";
import WordTagViewWrapperClient from "./WordTagViewWrapper.client";

const styles = {
  root: {
    height: 40,
    py: "10px",
    px: "18px",
    borderRadius: "3px",
    color: "common.white",
  },
  text: {},
  counter: {
    bottom: "10px",
    right: "10px",
    width: "27px",
    height: "27px",
    borderRadius: "50%",
    fontWeight: "bold",
    backgroundColor: "common.black",
  },
};

// eslint-disable-next-line react/display-name
const WordTagView = forwardRef(
  ({ tag, color, count, sx, wordTagId, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        id={`word-tag-${wordTagId}`}
        {...rest}
        className="word-tag-view"
        position="relative"
        height="fit-content"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={[
          {
            border: "1px solid",
            borderColor: "transparent",
            cursor: "pointer",
          },
          styles.root,
          { backgroundColor: color || "blue" },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <WordTagViewWrapperClient>
          <Typography
            variant="h3"
            sx={{
              textTransform: "capitalize",
              fontWeight: 300,
              width: "max-content",
            }}
          >
            {tag} | {count}
          </Typography>
        </WordTagViewWrapperClient>
      </Box>
    );
  }
);

export default WordTagView;
