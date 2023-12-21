import { Box, Typography } from "@mui/material";

const styles = {
  root: {
    width: "180px",
    height: 70,
    py: "10px",
    borderRadius: "6px",
    color: "common.white",
    opacity: 0.8,
  },
  text: {},
  counter: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    width: "27px",
    height: "27px",
    borderRadius: "50%",
    fontWeight: "bold",
    backgroundColor: "common.black",
  },
};

const WordTagView = ({ tag, color, count }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      sx={[styles.root, { backgroundColor: color || "blue" }]}
    >
      <Typography variant="h3">{tag}</Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={styles.counter}
      >
        {count}
      </Box>
    </Box>
  );
};

export default WordTagView;
