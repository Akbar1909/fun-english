// ----------------------------------------------------------------------

export default function Tooltip(theme) {
  const { palette } = theme;
  const { isDarkMode } = { isDarkMode: false };

  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: isDarkMode ? palette.grey[100] : palette.grey[800],
          color: palette.common.white,
        },
        arrow: {
          color: palette.grey[800],
        },
      },
    },
  };
}
