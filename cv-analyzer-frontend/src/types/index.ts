export interface User {
  id: number;
  email: string;
  name: string;
  token: string;
}

export interface AnalysisRequest {
  cvId: number;
  githubUsername: string;
  jobDescription?: string;
}

export interface SectionScore {
  score: number;
  label: string;
  detail?: string;
  feedback?: string;
  found?: string[];
  missing?: string[];
}

export interface AtsIssue {
  type: "error" | "warning" | "info";
  text: string;
}

export interface AnalysisResult {
  id: number;
  overallScore: number;
  jobMatch: number;
  atsScore: number;
  sections: {
    skills: SectionScore;
    experience: SectionScore;
    education: SectionScore;
    github: SectionScore;
  };
  strengths: string[];
  suggestions: string[];
  atsIssues: AtsIssue[];
  createdAt: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
}

export interface GitHubLanguage {
  name: string;
  percent: number;
  color: string;
}

export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  total_stars: number;
  top_languages: GitHubLanguage[];
  top_repos: GitHubRepo[];
}

export interface ProgressUpdate {
  percentage: number;
  message: string;
  status: "running" | "done" | "error";
}

export type AppView = "landing" | "upload" | "progress" | "result";