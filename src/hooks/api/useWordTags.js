import { httpGetWordTags } from "@/data/word-tag/word-tag.requests";
import { useQuery } from "@tanstack/react-query";
const useWordTags = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["word-tags"],
    queryFn: httpGetWordTags,
    select: (response) => response.data?.data,
  });

  const options = (Array.isArray(data) ? data : []).map((wordTag) => ({
    label: wordTag.tag,
    value: wordTag.wordTagId,
    ...wordTag,
  }));

  return {
    ...rest,
    options,
  };
};

export default useWordTags;
