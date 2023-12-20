import { alpha, lighten, createTheme } from "@mui/material/styles";
import makeTheme, { defaultThemeColors } from "./baseTheme";
import getMuiThemeOptions from "./mainTheme.helpers";

const defaultTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1440,
      xl: 1920,
    },
  },
});

const mainThemeV5 = makeTheme({
  alpha,
  lighten,
  createTheme,
  options: getMuiThemeOptions(defaultThemeColors),
  theme: defaultTheme,
});

export default mainThemeV5;
