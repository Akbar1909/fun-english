"use client";
import React, { forwardRef } from "react";
import { Stack, Box, TextField, Button } from "@mui/material";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./MyCropper.css";

export const MyCropper = ({ image, setImage, register }, ref) => {
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(files[0]);
  };

  return (
    <Stack direction="column" rowGap={"16px"} style={{ width: "100%" }}>
      <Box>
        <TextField
          sx={{ width: "100%" }}
          label="External url"
          size="small"
          onChange={(e) => {
            setImage(e.target.value);
          }}
          value={typeof image === "string" ? image : ""}
        />
      </Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <TextField type="file" {...register("file")} onChange={onChange} />
        {image && (
          <Button onClick={() => ref.current.cropper.reset()}>
            Reset The image
          </Button>
        )}
      </Stack>

      <Cropper
        ref={ref}
        style={{ height: 400, width: "100%" }}
        zoomTo={0.3}
        initialAspectRatio={1}
        preview=".img-preview"
        src={image}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
        guides={true}
      />
    </Stack>
  );
};

export default forwardRef(MyCropper);
