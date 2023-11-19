import { WordCard } from "../WordCard";
import { MasonryList } from "../MasonryList";

const WordList = ({ words = [] }) => {
  return (
    <MasonryList>
      {words.map((word) => (
        <WordCard
          mediaId={2}
          key={word.wordId}
          mediaName={word?.media?.filename}
          {...word}
        />
      ))}
    </MasonryList>
  );
};

export default WordList;
