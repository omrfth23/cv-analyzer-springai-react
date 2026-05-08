import { useEffect, useState } from "react";

interface Props {
  score: number;
  size?: number;
  stroke?: number;
}

const getColor = (score: number) =>
  score >= 80 ? "#6ee7b7" : score >= 60 ? "#fbbf24" : "#f87171";

export const ScoreRing = ({ score, size = 100, stroke = 9 }: Props) => {
  const [animated, setAnimated] = useState(0);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const color = getColor(score);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 300);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <svg
      width={size}
      height={size}
      style={{ transform: "rotate(-90deg)", filter: `drop-shadow(0 0 8px ${color}60)` }}
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1f2937" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ - (animated / 100) * circ}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.34,1.56,.64,1)" }}
      />
      <text
        x="50%" y="50%"
        textAnchor="middle" dominantBaseline="middle"
        style={{
          transform: "rotate(90deg)",
          transformOrigin: "center",
          fill: color,
          fontSize: size * 0.2,
          fontWeight: 800,
          fontFamily: "monospace",
        }}
      >
        {Math.round(animated)}
      </text>
    </svg>
  );
};