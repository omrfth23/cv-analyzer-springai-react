interface Props {
  label: string;
  variant?: "success" | "error" | "info" | "default";
}

const colors = {
  success: { bg: "#064e3b30", text: "#6ee7b7", border: "#065f4620" },
  error:   { bg: "#450a0a20", text: "#f87171",  border: "#7f1d1d20" },
  info:    { bg: "#0c4a6e20", text: "#60a5fa",  border: "#1e3a5f20" },
  default: { bg: "#1f293740", text: "#94a3b8",  border: "#37415120" },
};

export const Badge = ({ label, variant = "default" }: Props) => {
  const c = colors[variant];
  return (
    <span style={{
      background: c.bg, color: c.text,
      border: `1px solid ${c.border}`,
      borderRadius: 99, padding: "4px 12px",
      fontSize: 13, fontWeight: 600,
    }}>
      {label}
    </span>
  );
};