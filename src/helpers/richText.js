import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";

export const formatRichTextForUI = (description) => {
  const html = convertFromHTML(description);
  return EditorState.createWithContent(
    customContentStateConverter(
      ContentState.createFromBlockArray(html.contentBlocks, html.entityMap)
    )
  );
};

export const formatRichTextForApi = (content) => {
  content = content?.getCurrentContent();

  if (content?.hasText()) {
    return draftToHtml(convertToRaw(content));
  }

  return null;
};
