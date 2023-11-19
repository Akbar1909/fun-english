// ----------------------------------------------------------------------

export default function Table(theme) {
  const { isDarkMode } = { isDarkMode: false };
  return {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral,
          borderColor: theme.palette.grey[100],
        },
        body: {
          borderColor: theme.palette.grey[100],
          backgroundColor: isDarkMode
            ? theme.palette.background.neutral
            : theme.palette.common.white,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        hover: {
          backgroundColor: "#f00",
        },
      },
    },
  };
}
