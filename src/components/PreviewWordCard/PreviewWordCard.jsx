"use client";
import { Box, Typography, Skeleton } from "@mui/material";
import { WordCard } from "../WordCard";
import usePreviewPhoto from "@/hooks/usePreviePhoto";

const PreviewWordCard = ({ mediaId, ...props }) => {
  const { previewFileUrl } = usePreviewPhoto(mediaId);

  return <WordCard {...props} photoUrl={previewFileUrl} />;
};

export default PreviewWordCard;
