"use client";
import { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { httpPostWord } from "@/data/word/word.request";
import notification from "@/services/notification";
import { httpPostUpload } from "@/data/upload";

const initialState = {
  0: {
    definition: "",
    partOfSpeech: "",
    examples: { 0: { text: "", mediaId: null } },
  },
};

const WordForm = () => {
  const [word, setWord] = useState("");
  const [values, setValues] = useState(initialState);

  const uploadMutate = useMutation({
    mutationFn: httpPostUpload,
    mutationKey: "upload",
    onSuccess: () =>
      notification.setMessage("Uploaded 🥳🥳🥳").setMode("success").pop(),
    onError: () => notification.setMessage("Something went wrong 🥲🥶🥺"),
  });

  const createMutation = useMutation({
    mutationKey: ["create", word],
    mutationFn: httpPostWord,
    onSuccess: () => {
      notification.setMessage("Created 🥳🥳🥳").setMode("success").pop();

      setValues(initialState);
      setWord("");
    },
    onError: () => notification.setMessage("Something went wrong 🥲🥶🥺"),
  });

  const create = () => {
    const preparedData = {
      word,
      definitions: Object.values(values).map(
        ({ definition, partOfSpeech, examples }) => ({
          definition,
          partOfSpeech,
          examples: Object.values(examples),
        })
      ),
    };

    createMutation.mutate({ words: [preparedData] });
  };

  return (
    <Grid container rowSpacing="20px">
      <Grid item xs={12}>
        <TextField
          fullWidth
          size="small"
          value={word}
          placeholder="Enter word"
          onChange={(e) => setWord(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        {Object.values(values).map(
          ({ definition, partOfSpeech, examples }, i) => (
            <Box key={i}>
              <Stack direction="row" columnGap={1} alignItems="center">
                <TextField
                  sx={{ flex: 3 }}
                  name={`definition.${i}`}
                  value={definition}
                  size="small"
                  required
                  placeholder="Enter definition"
                  onChange={(e) => {
                    setValues((prev) => ({
                      ...prev,
                      [i]: { ...prev[i], definition: e.target.value },
                    }));
                  }}
                />
              </Stack>
              <Stack mt={1}>
                <TextField
                  sx={{ flex: 1 }}
                  name={`partOfSpeech.${i}`}
                  value={partOfSpeech}
                  placeholder="Enter partOfSpeech"
                  size="small"
                  onChange={(e) => {
                    setValues((prev) => ({
                      ...prev,
                      [i]: { ...prev[i], partOfSpeech: e.target.value },
                    }));
                  }}
                />
              </Stack>
              <Stack mt={1}>
                {Object.values(examples).map(({ text }, j) => (
                  <Stack direction="row" width="100%" key={j}>
                    <TextField
                      fullWidth
                      required
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          [i]: {
                            ...prev[i],
                            examples: {
                              ...prev[i].examples,
                              [j]: {
                                ...prev[i].examples[j],
                                text: e.target.value,
                              },
                            },
                          },
                        }))
                      }
                      value={text}
                      placeholder="Enter example"
                      size="small"
                    />
                    {/* <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        const formData = new FormData();
                        formData.append("file", file);
                        const response = await uploadMutate.mutateAsync(
                          formData
                        );

                        setValues((prev) => ({
                          ...prev,
                          [i]: {
                            ...prev[i],
                            examples: {
                              ...prev[i].examples,
                              [j]: {
                                ...prev[i].examples[j],
                                mediaId: [response?.data?.data?.mediaId],
                              },
                            },
                          },
                        }));
                      }}
                    /> */}
                    <Stack direction="row">
                      <IconButton>
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          onClick={() =>
                            setValues((prev) => {
                              const { [j]: a, ...rest } = prev[i].examples;

                              if (j === 0) {
                                return;
                              }

                              return {
                                ...prev,
                                [i]: {
                                  ...prev[i],
                                  examples: rest,
                                },
                              };
                            })
                          }
                        />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          setValues((prev) => ({
                            ...prev,
                            [i]: {
                              ...prev[i],
                              examples: {
                                ...prev[i].examples,
                                [Object.values(prev[i].examples).length]: {
                                  text: "",
                                },
                              },
                            },
                          }))
                        }
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </IconButton>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Box>
          )
        )}
        <Button
          sx={{ width: "100%", mt: 2, py: 2.5, fontSize: "28px" }}
          variant="contained"
          onClick={create}
        >
          {createMutation.isPending ? "Saving..." : "Save"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default WordForm;
