// @mui
import { GlobalStyles as MUIGlobalStyles } from "@mui/material";

export const globalStyles = {
  pointer: {
    cursor: "pointer",
  },
  dangerouslyHtml: {
    "& img": {
      maxWidth: "100%",
      aspectRatio: 1,
    },
    "& *": {
      lineHeight: "inherit",
    },
  },
  tableSvg: {
    width: "20px",
    height: "20px",
  },
  ellipsis: (lineClamp) => ({
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: `${lineClamp}`, // number to string conversion
    WebkitBoxOrient: "vertical",
  }),
  uppercase: {
    textTransform: "uppercase",
  },
};

// ----------------------------------------------------------------------

export default function GlobalStyles({ theme }) {
  const { mode, isDarkMode } = { mode: "light" };
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        "*": {
          boxSizing: "border-box",
        },
        html: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
        },
        body: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
        },
        "#root": {
          width: "100%",
          height: "100%",
        },
        ".overlay": {
          position: "fixed",
          width: "100vw",
          height: "100vh",
          left: 0,
          top: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.grey[100],
          zIndex: 1101,
          transition: "fontSize 500ms, visibility 175ms, opacity 175ms",
          opacity: 0,
          visibility: "hidden",
          font: "bold",
          color: theme.palette.grey[900],
          textShadow: `1px 1px 2px ${theme.palette.grey[900]}`,
        },

        ".overlay-in": {
          opacity: 0.8,
          visibility: "visible",
          fontSize: "3rem",
        },
        input: {
          "&[type=number]": {
            MozAppearance: "textfield",
            "&::-webkit-outer-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
            "&::-webkit-inner-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
          },
        },
        img: {
          display: "block",
          maxWidth: "100%",
        },
        ul: {
          margin: 0,
          padding: 0,
        },
        ...(isDarkMode && {
          ".MuiBackdrop-root": {
            backgroundColor: "transparent",
          },
        }),
      }}
    />
  );

  return inputGlobalStyles;
}
