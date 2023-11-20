"use client";
import { Box, Typography, Skeleton } from "@mui/material";
import { WordCard } from "../WordCard";
import usePreviewPhoto from "@/hooks/usePreviePhoto";

const PreviewWordCard = ({ mediaId, mediaName, ...props }) => {
  return <WordCard {...props} mediaName={mediaName} />;
};

export default PreviewWordCard;
