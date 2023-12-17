import { Box, Typography, Stack } from "@mui/material";
import Image from "next/image";

const WORD_CARD_RADIUS = "12px";

export default function WordCard({
  word,
  description,
  example,
  wordTag: { tag, color },
  mediaName,
  preview = false,
}) {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: color,
          borderTopRightRadius: WORD_CARD_RADIUS,
          borderTopLeftRadius: WORD_CARD_RADIUS,
        }}
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
          sx={{ width: "100%", px: 1, "&>p": { wordBreak: "break-word" } }}
          dangerouslySetInnerHTML={{ __html: description }}
        ></Box>

        {mediaName && !preview ? (
          <Image
            className="text-center"
            width={300}
            height={300}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/files/serve/${mediaName}`}
            alt="bird"
            priority
          />
        ) : null}

        {preview ? (
          <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px" }}
          />
        ) : null}

        <Box
          sx={{ width: "100%", px: 1, "&>p": { wordBreak: "break-word" } }}
          dangerouslySetInnerHTML={{ __html: example }}
        ></Box>
      </Stack>

      <Box
        py={1}
        sx={{
          backgroundColor: color,
          borderBottomLeftRadius: WORD_CARD_RADIUS,
          borderBottomRightRadius: WORD_CARD_RADIUS,
        }}
      >
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
