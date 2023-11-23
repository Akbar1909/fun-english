"use client";
import { WordCard } from "../WordCard";

const PreviewWordCard = ({ mediaId, mediaName, ...props }) => {
  return <WordCard {...props} mediaName={mediaName} />;
};

export default PreviewWordCard;
