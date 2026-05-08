import { Card } from "@/components/ui/Card";
import type { AtsIssue } from "@/types";

const BG: Record<AtsIssue["type"], string> = {
  error:   "#450a0a20",
  warning: "#78350f20",
  info:    "#0c4a6e20",
};
const ICON: Record<AtsIssue["type"], string> = { error: "🔴", warning: "🟡", info: "🔵" };

export const AtsSection = ({ issues }: { issues: AtsIssue[] }) => (
  <Card title="⚠️ ATS Uyumluluk" delay={0.1}>
    {issues.map((a, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "10px 14px", borderRadius: 10, background: BG[a.type] }}>
        <span>{ICON[a.type]}</span>
        <span style={{ color: "#cbd5e1", fontSize: 14 }}>{a.text}</span>
      </div>
    ))}
  </Card>
);