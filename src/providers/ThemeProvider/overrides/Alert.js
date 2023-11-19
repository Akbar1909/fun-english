export default function Alert(theme) {
  const { success, error, warning } = theme.palette.common.alert;
  return {
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: success.backgroundColor,
          color: success.color,
          svg: {
            color: success.svg
          }
        },
        standardError: {
          backgroundColor: error.backgroundColor,
          color: error.color,
          svg: {
            color: error.svg
          }
        },
        standardWarning: {
          backgroundColor: warning.backgroundColor,
          color: warning.color,
          svg: {
            color: warning.svg
          }
        }
      }
    }
  };
}
