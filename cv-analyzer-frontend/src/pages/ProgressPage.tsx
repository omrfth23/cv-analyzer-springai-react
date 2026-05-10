import { useEffect } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAnalysisStore } from "@/store/analysisStore";
import { useGetResult } from "@/hooks/useAnalysis";

export const ProgressPage = () => {
  const { cvId, progressUpdates, addProgress, setView } = useAnalysisStore();
  const { mutate: fetchResult, isPending } = useGetResult(cvId);

  useWebSocket({
    cvId,
    onMessage: addProgress,
    onComplete: () => fetchResult(),
  });

  // Polling mekanizması: Her 3 saniyede bir result kontrol et
  useEffect(() => {
    if (!cvId) return;
    
    const interval = setInterval(() => {
      console.log("[Polling] Checking result for cvId:", cvId);
      fetchResult();
    }, 3000);

    return () => clearInterval(interval);
  }, [cvId, fetchResult]);

  const latest = progressUpdates[progressUpdates.length - 1];
  const pct = latest?.percentage ?? 0;

  console.log("[ProgressPage] Current state:", { cvId, pct, total: progressUpdates.length, latest });

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
      <button
        onClick={() => setView("upload")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "transparent",
          border: "1px solid #374151",
          borderRadius: 8,
          padding: "8px 16px",
          color: "#94a3b8",
          fontSize: "0.9rem",
          fontWeight: 500,
          cursor: "pointer",
          marginBottom: "2rem",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#6ee7b7";
          e.currentTarget.style.color = "#6ee7b7";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#374151";
          e.currentTarget.style.color = "#94a3b8";
        }}
      >
        ← Geri Dön
      </button>
      <div style={{ fontSize: "3.5rem", marginBottom: "1.5rem", display: "inline-block", animation: "spin-slow 4s linear infinite" }}>🤖</div>
      <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#f1f5f9", marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>
        Analiz Yapılıyor
      </h2>
      <p style={{ color: "#64748b", marginBottom: "2rem" }}>
        WebSocket üzerinden gerçek zamanlı güncelleme alınıyor
      </p>

      {/* Progress bar */}
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
        <span style={{ color: "#4b5563", fontSize: 13 }}>{progressUpdates.length} adım</span>
      </div>

      {/* Terminal log */}
      <div style={{
        background: "#0a0f1a", border: "1px solid #1f2937",
        borderRadius: 12, padding: "1rem 1.2rem",
        textAlign: "left", fontFamily: "monospace",
        fontSize: 13, maxHeight: 240, overflowY: "auto",
      }}>
        <div style={{ color: "#374151", marginBottom: 8, fontSize: 11 }}>// WebSocket → /topic/analysis/{cvId}</div>
        <div style={{ color: "#6b7280", marginBottom: 8, fontSize: 11 }}>
          // Polling: Her 3s'de /cv/{cvId}/result kontrol ediliyov
        </div>
        {progressUpdates.length === 0 && (
          <div style={{ color: "#f59e0b", marginBottom: 4 }}>
            ⚠️ WebSocket bağlantı bekleniyor...
          </div>
        )}
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

      {/* Manual fetch button */}
      {pct > 0 && (
        <button
          onClick={() => fetchResult()}
          style={{
            marginTop: "2rem",
            padding: "10px 20px",
            background: "linear-gradient(135deg, #059669, #047857)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            opacity: pct < 100 ? 0.7 : 1,
          }}
        >
          {pct < 100 ? "📥 Sonuçları Yükle" : "✓ Sonuçları Gör"}
        </button>
      )}
    </div>
  );
};