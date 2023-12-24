"use client";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { fetchWords } from "@/actions/fetch-words";
import MasonryList from "../MasonryList/MasonryList.client";
import { useCallback, useEffect } from "react";
import InfinitySpinner from "../InfinitySpinner";
import useInfinityScroll from "@/hooks/useInfinityScroll";
import { FIRST_PAGE_SIZE, NEXT_PAGE_SIZE } from "@/helpers/const";

function LoadMore() {
  const { page, array, appendToList, setPage } = useInfinityScroll();
  const { ref, inView } = useInView({ initialInView: false });

  const size = page === 0 ? FIRST_PAGE_SIZE : NEXT_PAGE_SIZE;

  const { data, isFetching, error } = useQuery({
    queryKey: ["words", { page, size }],
    queryFn: async () => await fetchWords(page, size),
  });

  useEffect(() => {
    if (isFetching && page !== 0) {
      return;
    }

    appendToList(data?.records || [], "wordId");
  }, [data, isFetching, page]);

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
  }, [setPage, page]);

  useEffect(() => {
    if (inView && data?.next && !isFetching) {
      loadMore();
    }
  }, [inView, loadMore, data?.next, isFetching]);

  if (error) {
    return <Box>Something went wrong 🥺, We are working on it🚀</Box>;
  }

  return (
    <Box>
      <MasonryList items={array || []} />
      <InfinitySpinner isFetching={isFetching} />
      <Box ref={ref} />
    </Box>
  );
}

export default LoadMore;
