import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

function MyProgressbarNumber({ from, to }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    return Math.round(latest);
  });
  const ref = useRef(null);

  // while in view animate the count
  useEffect(() => {
    animate(count, to, { duration: 1 });
  }, [count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default MyProgressbarNumber;
