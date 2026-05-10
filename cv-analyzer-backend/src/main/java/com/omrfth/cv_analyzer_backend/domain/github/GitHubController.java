package com.omrfth.cv_analyzer_backend.domain.github;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/github")
@RequiredArgsConstructor
public class GitHubController {

    private final GitHubService gitHubService;

    @GetMapping("/{username}")
    public ResponseEntity<GitHubProfile> getProfile(@PathVariable String username) {
        return ResponseEntity.ok(gitHubService.fetchProfile(username));
    }
}
