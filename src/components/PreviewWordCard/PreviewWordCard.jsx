"use client";
import { Box } from "@mui/material";
import WordCard from "../WordCard/WordCard.server";

const PreviewWordCard = ({ mediaId, mediaName, ...props }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        left: "50%",
        width: "300px",
        transform: "translateX(-50%)",
      }}
    >
      <WordCard index={0} preview {...props} mediaName={mediaName} />
    </Box>
  );
};

export default PreviewWordCard;
