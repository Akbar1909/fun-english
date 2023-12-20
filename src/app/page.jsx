import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Box } from "@mui/material";
import ContributeButton from "./_components/ContributeButton";
import { fetchWords } from "@/actions/fetch-words";
import LoadMoreWordsClient from "@/components/LoadMoreWords/LoadMoreWords.client";
import getQueryClient from "./getQueryClient";

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["words"],
    queryFn: fetchWords,
    staleTime: Infinity,
  });

  return (
    <main className="h-full flex flex-col">
      <Box my={2} display="flex" justifyContent="flex-end">
        <ContributeButton />
      </Box>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <LoadMoreWordsClient />
      </HydrationBoundary>
    </main>
  );
}
