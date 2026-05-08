import { useMutation } from "@tanstack/react-query";
import { uploadCV, startAnalysis, getAnalysisResult } from "@/api/cvApi";
import { fetchGithubProfile } from "@/api/githubApi";
import { useAnalysisStore } from "@/store/analysisStore";

export const useUploadAndAnalyze = () => {
  const { setCvId, setView, setGithubProfile, githubUsername, jobDescription } = useAnalysisStore();

  return useMutation({
    mutationFn: async (file: File) => {
      const { cvId } = await uploadCV(file);
      setCvId(cvId);

      const [profile] = await Promise.all([
        fetchGithubProfile(githubUsername),
        startAnalysis(cvId, githubUsername, jobDescription),
      ]);

      setGithubProfile(profile);
      return cvId;
    },
    onSuccess: () => setView("progress"),
  });
};

export const useGetResult = (cvId: number | null) => {
  const { setResult, setView } = useAnalysisStore();

  return useMutation({
    mutationFn: () => getAnalysisResult(cvId!),
    onSuccess: (data) => {
      setResult(data);
      setView("result");
    },
  });
};