"use client";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { MotionDiv } from "@/components/client-side/MotionDiv";
const WordTagViewWrapperClient = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    console.log({ isInView });
  }, [isInView]);

  return <MotionDiv ref={ref}>{children}</MotionDiv>;
};

export default WordTagViewWrapperClient;
