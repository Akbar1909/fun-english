import { Box, Typography } from "@mui/material";
import { forwardRef } from "react";

const styles = {
  root: {
    minWidth: "180px",
    height: 40,
    py: "10px",
    borderRadius: "3px",
    color: "common.white",
  },
  text: {},
  counter: {
    // position: "absolute",
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
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        sx={[
          styles.root,
          { backgroundColor: color || "blue" },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Typography variant="h3" sx={{ textTransform: "capitalize" }}>
          {tag} ({count})
        </Typography>
      </Box>
    );
  }
);

export default WordTagView;
