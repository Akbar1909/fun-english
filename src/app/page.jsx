import { Suspense } from "react";
import { Box } from "@mui/material";
import { WordList } from "@/components/WordList";
import ContributeButton from "./_components/ContributeButton";

async function getWords() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/words`, {
    next: { revalidate: 4 },
  });

  const { data } = await response.json();

  return data;
}

export default async function Home() {
  const words = await getWords();

  return (
    <main className="h-full flex flex-col">
      <Box my={2} display="flex" justifyContent="flex-end">
        <ContributeButton />
      </Box>
      <Suspense fallback={<h2>loading...</h2>}>
        <WordList words={words} />
      </Suspense>
    </main>
  );
}
