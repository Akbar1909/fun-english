"use client";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { fetchWords } from "@/actions/fetch-words";
import MasonryList from "../MasonryList/MasonryList.client";
import { useEffect } from "react";
import InfinitySpinner from "../InfinitySpinner";

function LoadMore() {
  const { ref, inView } = useInView({ initialInView: false });

  const { data, isFetching, error } = useQuery({
    queryKey: ["words"],
    queryFn: async () => await fetchWords(0),
  });

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
