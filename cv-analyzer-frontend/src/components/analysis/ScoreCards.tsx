import { ScoreRing } from "@/components/ui/ScoreRing";
import type { AnalysisResult } from "@/types";

const CARDS = (r: AnalysisResult) => [
  { label: "Genel Skor",   value: r.overallScore,             color: "#6ee7b7", icon: "🏆" },
  { label: "İş Uyumu",     value: r.jobMatch,                 color: "#60a5fa", icon: "🎯" },
  { label: "ATS Skoru",    value: r.atsScore,                 color: "#f59e0b", icon: "🤖" },
  { label: "GitHub Skoru", value: r.sections.github.score,    color: "#a78bfa", icon: "🐙" },
];

export const ScoreCards = ({ result }: { result: AnalysisResult }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: "2rem" }}>
    {CARDS(result).map((c) => (
      <div key={c.label} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: "1.5rem", display: "flex", alignItems: "center", gap: 16 }}>
        <ScoreRing score={c.value} size={80} stroke={8} />
        <div>
          <div style={{ fontSize: "1.5rem" }}>{c.icon}</div>
          <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>{c.label}</div>
          <div style={{ color: c.color, fontWeight: 700, fontSize: "1.2rem", fontFamily: "monospace" }}>{c.value}/100</div>
        </div>
      </div>
    ))}
  </div>
);