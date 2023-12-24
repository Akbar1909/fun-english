"use client";
import { createPortal } from "react-dom";
import { useFixedFolderStore } from "@/clientStore/fixed-folder";
import { Box, Typography } from "@mui/material";

const EmptyFolderView = () => {
  const { savedWordElements, savedWordIds, count } = useFixedFolderStore();

  return (
    <>
      (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: (theme) => theme.palette.warning.light,
          width: "140px",
          height: "90px",
          borderBottomLeftRadius: "3px",
          borderBottomRightRadius: "3px",
          borderTopRightRadius: "3px",
          "&::before": {
            content: '""',
            position: "absolute",
            borderTopLeftRadius: "3px",
            borderTopRightRadius: "3px",
            top: "-20px",
            left: "0px",
            backgroundColor: (theme) => theme.palette.warning.light,
            width: "60px",
            height: "20px",
            clipPath: "polygon(0 0, 68% 0, 100% 100%, 0% 100%)",
            borderBottom: "1px solid",
            borderColor: "common.white",
          },
        }}
      >
        <Typography variant="h1">{count}</Typography>
      </Box>
      {savedWordElements.map((savedWordElement) =>
        createPortal(savedWordElement, document.body)
      )}
    </>
  );
};

export default EmptyFolderView;
