import { useState } from "react";
import { useAnalysisStore } from "@/store/analysisStore";
import { Card } from "@/components/ui/Card";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { Badge } from "@/components/ui/Badge";
import { ScoreCards } from "@/components/analysis/ScoreCards";
import { GithubSection } from "@/components/analysis/GithubSection";
import { SuggestionsSection } from "@/components/analysis/SuggestionsSection";
import { AtsSection } from "@/components/analysis/AtsSection";

const TABS = [
  { id: "overview", label: "📊 Genel" },
  { id: "github",   label: "🐙 GitHub" },
  { id: "sections", label: "📋 Bölümler" },
  { id: "suggestions", label: "💡 Öneriler" },
] as const;

type Tab = typeof TABS[number]["id"];

export const ResultPage = () => {
  const [tab, setTab] = useState<Tab>("overview");
  const { result, githubProfile, reset, setView } = useAnalysisStore();
  if (!result) return null;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#f1f5f9", fontFamily: "'Space Grotesk', sans-serif" }}>Analiz Sonuçları</h2>
          <p style={{ color: "#4b5563", marginTop: 4 }}>
            Tamamlandı • {new Date(result.createdAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => setView("landing")} style={{ background: "transparent", color: "#94a3b8", border: "1px solid #374151", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontSize: 14 }}>← Ana Sayfa</button>
          <button onClick={() => { reset(); setView("upload"); }} style={{ background: "transparent", color: "#94a3b8", border: "1px solid #374151", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontSize: 14 }}>🔄 Yeni Analiz</button>
          <button style={{ background: "linear-gradient(135deg, #059669, #047857)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>📥 Rapor İndir</button>
        </div>
      </div>

      <ScoreCards result={result} />

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 4, background: "#0f172a", borderRadius: 12, padding: 4, marginBottom: "1.5rem", border: "1px solid #1e293b", width: "fit-content" }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "9px 20px", borderRadius: 9, border: "none", cursor: "pointer",
            fontWeight: 600, fontSize: 14, transition: "all 0.2s",
            background: tab === t.id ? "#1e293b" : "transparent",
            color: tab === t.id ? "#6ee7b7" : "#4b5563",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card title="💪 Güçlü Yönler" delay={0}>
            {result.strengths.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                <span style={{ color: "#6ee7b7", flexShrink: 0, marginTop: 2 }}>✓</span>
                <span style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.5 }}>{s}</span>
              </div>
            ))}
          </Card>
          <AtsSection issues={result.atsIssues} />
          <Card title="🧠 Beceriler" delay={0.2} style={{ gridColumn: "1/-1" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {result.sections.skills.found?.map((s) => <Badge key={s} label={s} variant="success" />)}
              {result.sections.skills.missing?.map((s) => <Badge key={s} label={`– ${s}`} variant="error" />)}
            </div>
          </Card>
        </div>
      )}

      {tab === "github" && githubProfile && <GithubSection profile={githubProfile} githubScore={result.sections.github.score} />}

      {tab === "sections" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {Object.entries(result.sections).map(([, section], i) => (
            <Card key={section.label} title={section.label} delay={i * 0.1}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: 12 }}>
                <ScoreRing score={section.score} size={88} />
                <div>
                  {section.detail && <div style={{ color: "#6ee7b7", fontWeight: 700, marginBottom: 6 }}>{section.detail}</div>}
                  {section.feedback && <div style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.5 }}>{section.feedback}</div>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "suggestions" && <SuggestionsSection suggestions={result.suggestions} />}
    </div>
  );
};