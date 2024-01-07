"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchInput from "@/components/SearchInput/SearchInput";
import { Grid, Typography } from "@mui/material";
import { useDebounce } from "react-use";
import { httpGetWordsByWord } from "@/data/word/word.request";
import WordMeanWidget from "@/components/WordInfoWidget/WordMeanWidget";

const WordWidget = () => {};

const InternalSearchBox = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const search = searchParams.get("isearch");
  const [debouncedValue, setDebouncedValue] = useState(search || "");

  const [, _] = useDebounce(
    () => {
      setDebouncedValue(search);
    },
    1000,
    [search]
  );

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const state = useQuery({
    queryFn: () => httpGetWordsByWord({ word: debouncedValue }),
    queryKey: ["internal-word", debouncedValue],
    select: (response) => response.data?.data,
    enabled: Boolean(debouncedValue) && debouncedValue.length > 0,
    retry: 0,
  });

  return (
    <Grid container rowSpacing={4}>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <SearchInput
          value={search}
          onChange={(e) => {
            router.push(
              pathname + "?" + createQueryString("isearch", e.target.value)
            );
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        {state.isLoading ? (
          <Typography variant="h1">Loading ({search})...🥱</Typography>
        ) : state.isError ? (
          <Typography variant="h1">No words 📭</Typography>
        ) : state.isSuccess ? (
          state.data.map((item, i) => (
            <WordMeanWidget
              key={i}
              definitions={[
                {
                  definition: item.definition,
                  example: item.example,
                  images: item.images,
                },
              ]}
              partOfSpeech={item.partOfSpeech}
              internal
            />
          ))
        ) : (
          <Typography variant="h1">Try</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default InternalSearchBox;
