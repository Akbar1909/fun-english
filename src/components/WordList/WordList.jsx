import { WordCard } from "../WordCard";
import MasonryList from "../MasonryList/MasonryList";

const WordList = ({ words = [] }) => {
  return (
    <MasonryList>
      {words.map((word) => (
        <WordCard key={word.wordId} {...word} />
      ))}
    </MasonryList>
  );
};

export default WordList;
