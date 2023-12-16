"use client";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  2100: 5,
  1700: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const MasonryList = ({ children }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {children}
    </Masonry>
  );
};

export default MasonryList;
