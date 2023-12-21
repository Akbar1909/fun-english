"use client";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { fetchWords } from "@/actions/fetch-words";
import MasonryList from "../MasonryList/MasonryList.client";
import { useCallback, useEffect } from "react";
import InfinitySpinner from "../InfinitySpinner";
import useInfinityScroll from "@/hooks/useInfinityScroll";

function LoadMore() {
  const { page, size, appendToList, setPage } = useInfinityScroll();
  const { ref, inView } = useInView({ initialInView: false });

  const { data, isFetching, error } = useQuery({
    queryKey: ["words", { page }],
    queryFn: async () => await fetchWords(page),
  });

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
  }, [setPage, page]);

  useEffect(() => {
    if (inView) {
      console.log("view");
    }
  }, [inView, loadMore]);

  if (error) {
    return <Box>Something went wrong 🥺, We are working on it🚀</Box>;
  }

  return (
    <Box>
      <MasonryList items={data?.records || []} />
      {isFetching && <InfinitySpinner />}
      <Box ref={ref} />
    </Box>
  );
}

export default LoadMore;
