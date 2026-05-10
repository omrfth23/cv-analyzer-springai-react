package com.omrfth.cv_analyzer_backend.shared.dto;

import lombok.Data;

@Data
public class AnalysisRequest {
    private String githubUsername;
    private String jobDescription;
}
