package com.omrfth.cv_analyzer_backend.domain.github;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GitHubRepo {

    private String name;
    private String description;
    private int stars;
    private String language;
    private String htmlUrl;
}
