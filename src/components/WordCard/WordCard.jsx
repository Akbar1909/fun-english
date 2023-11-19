import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function WordCard({
  word,
  description,
  example,
  wordTag: { tag },
  mediaName,
}) {
  return (
    <Box
      sx={{
        border: "1px dashed",
        borderColor: "primary.light",
      }}
    >
      <Box
        sx={[
          { position: "relative", px: 1 },
          {
            "&::after": {
              content: "''",
              position: "absolute",
              bottom: 0,
              width: "90%",
              height: "1px",
              bgcolor: "primary.light",
            },
          },
        ]}
        display="flex"
        justifyContent="center"
        textAlign="center"
      >
        <Typography variant="h5">{tag.toUpperCase()}</Typography>
      </Box>

      <Box px={1} display="flex" alignItems="center" flexDirection="column">
        <Typography textAlign="center" variant="h3">
          {word}
        </Typography>
        <Typography variant="body1" textAlign="center">
          {description}
        </Typography>
        {mediaName ? (
          <Image
            className="text-center"
            width={300}
            height={300}
            src={`${process.env.NEXT_PUBLIC_STATIC_PATH}/${mediaName}`}
            alt="bird"
            priority
          />
        ) : null}

        <Box
          sx={{ width: "100%", px: 1 }}
          dangerouslySetInnerHTML={{ __html: example }}
        ></Box>
      </Box>

      <Box py={1} bgcolor="primary.light">
        <Typography
          variant="body1"
          textAlign="center"
          color={"common.white"}
          px={1}
        >
          English Ambulance
        </Typography>
      </Box>
    </Box>
  );
}
