import { Suspense } from "react";
import { WordList } from "@/components/WordList";

async function getWords() {
  const response = await fetch(`${process.env.BASE_URL}/api/v1/words`, {
    next: { revalidate: 4 },
  });
  const { data } = await response.json();
  return data;
}

export default async function Home() {
  const words = await getWords();

  return (
    <main className="h-full flex flex-col">
      <header className="py-5 px-3 bg-primary-main">
        <div className="text-5xl">🚀</div>
      </header>
      <section className="px-3  mt-10 flex-1 overflow-auto">
        <Suspense fallback={<h2>loading...</h2>}>
          <WordList words={words} />
        </Suspense>
      </section>
      <footer className="px-3">Footer</footer>
    </main>
  );
}
