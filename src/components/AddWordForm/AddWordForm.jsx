"use client";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  TextField,
  Grid,
  Button,
  Box,
  Autocomplete,
  Alert,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import MyEditor from "@/components/MyEditor";
import { PreviewWordCard } from "@/components/PreviewWordCard";
import MyFileUploader from "@/components/MyFileUploader";
import { EditorState } from "draft-js";
import { formatRichTextForApi } from "@/helpers/richText";
import { httpPostWord } from "@/data/word/word.request";
import useWordTags from "@/hooks/api/useWordTags";
import { WORD_LEVELS, prepareWordDto } from "@/data/word/word.provider";
import { scrollToTop } from "@/helpers/window";

const AddWordForm = () => {
  const { register, control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      photos: [],
      example: EditorState.createEmpty(),
      description: EditorState.createEmpty(),
    },
  });

  const { mutate, status } = useMutation({
    mutationFn: httpPostWord,
    onSettled: scrollToTop,
  });

  const wordTagsServerState = useWordTags();

  const { remove, append } = useFieldArray({ name: "photos", control });

  const photos = watch("photos");
  const word = watch("word");
  const description = watch("description");
  const example = watch("example");
  const wordTag = watch("wordTag");

  const selectedTag = wordTagsServerState.options.find(
    (option) => option.wordTagId === wordTag?.value
  );

  const onSubmit = handleSubmit((values) => {
    mutate(prepareWordDto(values));
  });
  const handleCancel = () => reset();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={onSubmit}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  {status === "success" && (
                    <Alert severity="success" sx={{ mb: 1.5 }}>
                      Added
                    </Alert>
                  )}
                  {status === "error" && (
                    <Alert severity="error" sx={{ mb: 1.5 }}>
                      Something went wrong
                    </Alert>
                  )}

                  <Controller
                    name="word"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        size="small"
                        label="Enter word"
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="wordTag"
                    defaultValue=""
                    render={({ field }) => (
                      <Autocomplete
                        freeSolo
                        disableClearable
                        options={wordTagsServerState.options}
                        {...field}
                        onChange={(e, value) => field.onChange(value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Word Tag"
                            InputProps={{
                              ...params.InputProps,
                            }}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="wordLevel"
                    defaultValue=""
                    render={({ field }) => (
                      <Autocomplete
                        freeSolo
                        disableClearable
                        options={WORD_LEVELS}
                        {...field}
                        onChange={(e, value) => field.onChange(value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Word Level"
                            InputProps={{
                              ...params.InputProps,
                            }}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <MyEditor
                        placeholder={"Enter description..."}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="photos"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <MyFileUploader
                        {...field}
                        remove={remove}
                        append={append}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="example"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <MyEditor placeholder={"Enter example..."} {...field} />
                    )}
                  />
                </Grid>
                <Grid item xs={12} textAlign="right">
                  <Button sx={{ mr: 1 }} onClick={handleCancel}>
                    Reset
                  </Button>
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <PreviewWordCard
                description={formatRichTextForApi(description)}
                example={formatRichTextForApi(example)}
                wordTag={{
                  tag: selectedTag?.label || "",
                  color: selectedTag?.color,
                }}
                mediaId={photos?.[0]?.mediaId}
                mediaName={photos?.[0]?.filename}
                word={word}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default AddWordForm;
