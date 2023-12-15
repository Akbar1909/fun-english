"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateWordTags() {
  revalidateTag(["word-tags"]);
}
