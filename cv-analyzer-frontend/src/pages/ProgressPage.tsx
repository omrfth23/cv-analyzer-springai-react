import { useEffect, useRef } from "react";
import { useAnalysisStore } from "@/store/analysisStore";
import { getAnalysisResult } from "@/api/cvApi";

const STEPS = [
  { pct: 10,  msg: "📄 CV okunuyor ve parse ediliyor..." },
  { pct: 28,  msg: "🐙 GitHub profili çekiliyor..." },
  { pct: 45,  msg: "🔍 Repo'lar analiz ediliyor..." },
  { pct: 63,  msg: "🤖 AI motoru CV'yi değerlendiriyor..." },
  { pct: 80,  msg: "📊 Skor hesaplanıyor..." },
  { pct: 94,  msg: "✨ Öneriler oluşturuluyor..." },
  { pct: 100, msg: "🎉 Analiz tamamlandı!" },
];

export const ProgressPage = () => {
  const { cvId, progressUpdates, addProgress, setResult, setView } = useAnalysisStore();
  const latest = progressUpdates[progressUpdates.length - 1];
  const pct = latest?.percentage ?? 0;
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const run = async () => {
      for (const step of STEPS) {
        await new Promise((r) => setTimeout(r, 900));
        addProgress({ percentage: step.pct, message: step.msg, status: "running" });
      }

      let attempts = 0;
      while (attempts < 10) {
        await new Promise((r) => setTimeout(r, 1500));
        try {
          const result = await getAnalysisResult(cvId!);
          if (result) {
            setResult(result);
            setView("result");
            return;
          }
        } catch {
          attempts++;
        }
      }
      console.error("Sonuç alınamadı");
    };

    run();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
      <div style={{
        fontSize: "3.5rem", marginBottom: "1.5rem",
        display: "inline-block", animation: "spin-slow 4s linear infinite",
      }}>🤖</div>

      <h2 style={{
        fontSize: "1.8rem", fontWeight: 800, color: "#f1f5f9",
        marginBottom: 8, fontFamily: "'Syne', sans-serif",
      }}>
        Analiz Yapılıyor
      </h2>
      <p style={{ color: "#64748b", marginBottom: "2rem" }}>
        Sonuçlar hazırlanıyor, lütfen bekleyin...
      </p>

      <div style={{ background: "#111827", borderRadius: 99, height: 10, overflow: "hidden", marginBottom: 8 }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: "linear-gradient(90deg, #059669, #6ee7b7)",
          borderRadius: 99, transition: "width 0.8s ease",
          boxShadow: "0 0 16px #6ee7b740",
        }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <span style={{ color: "#6ee7b7", fontWeight: 700, fontFamily: "monospace" }}>{pct}%</span>
        <span style={{ color: "#4b5563", fontSize: 13 }}>{progressUpdates.length}/{STEPS.length} adım</span>
      </div>

      <div style={{
        background: "#0a0f1a", border: "1px solid #1f2937",
        borderRadius: 12, padding: "1rem 1.2rem",
        textAlign: "left", fontFamily: "monospace",
        fontSize: 13, maxHeight: 240, overflowY: "auto",
      }}>
        <div style={{ color: "#374151", marginBottom: 8, fontSize: 11 }}>
          // CV analizi başlatıldı → cvId: {cvId}
        </div>
        {progressUpdates.map((p, i) => (
          <div key={i} style={{
            color: i === progressUpdates.length - 1 ? "#6ee7b7" : "#4b5563",
            marginBottom: 4,
          }}>
            <span style={{ color: "#1f2937" }}>[{new Date().toLocaleTimeString()}] </span>
            {p.message}
          </div>
        ))}
        {pct < 100 && <span style={{ color: "#6ee7b7", animation: "blink 1s infinite" }}>▌</span>}
      </div>
    </div>
  );
};