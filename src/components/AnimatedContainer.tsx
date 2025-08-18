
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedContainerProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedContainer = ({ 
  children, 
  delay = 0, 
  className = "" 
}: AnimatedContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
