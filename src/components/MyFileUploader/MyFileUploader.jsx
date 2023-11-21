/* eslint-disable no-debugger */
"use client";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import get from "lodash.get";
import { httpDeleteFile, httpGetFile, httpPostUpload } from "@/data/upload";
import { FileUploader } from "react-drag-drop-files";
import styles from "./MyFileUploader.styles";
import { globalStyles } from "@/providers/ThemeProvider/globalStyles";
import notification from "@/services/notification";
import ImagePreview from "./ImagePreview";

const isFile = (evt) => {
  const dt = evt.dataTransfer;

  for (let i = 0; i < dt.types.length; i++) {
    if (dt.types[i] === "Files") {
      return true;
    }
  }
  return false;
};

const createOverlay = () => {
  const overlay = document.createElement("div");
  const text = document.createElement("p");

  text.textContent = "Drop Anywhere" + "!";

  overlay.append(text);
  overlay.setAttribute("id", "overlay");
  overlay.classList.add("overlay");

  return overlay;
};

const openLayer = () => {
  const div = document.getElementById("overlay");
  div.classList.add("overlay-in");
};

const removeLayer = () => {
  const div = document.getElementById("overlay");
  div.classList.remove("overlay-in");
};

const MyFileUploader = ({
  value,
  onChange,
  multiple = true,
  remove,
  append,
  readOnly = false,
  ...props
}) => {
  const lastTargetRef = useRef(null);
  const [files, setFiles] = useState(() => value);

  const mutate = useMutation({
    mutationFn: httpPostUpload,
    onSuccess: ({ data: { data } }) => {
      setFiles((prev) => [...prev, data]);
      append(data);
    },
    onError: (error) => {
      notification
        .setMessage(
          get(error, "response.data.error.message"),
          "Unexpected server error"
        )
        .setMode("error")
        .pop();
    },
  });

  const deleteMutate = useMutation({
    mutationFn: httpDeleteFile,
    onSuccess: () => {
      notification.setMode("success").setMessage("Deleted successfully").pop();
    },
    onError: () => {
      notification.setMode("error").setMessage("Deleted unsuccessfully").pop();
    },
  });

  const handleDeleteFile = async (i) => {
    const selectedFile = files[i];

    await deleteMutate.mutateAsync(selectedFile.mediaId);

    remove(i);

    const newList = files.slice(0, i).concat(files.slice(i + 1, files.length));

    setFiles(newList);
  };

  const handleChange = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    mutate.mutate(formData);
  };

  const handleWindowDragEnter = (e) => {
    if (isFile(e)) {
      lastTargetRef.current = e.target;
      openLayer();
    }
  };
  const handleWindowDrop = (e) => {
    e.preventDefault();

    removeLayer();

    if (e.dataTransfer.files.length == 1) {
      handleChange(e.dataTransfer.files);
    }
  };

  const handleWindowDragLeave = (e) => {
    e.preventDefault();

    if (e.target === lastTargetRef.current || e.target === document) {
      removeLayer();
    }
  };

  const handlePaste = (e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;

    // Loop through items to find files
    for (const item of items) {
      if (item.kind === "file") {
        const file = item.getAsFile();

        handleChange([file]);
      }
    }
  };

  const handleWindowDragOver = (e) => e.preventDefault();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const overlay = createOverlay();

    document.body.append(overlay);

    window.addEventListener("dragover", handleWindowDragOver);
    window.addEventListener("dragenter", handleWindowDragEnter);
    window.addEventListener("dragleave", handleWindowDragLeave);
    window.addEventListener("drop", handleWindowDrop);
    window.addEventListener("paste", handlePaste);

    return () => {
      overlay.remove();

      window.removeEventListener("keydown", handlePaste);
      window.removeEventListener("dragover", handleWindowDragOver);
      window.removeEventListener("dragenter", handleWindowDragEnter);
      window.removeEventListener("dragleave", handleWindowDragLeave);
      window.removeEventListener("drop", handleWindowDrop);
    };
  }, []);

  return (
    <Stack
      sx={{
        "&>label": {
          maxWidth: "100%",
          height: "120px",
          borderColor: (theme) => theme.palette.border.form,
          "&>svg>path": {
            fill: (theme) => theme.palette.primary.main,
          },
        },
      }}
      direction="column"
      rowGap={files.length ? "16px" : 0}
    >
      <FileUploader
        {...props}
        multiple={multiple}
        value={value}
        handleChange={handleChange}
      />
      <Stack flexWrap="wrap" direction="row" columnGap={"8px"} rowGap={"8px"}>
        {files.map((file, i) => (
          <FileWidget
            key={file.id}
            {...file}
            id={file.mediaId}
            handleDeleteFile={handleDeleteFile}
            index={i}
            readOnly={readOnly}
          />
        ))}
      </Stack>
    </Stack>
  );
};

function FileWidget({
  originalName,
  handleDeleteFile,
  index,
  filePath,
  readOnly,
  id,
}) {
  const [openPreview, setOpenPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const downloadMutation = useQuery({
    queryKey: ["upload", id],
    queryFn: async () => await httpGetFile(id),
    enabled: false,
  });

  const togglePreviewDialog = () => setOpenPreview((prev) => !prev);

  const getFileUrl = async () => {
    const res = await downloadMutation.refetch();

    // Assume you have buffer data in the form of a Uint8Array
    const bufferData = new Uint8Array(res?.data?.data?.data);

    // Create a Blob from the buffer data
    const blob = new Blob([bufferData]);

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    return url;
  };

  const download = async () => {
    const url = await getFileUrl();
    // Create an anchor element
    const a = document.createElement("a");
    a.href = url;

    // Set the filename and extension for the downloaded file
    a.download = originalName; // Replace with the appropriate extension
    // Trigger a click event on the anchor element to initiate the download
    a.click();

    // Clean up by revoking the temporary URL
    URL.revokeObjectURL(url);
  };

  const preview = async () => {
    togglePreviewDialog();
    setPreviewUrl(await getFileUrl());
  };
  return (
    <>
      <Box sx={styles.fileWidget}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <Typography sx={globalStyles.ellipsis(4)} component={"span"}>
            {originalName}
          </Typography>
        </Box>
        <Stack sx={styles.actionBox} direction="row">
          <IconButton onClick={download} sx={styles.iconButton}>
            <DownloadIcon />
          </IconButton>
          <IconButton onClick={preview}>
            <VisibilityIcon />
          </IconButton>
          {!readOnly && (
            <IconButton
              onClick={() => handleDeleteFile(index)}
              sx={styles.iconButton}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>
      </Box>
      <ImagePreview
        url={previewUrl}
        download={download}
        open={openPreview}
        handleClose={togglePreviewDialog}
      />
    </>
  );
}

export default MyFileUploader;
