import { Card } from "@/components/ui/Card";

export const SuggestionsSection = ({ suggestions }: { suggestions: string[] }) => (
  <Card title="💡 Geliştirme Önerileri">
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {suggestions.map((s, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "flex-start", gap: 14,
          padding: "14px 18px", background: "#0f172a",
          borderRadius: 12, border: "1px solid #1e293b",
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "#064e3b", color: "#6ee7b7",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 13, flexShrink: 0,
          }}>
            {i + 1}
          </div>
          <span style={{ color: "#cbd5e1", lineHeight: 1.6, fontSize: 15 }}>{s}</span>
        </div>
      ))}
    </div>
  </Card>
);