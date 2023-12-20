import { Masonry } from "masonic";
import WordCard from "../WordCard/WordCard.server";

const MasonryList = ({ items = [] }) => {
  return (
    <Masonry
      // Provides the data for our grid items
      items={items}
      // Adds 8px of space between the grid cells
      columnGutter={8}
      // Sets the minimum column width to 172px
      columnWidth={300}
      // Pre-renders 5 windows worth of content
      overscanBy={5}
      // This is the grid item component
      render={({ data, index }) => {
        return (
          <WordCard
            key={index}
            index={index}
            mediaName={data?.media?.filename}
            {...data}
          />
        );
      }}
    />
  );
};

export default MasonryList;
