import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import ContributeButton from "./_components/ContributeButton";
import { fetchWords } from "@/actions/fetch-words";
import LoadMoreWordsClient from "@/components/LoadMoreWords/LoadMoreWords.client";
import { FIRST_PAGE_SIZE } from "@/helpers/const";
import WordTagList from "@/components/server-side/WordTagList/WordTagList.server";
import { Suspense } from "react";
import { useSession } from "next-auth/react";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["words", { page: 0, size: FIRST_PAGE_SIZE }],
    queryFn: fetchWords,
    staleTime: Infinity,
  });

  return (
    <main className="h-full flex flex-col">
      <Box my={2} display="flex" justifyContent="flex-end">
        <ContributeButton />
      </Box>

      <Typography mb={1} variant="h2">
        Tags
      </Typography>
      <Suspense fallback={<h3>Getting tags</h3>}>
        <Box mb={2}>
          <WordTagList />
        </Box>
      </Suspense>

      <Typography mb={1} variant="h2">
        Created by me
      </Typography>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <LoadMoreWordsClient />
      </HydrationBoundary>
    </main>
  );
}
