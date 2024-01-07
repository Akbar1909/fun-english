import { Grid, Box } from "@mui/material";
import WordMeanWidget from "./WordMeanWidget";

const WordInfoWidget = ({
  license = {},
  meanings = [],
  phonetic = "",
  phonetics = [],
  sourceUrls = [],
  word = "",
  uploadImage,
  add,
}) => {
  return (
    <>
      {meanings.map((mean, id) => (
        <WordMeanWidget
          add
          word={word}
          uploadImage={uploadImage}
          {...mean}
          key={id}
        />
      ))}
    </>
  );
};

export default WordInfoWidget;
