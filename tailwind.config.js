// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            white: "#ffffff",
            black: "#000000",
          },
        },
        dark: {
          colors: {
            white: "#ffffff",
            black: "#000000",
          },
        },
      },
    }),
  ],
};

export default config;
