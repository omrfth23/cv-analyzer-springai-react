package com.omrfth.cv_analyzer_backend.domain.github;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GitHubProfile {

    private String login;
    private String name;
    private String avatarUrl;
    private String bio;
    private int publicRepos;
    private int followers;
    private int totalStars;
    private List<GitHubRepo> topRepos;
    private List<Map<String, Object>> topLanguages;
}
