import axiosClient from "./axiosClient";
import type { AnalysisResult } from "@/types";

export const uploadCV = async (file: File): Promise<{ cvId: number }> => {
  const form = new FormData();
  form.append("file", file);
  const { data } = await axiosClient.post("/cv/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const startAnalysis = async (
  cvId: number,
  githubUsername: string,
  jobDescription?: string
): Promise<void> => {
  await axiosClient.post(`/cv/${cvId}/analyze`, { githubUsername, jobDescription });
};

export const getAnalysisResult = async (cvId: number): Promise<AnalysisResult> => {
  const { data } = await axiosClient.get(`/cv/${cvId}/result`);
  return data;
};