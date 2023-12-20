"use client";
import { FormLabel, useTheme, Box } from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const styles = {
  root: {},
  "public-DraftEditor-content": {
    minHeight: "100px",
    paddingLeft: "10px",
    borderRadius: "6px",
  },
};

const MyEditor = ({
  value,
  onChange,
  label,
  placeholder = "",
  readOnly = false,
}) => {
  const theme = useTheme();

  return (
    <Box sx={styles.root}>
      <FormLabel>{label}</FormLabel>
      <Editor
        toolbarStyle={{
          borderColor: theme.palette.colors.borderGrey,
          backgroundColor: theme.palette.background.paper,
        }}
        placeholder={placeholder}
        editorStyle={{
          ...styles["public-DraftEditor-content"],
          backgroundColor: theme.palette.grey[200],
        }}
        editorState={value}
        onEditorStateChange={onChange}
        readOnly={readOnly}
        toolbar={{
          options: ["inline", "list", "textAlign"],
          inline: {
            options: ["bold", "italic", "underline"],
          },
          list: { options: ["ordered", "unordered"] },
        }}
        // {...props}
      />
    </Box>
  );
};

export default MyEditor;
