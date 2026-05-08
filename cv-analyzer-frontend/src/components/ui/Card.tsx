import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const Card = ({ title, children, delay = 0 }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    style={{
      background: "#0f172a",
      border: "1px solid #1e293b",
      borderRadius: 16,
      padding: "1.5rem",
    }}
  >
    {title && (
      <h3 style={{
        color: "#e2e8f0", fontWeight: 700, fontSize: "0.95rem",
        marginBottom: "1.2rem", fontFamily: "'Syne', sans-serif",
      }}>
        {title}
      </h3>
    )}
    {children}
  </motion.div>
);