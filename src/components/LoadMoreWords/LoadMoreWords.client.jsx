"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { fetchWords } from "@/actions/fetch-words";
import MasonryList from "../MasonryList/MasonryList.client";
import WordCard from "../WordCard/WordCard.server";
import { useEffect } from "react";
import InfinitySpinner from "../InfinitySpinner";

function LoadMore() {
  const { ref, inView } = useInView({ initialInView: false });

  const { data, isFetching, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ["words"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetchWords(pageParam);
      return res;
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => {
      return firstPage?.prev;
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.next ?? undefined;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const items =
    data?.pages?.reduce((acc, cur) => [...acc, ...cur.records], []) || [];

  if (error) {
    return <Box>Something went wrong 🥺, We are working on it🚀</Box>;
  }

  return (
    <Box onScroll={(e) => console.log(e)}>
      <MasonryList items={items} Item={WordCard} />
      {isFetching && <InfinitySpinner />}
      <Box ref={ref}></Box>
    </Box>
  );
}

export default LoadMore;
