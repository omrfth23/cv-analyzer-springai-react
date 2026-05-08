import axiosClient from "./axiosClient";
import type { GitHubProfile } from "@/types";

export const fetchGithubProfile = async (username: string): Promise<GitHubProfile> => {
  const { data } = await axiosClient.get(`/github/${username}`);
  return data;
};