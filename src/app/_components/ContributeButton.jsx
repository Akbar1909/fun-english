"use client";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "@mui/material";

const text1 = "Add a new word 😄";
const text2 = "Yeah, We knew that 🚀";

const ContributeButton = () => {
  const buttonRef = useRef(null);

  const handleMouseEnter = () => {
    buttonRef.current.innerText = text2;
  };

  const handleMouseLeave = () => {
    buttonRef.current.innerText = text1;
  };

  return (
    <Link href="/content-make/word">
      <Button
        ref={buttonRef}
        variant="outlined"
        sx={{ width: 220 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text1}
      </Button>
    </Link>
  );
};

export default ContributeButton;
