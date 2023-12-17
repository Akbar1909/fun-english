"use client";
import React, { useState, useRef } from "react";
import { Button, Stack, Box, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./MyCropper.css";
import { httpPostDataUrl } from "@/data/upload";
import notification from "@/services/notification";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const MyCropper = ({ image, setImage, setMediaId }) => {
  const cropperRef = useRef(null);
  const [externalUrl, setExternalUrl] = useState("");

  const dataUrlMutate = useMutation({
    mutationFn: httpPostDataUrl,
    onSuccess: () => {
      notification.setMode("success").setMessage("Save successfully").pop();
    },
    onError: () => {
      notification.setMode("error").setMessage("Note Saved").pop();
    },
  });

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

  const getCropData = async () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const response = await dataUrlMutate.mutateAsync(
        cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
      );

      setMediaId(response.data?.data?.mediaId);
    }
  };

  return (
    <Stack direction="column" rowGap={"16px"} style={{ width: "100%" }}>
      <Box>
        <TextField
          sx={{ width: "100%" }}
          label="External url"
          size="small"
          onChange={(e) => setImage(e.target.value)}
          value={typeof image === "string" ? image : ""}
        />
      </Box>
      <Box>
        <TextField type="file" onChange={onChange} />
      </Box>

      <Cropper
        ref={cropperRef}
        style={{ height: 400, width: "100%" }}
        zoomTo={0.5}
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

      <Button onClick={getCropData} variant="contained">
        {dataUrlMutate.isPending ? "Saving Photo..." : "Save Photo"}
      </Button>
    </Stack>
  );
};

export default MyCropper;
