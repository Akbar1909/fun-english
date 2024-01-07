import { TextField } from "@mui/material";

const SearchInput = ({ placeholder = `Find your word...🚀🤩😊`, ...props }) => {
  return (
    <TextField
      placeholder={placeholder}
      sx={{ width: "100%", maxWidth: "800px" }}
      InputProps={{
        sx: {
          borderRadius: "16px",
          fontSize: "32px",
          "& input::placeholder": {
            fontSize: "32px",
          },
        },
      }}
      {...props}
    />
  );
};

export default SearchInput;
