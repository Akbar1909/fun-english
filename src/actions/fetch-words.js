import { DEFAULT_PAGE_SIZE } from "@/helpers/const";

export async function fetchWords(page = 0) {
  const size = DEFAULT_PAGE_SIZE;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/words?page=${page}&size=${size}`,
      {
        next: { revalidate: 4 },
      }
    );
    const { data } = await response.json();

    return data;
  } catch (e) {
    return null;
  }
}
