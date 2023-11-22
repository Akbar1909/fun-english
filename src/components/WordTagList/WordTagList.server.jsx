import { Stack, Typography, Box } from "@mui/material";
const WordTagList = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/word-tags/`,
    { next: { tags: ["word-tags"] } }
  );
  const { data } = await response.json();

  return (
    <Stack direction="column" rowGap={"6px"}>
      {data.map(({ tag, color, wordTagId }) => (
        <Box key={wordTagId}>
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
                backgroundColor: color,
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
