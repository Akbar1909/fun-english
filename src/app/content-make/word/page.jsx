import { AddWordForm } from "@/components/AddWordForm";
import Head from "next/head";
import { Container, Typography, Grid, Box } from "@mui/material";
import { AddWordTagForm } from "@/components/AddWordTagForm";
import { WordTagList } from "@/components/WordTagList";
import { Suspense } from "react";

const page = async () => {
  return (
    <>
      <Head>
        <title>Add a new word</title>
      </Head>

      <Grid
        container
        columnSpacing={{ md: "16px" }}
        rowSpacing={{ xs: "16px" }}
      >
        <Grid item xs={12} md={6} lg={8}>
          <Typography variant="h3" mb={2}>
            Add a new word
          </Typography>
          <AddWordForm />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="h3" mb={2}>
            Add a new word tag
          </Typography>
          <AddWordTagForm />
          <Box mt={2}>
            <Suspense fallback={<h1>Loading...</h1>}>
              <WordTagList />
            </Suspense>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default page;
