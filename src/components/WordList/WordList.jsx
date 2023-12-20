import MasonryList from "../MasonryList/MasonryList.client";
import WordCard from "../WordCard/WordCard.server";

const WordList = ({ words = [] }) => {
  return (
    <MasonryList>
      {words.map((word, i) => (
        <WordCard key={i} mediaName={word?.media?.filename} {...word} />
      ))}
    </MasonryList>
  );
};

export default WordList;
