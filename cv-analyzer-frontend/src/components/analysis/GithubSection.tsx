import { Card } from "@/components/ui/Card";
import type { GitHubProfile } from "@/types";

export const GithubSection = ({ profile, githubScore }: { profile: GitHubProfile; githubScore: number }) => (
  <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16 }}>
    <Card title="👤 GitHub Profili">
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <img src={profile.avatar_url} alt="avatar" style={{ width: 72, height: 72, borderRadius: "50%", border: "3px solid #6ee7b730", marginBottom: 12 }} />
        <div style={{ color: "#f1f5f9", fontWeight: 700 }}>{profile.name}</div>
        <div style={{ color: "#4b5563", fontSize: 13, fontFamily: "monospace" }}>@{profile.login}</div>
        <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>{profile.bio}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, textAlign: "center" }}>
        {[["Repos", profile.public_repos], ["Takipçi", profile.followers], ["Stars", profile.total_stars]].map(([l, v]) => (
          <div key={l} style={{ background: "#0f172a", borderRadius: 10, padding: "10px 6px" }}>
            <div style={{ color: "#6ee7b7", fontWeight: 800, fontFamily: "monospace" }}>{v}</div>
            <div style={{ color: "#4b5563", fontSize: 11 }}>{l}</div>
          </div>
        ))}
      </div>
    </Card>

    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card title="🗣️ Dil Dağılımı">
        {profile.top_languages.map((l, i) => (
          <div key={l.name} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: l.color, display: "inline-block" }} />
                <span style={{ color: "#cbd5e1", fontSize: 13 }}>{l.name}</span>
              </span>
              <span style={{ color: "#6b7280", fontSize: 13, fontFamily: "monospace" }}>{l.percent}%</span>
            </div>
            <div style={{ background: "#111827", borderRadius: 99, height: 7, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${l.percent}%`, background: l.color, borderRadius: 99, transition: `width 1s ease ${i * 0.1}s` }} />
            </div>
          </div>
        ))}
      </Card>

      <Card title="⭐ En İyi Repolar">
        {profile.top_repos.map((r) => (
          <div key={r.name} style={{ background: "#0f172a", borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div>
              <div style={{ color: "#60a5fa", fontWeight: 600, fontFamily: "monospace", fontSize: 14 }}>{r.name}</div>
              <div style={{ color: "#4b5563", fontSize: 12, marginTop: 2 }}>{r.description}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
              <div style={{ color: "#f59e0b", fontWeight: 700, fontSize: 13 }}>⭐ {r.stargazers_count}</div>
              <div style={{ color: "#374151", fontSize: 11 }}>{r.language}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  </div>
);