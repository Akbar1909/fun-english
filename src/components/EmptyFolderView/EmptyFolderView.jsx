import { Box } from "@mui/material";

const EmptyFolderView = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "red",
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
          backgroundColor: "blue",
          width: "60px",
          height: "20px",
          clipPath: "polygon(0 0, 68% 0, 100% 100%, 0% 100%)",
        },
      }}
    ></Box>
  );
};

export default EmptyFolderView;
