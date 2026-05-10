import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useAnalysisStore } from "@/store/analysisStore";

const STATS = [
  ["10s", "Analiz Süresi"],
  ["AI", "Destekli Motor"],
  ["ATS", "Uyumluluk"],
  ["GitHub", "Entegrasyon"],
];

export const LandingPage = () => {
  const { setView } = useAnalysisStore();
  const title = useTypewriter("CV Analyzer Pro", 65);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #064e3b18, transparent), radial-gradient(ellipse 60% 40% at 80% 80%, #1e3a5f20, transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(#6ee7b708 1px, transparent 1px), linear-gradient(90deg, #6ee7b708 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ position: "relative", maxWidth: 720 }}
      >
        {/* Live badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            background: "transparent",
            border: "1px solid #6ee7b740",
            borderRadius: 4,
            padding: "3px 10px",
            marginBottom: "1.2rem",
            fontSize: 10,
            color: "#6ee7b790",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#6ee7b7",
              display: "inline-block",
              flexShrink: 0,
              animation: "pulse 2s infinite",
            }}
          />
          Spring Boot · React · AI
        </div>

        <h1
          style={{
            fontSize: "clamp(1.5rem, 5vw, 3rem)",
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: "1.5rem",
            fontFamily: "'Syne', sans-serif",
            letterSpacing: "-1px",
          }}
        >
          <span style={{ color: "#f1f5f9" }}>{title}</span>
          <span
            style={{
              display: "block",
              background: "linear-gradient(135deg, #6ee7b7, #34d399, #059669)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginTop: "-0.2rem",
            }}
          >
            Intelligence
          </span>
        </h1>

        <p
          style={{
            fontSize: "1.15rem",
            color: "#94a3b8",
            lineHeight: 1.7,
            maxWidth: 520,
            margin: "0 auto 3rem",
          }}
        >
          CV'nizi yükleyin, GitHub profilinizi bağlayın.{" "}
          <strong style={{ color: "#e2e8f0" }}>
            AI motorumuz anlık analiz
          </strong>{" "}
          yaparak kariyer hedefinize uygunluğunuzu ölçsün.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setView("upload")}
            style={{
              background: "linear-gradient(135deg, #059669, #047857)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "16px 40px",
              fontSize: "1.05rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 40px #05966940",
            }}
          >
            🚀 Analizi Başlat
          </button>
          <button
            onClick={() => setView("upload")}
            style={{
              background: "transparent",
              color: "#94a3b8",
              border: "1px solid #374151",
              borderRadius: 12,
              padding: "16px 32px",
              fontSize: "1.05rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Demo Gör →
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            marginTop: "5rem",
            display: "flex",
            gap: 48,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {STATS.map(([value, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 900,
                  color: "#6ee7b7",
                  fontFamily: "monospace",
                }}
              >
                {value}
              </div>
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
