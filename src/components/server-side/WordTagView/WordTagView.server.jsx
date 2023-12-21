import { Box, Typography } from "@mui/material";

const styles = {
  root: {
    minWidth: "180px",
    height: 40,
    py: "10px",
    borderRadius: "6px",
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

const WordTagView = ({ tag, color, count }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      sx={[styles.root, { backgroundColor: color || "blue" }]}
    >
      <Typography variant="h3" sx={{ textTransform: "capitalize" }}>
        {tag} ({count})
      </Typography>
    </Box>
  );
};

export default WordTagView;
