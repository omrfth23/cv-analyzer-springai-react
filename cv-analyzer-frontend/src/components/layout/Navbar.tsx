import { useAnalysisStore } from "@/store/analysisStore";

const TECH_BADGES = ["Spring Boot", "React 18", "AI Engine", "WebSocket"];

export const Navbar = () => {
  const { setView, reset } = useAnalysisStore();

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      borderBottom: "1px solid #0f172a",
      background: "#060b14e0", backdropFilter: "blur(20px)",
      padding: "0 2rem", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        onClick={() => { reset(); setView("landing"); }}
      >
        <span style={{ fontSize: "1.4rem" }}>🤖</span>
        <span style={{ fontWeight: 800, color: "#f1f5f9", fontFamily: "'Syne', sans-serif" }}>
          CV Analyzer
        </span>
        <span style={{
          background: "#064e3b", color: "#6ee7b7",
          fontSize: 10, fontWeight: 700,
          borderRadius: 4, padding: "2px 6px", letterSpacing: 1,
        }}>PRO</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {TECH_BADGES.map((t) => (
          <span key={t} style={{
            fontSize: 12, color: "#374151",
            padding: "4px 10px", background: "#0f172a",
            borderRadius: 6, fontFamily: "monospace",
          }}>{t}</span>
        ))}
      </div>
    </nav>
  );
};