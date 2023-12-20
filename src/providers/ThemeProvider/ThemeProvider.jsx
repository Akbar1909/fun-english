"use client";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
// @mui
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import mainThemeV5 from "@/themes/mainThemeV5";

export default function ThemeProvider({ children }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <MUIThemeProvider theme={mainThemeV5}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
