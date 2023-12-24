"use client";
import { forwardRef, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordField = (props, ref) => {
  const [show, setShow] = useState(false);

  return (
    <TextField
      type={show ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <IconButton
            onClick={() => setShow(!show)}
            size="small"
            color="primary"
          >
            <FontAwesomeIcon icon={show ? faEye : faEyeSlash} />
          </IconButton>
        ),
      }}
      inputRef={ref}
      {...props}
    />
  );
};

export default forwardRef(PasswordField);
