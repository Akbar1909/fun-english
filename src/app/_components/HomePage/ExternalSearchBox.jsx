"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchInput from "@/components/SearchInput/SearchInput";
import { Grid, Typography } from "@mui/material";
import { useDebounce } from "react-use";
import { httpGetWordFromExternalDictionary } from "@/data/externalDictionary/externalDictionary.requests";
import WordInfoWidget from "@/components/WordInfoWidget/WordInfoWidget";

const ExternalSearchBox = () => {
  const [search, setSearch] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(search || "");

  const [, _] = useDebounce(
    () => {
      setDebouncedValue(search);
    },
    1000,
    [search]
  );

  const state = useQuery({
    queryFn: () => httpGetWordFromExternalDictionary(debouncedValue),
    queryKey: ["external-word", debouncedValue],
    select: (response) => response.data,
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
            setSearch(e.target.value);
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
          <Typography variant="h1">Loading ({search})...🏎️</Typography>
        ) : state.isError ? (
          <Typography variant="h1">No words 📭</Typography>
        ) : state.isSuccess ? (
          <WordInfoWidget add uploadImage {...(state.data?.[0] || {})} />
        ) : (
          <Typography variant="h1">Try</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default ExternalSearchBox;
