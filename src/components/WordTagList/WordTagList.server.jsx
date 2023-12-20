import { Stack, Typography, Box } from "@mui/material";
const WordTagList = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/word-tags/`,
    { next: { revalidate: 5 } }
  );
  const { data } = await response.json();

  return (
    <Stack direction="column" rowGap={"6px"}>
      {data.map(({ tag, color, wordTagId }, i) => (
        <Box key={i}>
          <Typography
            sx={{
              position: "relative",
              paddingLeft: "30px",
              "&::before": {
                content: '""',
                position: "absolute",
                width: 16,
                height: 16,
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: color || "primary.light",
                borderRadius: "50%",
              },
            }}
          >
            {tag}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
};

export default WordTagList;
