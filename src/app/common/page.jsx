import { Grid } from "@mui/material";
import ExternalSearchBox from "../_components/HomePage/ExternalSearchBox";
import InternalSearchBox from "../_components/HomePage/InternalSearchBox";
import WordForm from "../_components/HomePage/WordForm";

export default function HomePage() {
  return (
    <Grid container sx={{ mt: 4 }} spacing={2}>
      <Grid item xs={12} md={6}>
        <WordForm word="To contain" />
      </Grid>
      <Grid item xs={12} md={6}>
        <InternalSearchBox />
      </Grid>
    </Grid>
  );
}
