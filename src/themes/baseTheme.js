import { deepmerge } from "@mui/utils";
import typography from "./typography.json";

export const defaultThemeColors = {
  // platform
  primary: "#072D5E", // (dyn)
  secondary: "#DEECFF", // (dyn)
  brand1: "#AB7FB0", // (dyn)
  brand2: "#E6D9E7", // (dyn)

  // borders
  borderGrey: "#9EB7D7",
  borderGreyLight: "#EAEAEA", // (dyn)
  // sponsor border color
  sponsorBarWeb: "#FF643F", // (dyn)

  // elements
  elementsScroll: "#686C84",
  elementsOrange: "#FF643F",

  // white
  white: "#FFFFFF",

  // button
  buttonStarBorders: "#9EB7D7", // (dyn)
  buttonGreen: "#14BD87", // (dyn)
  buttonGreenLight: "#E7F8F3", // (dyn)

  // functional
  functionalInfo: "#2988FF",
  functionalWarning: "#FFBB01",
  functionalSuccess: "#14BD87",
  functionalDanger: "#FB4A59", // (dyn)

  // text
  textPrimary: "#333645", // (dyn)
  textSecondary: "#6B809B", // (dyn)

  // background
  backgroundGreyLight: "#FCFCFC",
  backgroundGrey: "#F8F8F8",
  backgroundPage: "#FCFCFC", // (dyn)

  // icon
  iconSecondary: "#5D7189",

  // status
  statusConfirmedDark: "#0C7D5A",
  statusConfirmed: "#14BD87",
  statusConfirmedLight: "#E7F8F3",
  statusCancelledDark: "#D80315",
  statusCancelled: "#FB4A59", // (dyn)
  statusCancelledLight: "#FFE8EA",
  statusIncomingDark: "#005ED1",
  statusIncoming: "#2988FF", // (dyn)
  statusIncomingLight: "#D4E7FF",
  statusPendingDark: "#8F6900",
  statusPending: "#FFBB01", // (dyn)
  statusPendingLight: "#FFF3D3",
  statusNeutralDark: "#5D7189",
  statusNeutralLight: "#F5F5F6",
  statusRFP: "#7B61FF",
};

export const defaultTypographyFont = {
  fontFamily: "Lato, sans-serif",
  src: "",
};

const palette = (themeColors = defaultThemeColors) => ({
  primary: {
    main: themeColors.brand1,
    contrastText: themeColors.white,
  },
  secondary: {
    main: themeColors.brand2,
    contrastText: themeColors.brand1,
  },
  error: {
    main: themeColors.statusCancelled,
    contrastText: themeColors.white,
  },
  warning: {
    lighter: "#FFF7CD",
    light: "#FFE16A",
    main: "#FFC107",
    dark: "#B78103",
    darker: "#7A4F01",
  },
  success: {
    main: themeColors.buttonGreen,
    contrastText: themeColors.white,
  },
  colors: themeColors,
  text: {
    primary: themeColors.textPrimary,
    secondary: themeColors.textSecondary,
  },
  divider: themeColors.borderGreyLight,
});

const defaultTypography = (typographyFont) => ({
  ...typography,
  fontFamily: typographyFont.fontFamily,
  body1: {
    ...typography.body1,
    "&.button2": typography.button2,
    "&.subtitle3": typography.subtitle3,
    "&.subtitle4": typography.subtitle4,
    "&.overline2": typography.overline2,
    "&.overline3": typography.overline3,
  },
});

const muiCssBaseLine = ({
  themeColors = defaultThemeColors,
  typographyFont = defaultThemeColors,
  breakpoints,
  theme,
}) => ({
  MuiCssBaseline: {
    "@global": {
      ...(typographyFont.src && {
        "@font-face": {
          fontFamily: typographyFont.fontFamily,
          src: `url(${typographyFont.src})`,
        },
      }),
      "*": {
        fontFamily: typographyFont.fontFamily,
      },
      html: {
        fontSize: 16,
        [breakpoints.down("md")]: {
          fontSize: 14,
        },
      },
      body: {
        minHeight: "100vh",
        backgroundColor: themeColors.backgroundPage,
        [breakpoints.down("sm")]: {
          backgroundColor: `${themeColors.white} !important`,
        },
      },
      "*::-webkit-scrollbar": {
        width: 4,
        height: 4,
      },
      "*::-webkit-scrollbar-track": {
        backgroundColor: themeColors.statusNeutralLight,
        borderRadius: "2px",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: themeColors.elementsScroll,
        borderRadius: "2px",
      },
      ".cardsImage": {
        borderRadius: "6px",
      },
      ".cardsImageCircle": {
        borderRadius: "50%",
      },
      ".pointer": {
        cursor: "pointer",
      },
      ".dangerouslyHtml": {
        "& img": {
          maxWidth: "100%",
          aspectRatio: 1,
        },
        "& *": {
          lineHeight: "initial",
        },
      },
      ".pt3": {
        paddingTop: theme.spacing(3),
      },
      ".stickyTop": {
        position: "sticky",
        top: 0,
      },
      ".ellipsis": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": 1,
        "-webkit-box-orient": "vertical",
      },
      ".ellipsis2": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
      },
      ".ellipsis3": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": 3,
        "-webkit-box-orient": "vertical",
      },
      ".ellipsis4": {
        wordBreak: "break-word",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": 4,
        "-webkit-box-orient": "vertical",
      },
      ".uppercase": {
        textTransform: "uppercase",
      },
    },
  },
});

