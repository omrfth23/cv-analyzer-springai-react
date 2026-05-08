import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/Navbar";
import { LandingPage } from "@/pages/LandingPage";
import { UploadPage } from "@/pages/UploadPage";
import { ProgressPage } from "@/pages/ProgressPage";
import { ResultPage } from "@/pages/ResultPage";
import { useAnalysisStore } from "@/store/analysisStore";

const queryClient = new QueryClient();

const PageRouter = () => {
  const { view } = useAnalysisStore();
  return (
    <>
      {view === "landing"  && <LandingPage />}
      {view === "upload"   && <UploadPage />}
      {view === "progress" && <ProgressPage />}
      {view === "result"   && <ResultPage />}
    </>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #060b14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #f1f5f9; min-height: 100vh; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
      <Navbar />
      <main style={{ paddingTop: 60 }}>
        <PageRouter />
      </main>
    </QueryClientProvider>
  );
}