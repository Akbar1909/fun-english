import { useState, useRef } from "react";
import Image from "next/image";
import {
  Stack,
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import ExtraInfoWidget from "./ExtraInfoWidget";
import {
  httpPostAttachPhotoToWord,
  httpPostSaveWord,
} from "@/data/word/word.request";
import { httpPostUpload } from "@/data/upload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import notification from "@/services/notification";

const WordMeanWidget = ({
  antonyms = [],
  definitions = [],

  synonyms = [],
  word,
  internal = false,
  add,
}) => {
  const currentIndex = useRef(null);
  const [file, setFile] = useState(null);
  const saveMutate = useMutation({
    mutationFn: httpPostAttachPhotoToWord,
    mutationKey: "save",
  });

  const uploadMutate = useMutation({
    mutationFn: httpPostUpload,
    mutationKey: "upload",
  });

  const handleSave = async ({ definition, example }) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await uploadMutate.mutateAsync(formData);

    const body = {
      word,
      definition,
      example,
      mediaId: response?.data?.data?.mediaId,
    };

    saveMutate.mutate(body);
  };

  const s = useMutation({
    mutationFn: httpPostSaveWord,
    mutationKey: "save",
    onSuccess: () => {
      notification.setMode("success").setMessage("Saved 🥳").pop();
    },
    onError: () => {
      notification.setMode("error").setMessage(`Something went wrong 😕`).pop();
    },
  });

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: "800px",
        mb: 2,
        boxShadow: 0,
        border: "1px dashed",
        borderColor: (theme) => theme.palette.grey[400],
        borderRadius: "16px",
        p: 1,
      }}
    >
      <Stack>
        {definitions.map(
          ({ definition, examples, images, partOfSpeech }, i) => (
            <Box
              key={i}
              sx={{
                mb: 1,
                borderTop: "1px solid",
                marginTop: 1,
                borderColor: (theme) => theme.palette.grey[300],
                position: "relative",
                p: 1,
                position: "relative",
              }}
            >
              <Box>
                <Box
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: "common.white",
                    width: "fit-content",
                    px: 2,
                    borderRadius: "8px",
                  }}
                >
                  {partOfSpeech}
                </Box>
                <Typography sx={{ fontWeight: "bold" }}>
                  {definition}
                </Typography>
                {examples.map((example, i) => (
                  <Typography key={i} sx={{ fontStyle: "italic", ml: 1 }}>
                    {example.example}
                  </Typography>
                ))}
              </Box>
              {!internal
                ? !add && (
                    <>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFile(file);
                          }
                        }}
                      />
                      <Button
                        onClick={() => handleSave({ definition, example })}
                        sx={{ mt: 1, width: "100%" }}
                        variant="outlined"
                      >
                        Save
                      </Button>
                    </>
                  )
                : images && (
                    <Stack direction="row">
                      {images.map(({ filename }, i) => (
                        <Image
                          width={200}
                          height={200}
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/files/serve/${filename}`}
                          key={i}
                          alt={word}
                        />
                      ))}
                    </Stack>
                  )}
            </Box>
          )
        )}
        {synonyms.length > 0 && (
          <ExtraInfoWidget sx={{ mb: 1 }} title={"Synonyms"} list={synonyms} />
        )}
        {antonyms.length > 0 && (
          <ExtraInfoWidget title={"Antonyms"} list={antonyms} />
        )}
      </Stack>
    </Paper>
  );
};

export default WordMeanWidget;
