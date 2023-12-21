"use client";
import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Grid,
  Button,
  Box,
  Autocomplete,
  Alert,
  FormLabel,
  Stack,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import MyEditor from "@/components/MyEditor";
import { PreviewWordCard } from "@/components/PreviewWordCard";
import { EditorState } from "draft-js";
import { formatRichTextForApi } from "@/helpers/richText";
import { httpPostWord } from "@/data/word/word.request";
import useWordTags from "@/hooks/api/useWordTags";
import { WORD_LEVELS, prepareWordDto } from "@/data/word/word.provider";
import { scrollToTop } from "@/helpers/window";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom } from "@fortawesome/free-solid-svg-icons";
import MyCropper from "../MyCropper";

const PART_OF_SPEECH_OPTIONS = [
  {
    label: "noun",
    value: "noun",
  },
  {
    label: "verb",
    value: "verb",
  },
  {
    label: "adjective",
    value: "adjective",
  },
  {
    label: "adverb",
    value: "adverb",
  },
];

const AddWordForm = () => {
  const cropperRef = useRef(null);
  const { control, handleSubmit, watch, reset, setValue, register } = useForm({
    defaultValues: {
      photos: [],
      example: EditorState.createEmpty(),
      description: EditorState.createEmpty(),
    },
  });

  const { status, isPending, mutateAsync } = useMutation({
    mutationFn: httpPostWord,
    onSettled: scrollToTop,
  });

  const wordTagsServerState = useWordTags();

  const word = watch("word");
  const description = watch("description");
  const example = watch("example");
  const wordTag = watch("wordTag");
  const externalMedia = watch("externalMedia");

  const selectedTag = wordTagsServerState.options.find(
    (option) => option.wordTagId === wordTag?.value
  );

  const onSubmit = handleSubmit(async (values) => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const dataUrl = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();

      const { externalMedia, ...rest } = values;

      const response = await mutateAsync(prepareWordDto({ ...rest, dataUrl }));

    }
  });
  const handleCancel = () => {
    reset();
    setValue("externalMedia", null);
    cropperRef.current.cropper.destroy();
  };

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
                    name="partOfSpeech"
                    defaultValue=""
                    render={({ field }) => (
                      <Autocomplete
                        freeSolo
                        disableClearable
                        options={PART_OF_SPEECH_OPTIONS}
                        {...field}
                        onChange={(e, value) => field.onChange(value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Part of speech"
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
                  <FormLabel>Enter description</FormLabel>
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
                  <FormLabel>Enter example</FormLabel>
                  <Controller
                    name="example"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <MyEditor placeholder={"Enter example..."} {...field} />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MyCropper
                    register={register}
                    ref={cropperRef}
                    image={externalMedia}
                    setImage={(value) => setValue("externalMedia", value)}
                  />
                </Grid>

                <Grid item xs={12} textAlign="right">
                  <Stack direction="column">
                    <Button
                      sx={{ width: "100%", mb: 1 }}
                      type="submit"
                      variant="contained"
                      disabled={isPending}
                    >
                      {isPending ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      sx={{ mr: 1, width: "100%" }}
                      startIcon={<FontAwesomeIcon icon={faBroom} />}
                      onClick={handleCancel}
                      color="error"
                      variant="outlined"
                    >
                      Reset
                    </Button>
                  </Stack>
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
