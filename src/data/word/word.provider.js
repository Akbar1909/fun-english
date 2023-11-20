import { formatRichTextForApi } from "@/helpers/richText";

export const prepareWordDto = (values) => {
  return {
    ...values,
    example: formatRichTextForApi(values.example),
    description: formatRichTextForApi(values.description),
    wordTagId: values.wordTag?.value,
    level: values.wordLabel?.value,
    mediaId: values.photos?.[0]?.mediaId,
  };
};

export const WORD_LEVELS = [
  {
    label: "A1",
    value: "A1",
  },
  {
    label: "A2",
    value: "A2",
  },
  {
    label: "B1",
    value: "B1",
  },
  {
    label: "B2",
    value: "B2",
  },
  {
    label: "C1",
    value: "C1",
  },
  {
    label: "C2",
    value: "C2",
  },
];
