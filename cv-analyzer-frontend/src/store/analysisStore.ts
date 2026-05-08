import { create } from "zustand";
import type { AnalysisResult, GitHubProfile, ProgressUpdate, AppView } from "@/types";

interface AnalysisState {
  view: AppView;
  cvId: number | null;
  githubUsername: string;
  jobDescription: string;
  progressUpdates: ProgressUpdate[];
  result: AnalysisResult | null;
  githubProfile: GitHubProfile | null;

  setView: (v: AppView) => void;
  setCvId: (id: number) => void;
  setGithubUsername: (u: string) => void;
  setJobDescription: (d: string) => void;
  addProgress: (p: ProgressUpdate) => void;
  setResult: (r: AnalysisResult) => void;
  setGithubProfile: (g: GitHubProfile) => void;
  reset: () => void;
}

const initialState = {
  view: "landing" as AppView,
  cvId: null,
  githubUsername: "",
  jobDescription: "",
  progressUpdates: [],
  result: null,
  githubProfile: null,
};

export const useAnalysisStore = create<AnalysisState>((set) => ({
  ...initialState,
  setView: (view) => set({ view }),
  setCvId: (cvId) => set({ cvId }),
  setGithubUsername: (githubUsername) => set({ githubUsername }),
  setJobDescription: (jobDescription) => set({ jobDescription }),
  addProgress: (p) => set((s) => ({ progressUpdates: [...s.progressUpdates, p] })),
  setResult: (result) => set({ result }),
  setGithubProfile: (githubProfile) => set({ githubProfile }),
  reset: () => set(initialState),
}));