import { Variants } from "framer-motion";

export const modalSurpriseVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 800,
      damping: 30,
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: { duration: 0.2 },
  },
};

export const popInMotionProps = {
  initial: "hidden",
  animate: "visible",
  exit: "exit",
  variants: modalSurpriseVariants,
};