const components = ({
  themeColors = defaultThemeColors,
  typographyFont = defaultTypographyFont,
  alpha,
  lighten,
}) => ({
  MuiPaper: {
    root: {
      overflow: "hidden",
      "&.MuiPaper-rounded": {
        borderRadius: "16px",
        "& .MuiPaper-rounded": {
          borderRadius: "10px",
          "& .MuiPaper-rounded": {
            borderRadius: "6px",
          },
        },
      },
    },
  },
  MuiAlert: {
    root: {
      padding: "11.5px 20px 11.5px 14px",
    },
    standardError: {
      backgroundColor: themeColors.statusCancelledLight,
      color: themeColors.textPrimary,
    },
    standardSuccess: {
      backgroundColor: themeColors.buttonGreenLight,
      color: themeColors.textPrimary,
    },
  },
  MuiInputLabel: {
    root: {
      color: themeColors.textPrimary,
      marginBottom: 4,
      fontSize: 14,
    },
  },
  MuiOutlinedInput: {
    root: {
      border: `1px solid ${themeColors.borderGreyLight}`,
      "&:not($disabled):not($focused):not($error) $notchedOutline": {
        border: "none",
      },
      "&.Mui-error .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
    input: {
      padding: 10,
      borderRadius: 5,
      "&::placeholder": {
        opacity: 1,
        color: themeColors.textSecondary,
        fontSize: 16,
      },
      "&:-webkit-autofill": {
        "-webkit-background-clip": "text",
      },
    },
    inputAdornedStart: {
      paddingLeft: 8,
    },
  },
  MuiTextField: {
    root: {
      background: themeColors.white,
      borderRadius: 5,
      "& .MuiFormLabel-root.Mui-error": {
        color: themeColors.textPrimary,
      },
      "& .MuiOutlinedInput-root.Mui-focused": {
        "&.MuiInputBase-root": {
          border: `1px solid ${themeColors.functionalInfo}`,
          borderRadius: 5,
        },
        "&.Mui-error .MuiInputBase-input": {
          boxShadow: "none",
        },
      },
    },
  },
  MuiInput: {
    root: {
      fontFamily: typographyFont.fontFamily,
      padding: 10,
      background: themeColors.white,
      borderRadius: 5,
      borderBottom: "none",
      "& .MuiOutlinedInput-root.Mui-focused": {
        "& .MuiInputBase-input": {
          boxShadow: "none",
          borderRadius: 5,
        },
        "&.Mui-error .MuiInputBase-input": {
          boxShadow: "none",
        },
      },
      "&.Mui-focused .MuiSelect-root": {
        boxShadow: "none",
      },
    },
  },
  MuiInputBase: {
    root: {
      "&.Mui-error": {
        border: `1px solid ${themeColors.statusCancelled}`,
      },
      "&.Mui-disabled": {
        background: themeColors.statusNeutralLight,
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      },

      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiSelect-root": {
          background: themeColors.white,
          border: `1px solid ${defaultThemeColors.statusIncoming}`,
          borderRadius: "5px",
        },
        "&.Mui-error .MuiSelect-root": {
          boxShadow: "none",
        },
      },
    },
    input: {
      color: themeColors.textPrimary,
    },
  },
  MuiIconButton: {
    root: {
      borderRadius: 5,
      "&:hover": {
        backgroundColor: themeColors.statusNeutralLight,
        borderRadius: 5,
      },
      "&.Mui-disabled": {
        backgroundColor: themeColors.statusNeutralLight,
        color: alpha(themeColors.statusNeutralDark, 0.8),
      },
      "&.primaryGreen": {
        backgroundColor: themeColors.buttonGreen,
        color: themeColors.white,
        "&:hover": {
          backgroundColor: lighten(themeColors.buttonGreen, 0.4),
          boxShadow: "none",
        },
        "&.Mui-disabled": {
          backgroundColor: themeColors.statusNeutralLight,
          color: alpha(themeColors.statusNeutralDark, 0.8),
        },
      },
    },
    colorPrimary: {
      "&.MuiIconButton-root": {
        backgroundColor: themeColors.primary,
        color: themeColors.white,
        "&.Mui-disabled": {
          backgroundColor: themeColors.borderGreyLight,
          color: alpha(themeColors.statusNeutralDark, 0.8),
        },
        "&:hover": {
          backgroundColor: lighten(themeColors.primary, 0.15),
          boxShadow: "none",
        },
      },
    },
    colorSecondary: {
      "&.MuiIconButton-root": {
        backgroundColor: themeColors.secondary,
        color: themeColors.primary,
        "&.Mui-disabled": {
          backgroundColor: themeColors.statusNeutralLight,
          color: alpha(themeColors.statusNeutralDark, 0.8),
        },
        "&:hover": {
          backgroundColor: lighten(themeColors.secondary, 0.7),
          boxShadow: "none",
        },
      },
    },
  },
  MuiSwitch: {
    root: {
      "& .MuiButtonBase-root": {
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
    },
  },
  MuiButton: {
    root: {
      textTransform: "none",
      fontWeight: 700,
      "&:hover": {
        backgroundColor: "none",
      },
      "&.Mui-disabled": {
        backgroundColor: themeColors.statusNeutralLight,
        color: alpha(themeColors.statusNeutralDark, 0.8),
      },
    },
    colorInherit: {
      "&.MuiButton-root:hover": {
        backgroundColor: "none",
        boxShadow:
          "0px 2px 6px rgba(0, 0, 0, 0.2), 0px 2px 16px rgba(130, 130, 130, 0.16)",
      },
    },
    contained: {
      "&.MuiButton-root": {
        boxShadow: "none",
        "&.Mui-disabled": {
          backgroundColor: themeColors.statusNeutralLight,
          color: alpha(themeColors.statusNeutralDark, 0.8),
        },
      },
    },
    containedPrimary: {
      "&.MuiButton-root": {
        backgroundColor: themeColors.primary,
      },
    },
    containedSecondary: {
      "&.MuiButton-root": {
        backgroundColor: themeColors.secondary,
        color: themeColors.primary,
      },
    },
    outlined: {
      "&.MuiButton-root": {
        border: "1px solid #E6E8EE",
        color: themeColors.textPrimary,
        "&.Mui-disabled": {
          backgroundColor: themeColors.statusNeutralLight,
          color: alpha(themeColors.statusNeutralDark, 0.8),
          border: "none",
        },
      },
    },
    textPrimary: {
      color: themeColors.primary,
    },
  },
  MuiCheckbox: {
    root: {
      width: 16,
      height: 16,
      background: "none",
      color: themeColors.borderGrey,
      "& .MuiSvgIcon-root": {
        width: 16,
        height: 16,
      },
    },
  },
  MuiRadio: {
    root: {
      color: themeColors.borderGrey,
    },
  },
  MuiFormLabel: {
    root: {
      color: themeColors.textPrimary,
      marginBottom: 4,
      fontSize: 14,
    },
  },
  MuiSvgIcon: {
    root: {
      "&:hover": {
        cursor: "inherit",
      },
    },
  },
  MuiDialogContentText: {
    root: {
      color: themeColors.textPrimary,
    },
  },
  MuiDrawer: {
    paper: {
      position: "absolute",
    },
  },
  MuiLink: {
    root: {
      cursor: "pointer",
    },
  },
});

const makeTheme = ({
  createTheme,
  alpha,
  lighten,
  typographyFont = defaultTypographyFont,
  themeColors = defaultThemeColors,
  theme,
  options,
}) => {
  const { breakpoints } = theme;

  const defaultOptions = {
    palette: palette(themeColors),
    typography: defaultTypography(typographyFont),
    overrides: {
      ...muiCssBaseLine({ themeColors, theme, typographyFont, breakpoints }),
      ...components({ themeColors, typographyFont, alpha, lighten }),
    },
    breakpoints,
  };

  const mergedOptions = deepmerge(defaultOptions, options);

  return createTheme(mergedOptions);
};

export default makeTheme;
