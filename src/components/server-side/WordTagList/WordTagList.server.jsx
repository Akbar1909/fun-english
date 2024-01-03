import { Stack } from "@mui/material";
import WordTagView from "../WordTagView/WordTagView.server";

export async function fetchWordTagsCount() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/words/count`,
      {
        next: { revalidate: 4 },
      }
    );
    const { data } = await response.json();

    return data;
  } catch (e) {
    return null;
  }
}

const WordTagList = async () => {
  const tags = await fetchWordTagsCount();

  return (
    <Stack overflow="scroll" direction="row" columnGap="8px">
      {tags.map((tag) => (
        <WordTagView key={tag.wordTagId} {...tag} />
      ))}
    </Stack>
  );
};

export default WordTagList;
