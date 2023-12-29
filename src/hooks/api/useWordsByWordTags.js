import { httpGetMWordByMWordTag } from "@/data/word/word.request";
import { useQuery } from "@tanstack/react-query";

const useWordsByWordTags = (wordTag) => {
  return useQuery({
    queryKey: ["words-by-word-tag", wordTag],
    enabled: false,
    queryFn: () => httpGetMWordByMWordTag({ wordTag }),
    select: (res) => res.data,
  });
};

export default useWordsByWordTags;
