import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { useAnalysisStore } from "@/store/analysisStore";
import { useUploadAndAnalyze } from "@/hooks/useAnalysis";

export const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const { githubUsername, jobDescription, setGithubUsername, setJobDescription, setView } = useAnalysisStore();
  const { mutate, isPending } = useUploadAndAnalyze();

  const onDrop = useCallback((files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setError("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { "application/pdf": [".pdf"] }, maxSize: 10 * 1024 * 1024,
  });

  const handleSubmit = () => {
    if (!file) {
      setError("📄 Lütfen bir PDF dosyası yükleyin");
      return;
    }
    if (!githubUsername.trim()) {
      setError("🐙 Lütfen GitHub kullanıcı adınızı girin");
      return;
    }
    if (!jobDescription.trim()) {
      setError("💼 Lütfen hedef pozisyonunuzu girin");
      return;
    }
    
    setError("");
    mutate(file);
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <button
          onClick={() => setView("landing")}
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
        <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#f1f5f9", fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8 }}>
          Analizi Yapılandır
        </h2>
        <p style={{ color: "#64748b", marginBottom: "2.5rem" }}>CV'nizi yükleyin ve tercihlerinizi ayarlayın</p>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          style={{
            border: `2px dashed ${isDragActive ? "#6ee7b7" : file ? "#059669" : "#374151"}`,
            borderRadius: 16, padding: "3rem", textAlign: "center",
            cursor: "pointer", transition: "all 0.3s",
            background: isDragActive ? "#064e3b10" : "transparent",
            marginBottom: "1.5rem",
          }}
        >
          <input {...getInputProps()} />
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{file ? "✅" : "📄"}</div>
          <div style={{ color: file ? "#6ee7b7" : "#94a3b8", fontWeight: 600, fontSize: "1.05rem" }}>
            {file ? file.name : "PDF'inizi buraya sürükleyin veya tıklayın"}
          </div>
          {!file && <div style={{ color: "#4b5563", fontSize: 13, marginTop: 8 }}>Maksimum 10 MB • PDF formatı</div>}
        </div>

        {/* Inputs */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: "1.5rem" }}>
          {[
            { label: "GitHub Kullanıcı Adı", icon: "🐙", value: githubUsername, onChange: setGithubUsername, placeholder: "omrfth23", mono: true },
            { label: "Hedef Pozisyon", icon: "💼", value: jobDescription, onChange: setJobDescription, placeholder: "Senior Backend Engineer", mono: false },
          ].map(({ label, icon, value, onChange, placeholder, mono }) => (
            <div key={label}>
              <label style={{ display: "block", color: "#94a3b8", fontSize: 12, fontWeight: 600, marginBottom: 8, letterSpacing: 0.5, textTransform: "uppercase" }}>
                {label}
              </label>
              <div style={{ display: "flex", alignItems: "center", background: "#111827", border: "1px solid #1f2937", borderRadius: 10, padding: "12px 16px", gap: 10 }}>
                <span>{icon}</span>
                <input
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  style={{
                    background: "transparent", border: "none", outline: "none",
                    color: "#e2e8f0", fontSize: "0.95rem", width: "100%",
                    fontFamily: mono ? "monospace" : "inherit",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "#7f1d1d",
              border: "1px solid #dc2626",
              borderRadius: 10,
              padding: "14px 16px",
              marginBottom: "1.5rem",
              color: "#fca5a5",
              fontSize: "0.95rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>⚠️</span>
            {error}
          </motion.div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!file || isPending}
          style={{
            width: "100%", padding: "18px",
            background: "linear-gradient(135deg, #059669, #047857)",
            border: "none", borderRadius: 12, color: "#fff",
            fontWeight: 800, fontSize: "1.1rem", cursor: "pointer",
            opacity: (!file || isPending) ? 0.5 : 1,
            boxShadow: "0 0 40px #05966930",
          }}
        >
          {isPending ? "⏳ Yükleniyor..." : "🤖 AI Analizini Başlat"}
        </button>
      </motion.div>
    </div>
  );
};