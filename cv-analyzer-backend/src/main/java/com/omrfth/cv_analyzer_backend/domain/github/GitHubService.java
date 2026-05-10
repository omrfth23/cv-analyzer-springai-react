package com.omrfth.cv_analyzer_backend.domain.github;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
public class GitHubService {

    @Value("${app.github.token:}")
    private String githubToken;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://api.github.com")
            .defaultHeader("Accept", "application/vnd.github.v3+json")
            .build();

    public GitHubProfile fetchProfile(String username) {
        // Kullanıcı bilgisi
        Map<String, Object> user = webClient.get()
                .uri("/users/{u}", username)
                .headers(h -> { if (!githubToken.isBlank()) h.setBearerAuth(githubToken); })
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        // Repolar
        List<Map<String, Object>> repos = webClient.get()
                .uri("/users/{u}/repos?sort=stars&per_page=6", username)
                .headers(h -> { if (!githubToken.isBlank()) h.setBearerAuth(githubToken); })
                .retrieve()
                .bodyToFlux(Map.class)
                .collectList()
                .block();

        return GitHubProfile.builder()
                .login(username)
                .name((String) user.getOrDefault("name", username))
                .avatarUrl((String) user.get("avatar_url"))
                .bio((String) user.getOrDefault("bio", ""))
                .publicRepos((Integer) user.getOrDefault("public_repos", 0))
                .followers((Integer) user.getOrDefault("followers", 0))
                .totalStars(calculateTotalStars(repos))
                .topRepos(mapRepos(repos))
                .topLanguages(calculateLanguages(repos))
                .build();
    }

    private int calculateTotalStars(List<Map<String, Object>> repos) {
        return repos.stream()
                .mapToInt(r -> (Integer) r.getOrDefault("stargazers_count", 0))
                .sum();
    }

    private List<GitHubRepo> mapRepos(List<Map<String, Object>> repos) {
        return repos.stream().map(r -> GitHubRepo.builder()
                .name((String) r.get("name"))
                .description((String) r.getOrDefault("description", ""))
                .stars((Integer) r.getOrDefault("stargazers_count", 0))
                .language((String) r.getOrDefault("language", "Unknown"))
                .htmlUrl((String) r.get("html_url"))
                .build()).toList();
    }

    private List<Map<String, Object>> calculateLanguages(List<Map<String, Object>> repos) {
        Map<String, Integer> counts = new LinkedHashMap<>();
        repos.forEach(r -> {
            String lang = (String) r.getOrDefault("language", "Other");
            if (lang != null) counts.merge(lang, 1, Integer::sum);
        });
        int total = counts.values().stream().mapToInt(i -> i).sum();
        return counts.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(5)
                .map(e -> Map.<String, Object>of(
                        "name", e.getKey(),
                        "percent", total > 0 ? (e.getValue() * 100 / total) : 0
                )).toList();
    }
}
