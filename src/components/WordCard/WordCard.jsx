import { Box, Typography, Stack } from "@mui/material";
import Image from "next/image";

export default function WordCard({
  word,
  description,
  example,
  wordTag: { tag, color },
  mediaName,
}) {
  return (
    <Box>
      <Box
        sx={{ backgroundColor: color }}
        display="flex"
        justifyContent="center"
        textAlign="center"
      >
        <Typography variant="h5" color="common.white">
          {tag.toUpperCase()}
        </Typography>
      </Box>

      <Stack
        rowGap={"8px"}
        px={1}
        display="flex"
        alignItems="center"
        flexDirection="column"
        sx={{ backgroundColor: "grey.200" }}
      >
        <Typography textAlign="center" variant="h3">
          {word}
        </Typography>
        <Box
          sx={{ width: "100%", px: 1 }}
          dangerouslySetInnerHTML={{ __html: description }}
        ></Box>
        {mediaName ? (
          <Image
            className="text-center"
            width={300}
            height={300}
            unoptimized
            src={`${process.env.NEXT_PUBLIC_STATIC_PATH}/${mediaName}`}
            alt="bird"
            priority
          />
        ) : null}

        <Box
          sx={{ width: "100%", px: 1 }}
          dangerouslySetInnerHTML={{ __html: example }}
        ></Box>
      </Stack>

      <Box py={1} sx={{ backgroundColor: color }}>
        <Typography
          variant="body1"
          textAlign="center"
          color={"common.white"}
          px={1}
        >
          EnglishMetro
        </Typography>
      </Box>
    </Box>
  );
}
