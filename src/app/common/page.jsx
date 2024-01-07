import { Grid } from "@mui/material";
import ExternalSearchBox from "../_components/HomePage/ExternalSearchBox";
import InternalSearchBox from "../_components/HomePage/InternalSearchBox";

export default function HomePage() {
  return (
    <Grid container sx={{ mt: 4 }} spacing={2}>
      <Grid item xs={12} md={6}>
        <ExternalSearchBox />
      </Grid>
      <Grid item xs={12} md={6}>
        <InternalSearchBox />
      </Grid>
    </Grid>
  );
}
