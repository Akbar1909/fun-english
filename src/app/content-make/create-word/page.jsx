"use client";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { TextField, Grid, Button, Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import MyEditor from "@/components/MyEditor";
import { PreviewWordCard } from "@/components/PreviewWordCard";
import MyFileUploader from "@/components/MyFileUploader";
import { EditorState } from "draft-js";
import { formatRichTextForApi } from "@/helpers/richText";
import { httpPostWord } from "@/data/word/word.request";

const CreateWordPage = () => {
  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: { photos: [], example: EditorState.createEmpty() },
  });

  const {} = useMutation({
    mutationFn: httpPostWord,
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { remove, append } = useFieldArray({ name: "photos", control });

  const photos = watch("photos");
  const word = watch("word");
  const description = watch("description");
  const example = watch("example");

  const onSubmit = handleSubmit((values) => console.log(values));

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={onSubmit}>
        <Grid container columnSpacing={2} maxWidth={"1200px"}>
          <Grid item xs={12} md={6}>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Enter word"
                  {...register("word")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Enter description"
                  {...register("description")}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="photos"
                  control={control}
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
                  control={control}
                  render={({ field }) => (
                    <MyEditor placeholder={"Enter example..."} {...field} />
                  )}
                />
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12} textAlign="right">
                <Button type="submit" variant="contained">
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <PreviewWordCard
              description={description}
              example={formatRichTextForApi(example)}
              wordTag={{ tag: "Tag" }}
              mediaId={photos?.[0]?.mediaId}
              word={word}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateWordPage;
