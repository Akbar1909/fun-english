import { deepmerge } from "@mui/utils";
import { convertFromHEXToHSL, createHSLString } from "@/helpers/colorConverter";
import { camelCaseToCapitalize, isObject } from "@/helpers/common";

export const generateCustomBorder = ({
  stroke,
  strokeOpacity,
  strokeWidth,
  rx,
  ry,
}) => {
  if (!stroke) {
    return "none";
  }

  return `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='${
    rx || 10
  }' ry='${ry || 10}' stroke='${stroke.replace("#", "%23")}' stroke-opacity='${
    strokeOpacity || 1
  }' stroke-width='${
    strokeWidth || 1
  }' stroke-dasharray='6' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`;
};

export const getColors = (color) => {
  const { hslArray, hslString, isDarken } = convertFromHEXToHSL(color);
  const [h, s, l] = hslArray;

  return {
    main: hslString,
    contrastText: isDarken ? "#FFFFFF" : "#333645",
    hoverColor: createHSLString([h, s, isDarken ? l + 5 : l - 5]),
  };
};

export const buttonColors = [
  "error",
  "info",
  "primary",
  "secondary",
  "success",
  "warning",
  "neutral",
  "brand1",
  "brand2",
];

/**
 * getButtonColors
 * @description function add contrast hover color to initial button color
 * @param {Record<string, Record<keyof GetColorsReturnData, string>>} palette - color palette;
 * @returns {Record<string, any>>}
 */

const getButtonColors = (palette) =>
  buttonColors.reduce(
    (acc, color) => ({
      ...acc,
      [`contained${camelCaseToCapitalize(color)}`]: {
        backgroundColor: palette[color].main,
        "&:hover": {
          backgroundColor: palette[color].hoverColor,
        },
      },
    }),
    {}
  );

const getMuiThemeOptions = (themeColors, themeComponents) => {
  const palette = {
    error: getColors(themeColors.functionalDanger),
    info: getColors(themeColors.functionalInfo),
    primary: getColors(themeColors.primary),
    secondary: getColors(themeColors.secondary),
    success: getColors(themeColors.buttonGreen),
    warning: getColors(themeColors.functionalWarning),
    neutral: getColors(themeColors.statusNeutralLight),

    brand1: getColors(themeColors.brand1),
    brand2: getColors(themeColors.brand2),

    colors: themeColors,
    text: {
      primary: themeColors.textPrimary,
      secondary: themeColors.textSecondary,

      ...(isObject(themeColors.text) && themeColors.text),
    },
    divider: themeColors.borderGreyLight,

    ...(isObject(themeColors.success) && themeColors.success),

    ...(isObject(themeColors.error) && themeColors.error),
  };

  const components = {
    MuiButton: {
      styleOverrides: {
        contained: {
          "&, &:hover": {
            boxShadow: "none",
          },
        },
        ...getButtonColors(palette),
      },
    },
  };

  return {
    palette,
    components: deepmerge(themeComponents, components),
  };
};

export default getMuiThemeOptions;
