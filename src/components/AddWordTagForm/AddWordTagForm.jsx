"use client";
import { useState } from "react";
import { revalidateTag } from "next/cache";
import {
  TextField,
  Grid,
  Button,
  Box,
  Autocomplete,
  Select,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import {
  Slider,
  Sketch,
  Material,
  Colorful,
  Compact,
  Circle,
  Wheel,
  Block,
  Github,
  Chrome,
} from "@uiw/react-color";
import { httpPostWordTag } from "@/data/word-tag/word-tag.requests";
import revalidateWordTags from "@/app/server.actions";
import { useRouter } from "next/navigation";

const AddWordTagForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [openPicker, setOpenPicker] = useState(false);
  const { control, handleSubmit, watch, setValue, reset } = useForm({
    color: "",
  });

  const { mutate, status } = useMutation({
    mutationFn: httpPostWordTag,
    onSuccess: (response) => {
      router.refresh();
      queryClient.refetchQueries(["word-tags"]);
    },
  });

  const onSubmit = handleSubmit((values) => mutate(values));
  const color = watch("color");
  return (
    <form onSubmit={onSubmit}>
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
            name="tag"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField fullWidth size="small" label="Enter tag" {...field} />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="container" onClick={() => setOpenPicker(true)}>
              Pick Color
            </Typography>
            <Box
              sx={{
                backgroundColor: color || "common.white",
                width: 60,
                height: 60,
                borderRadius: "50%",
              }}
            ></Box>
          </Stack>
          {openPicker && (
            <Box sx={{ position: "absolute", zIndex: 2 }}>
              <Box
                sx={{
                  position: "fixed",
                  top: "0px",
                  right: "0px",
                  left: "0px",
                  bottom: "0px",
                }}
                onClick={() => setOpenPicker(false)}
              />
              <Chrome
                style={{ marginLeft: 20 }}
                color={color}
                onChange={(color) => {
                  setValue("color", color.hex);
                }}
              />
            </Box>
          )}
        </Grid>
        <Grid item xs={12} textAlign="right">
          <Button sx={{ mr: 1 }} onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddWordTagForm;
