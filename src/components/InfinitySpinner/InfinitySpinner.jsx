import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import RotateLoader from "react-spinners/RotateLoader";

const InfinitySpinner = ({ isFetching }) => {
  const theme = useTheme();
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <RotateLoader
        loading={isFetching}
        color={theme.palette.primary.main}
        size={15}
      />
    </Box>
  );
};

export default InfinitySpinner;
