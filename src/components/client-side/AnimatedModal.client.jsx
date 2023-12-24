"use client";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AnimatePresence } from "framer-motion";
import { MotionDiv } from "./MotionDiv";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const modalVariants = {
  open: {
    opacity: 1,
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  },
  closed: {
    opacity: 0,
    top: "-100%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
};

const AnimatedModal = ({ isOpen, onClose, children, title = "" }) => {
  const theme = useTheme();
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            style={{
              position: "fixed",
              zIndex: 1300,
              padding: "20px",
              backgroundColor: theme.palette.common.white,
              borderRadius: "12px",
              width: "400px",
            }}
            initial="closed"
            animate="open"
            exit="closed"
            variants={modalVariants}
          >
            <Box>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h3">{title}</Typography>
                <FontAwesomeIcon
                  style={{ cursor: "pointer" }}
                  onClick={onClose}
                  icon={faXmark}
                />
              </Stack>
              {children}
            </Box>
          </MotionDiv>
        )}
      </AnimatePresence>
      <Box
        onClick={onClose}
        sx={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: (theme) => theme.palette.common.black,
          opacity: 0.3,
          zIndex: 1200,
        }}
      ></Box>
    </>
  );
};

export default AnimatedModal;
