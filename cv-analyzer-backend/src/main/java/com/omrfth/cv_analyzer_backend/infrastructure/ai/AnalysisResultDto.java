package com.omrfth.cv_analyzer_backend.infrastructure.ai;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AnalysisResultDto {

    @JsonProperty("overallScore")
    private int overallScore;

    @JsonProperty("jobMatch")
    private int jobMatch;

    @JsonProperty("atsScore")
    private int atsScore;

    @JsonProperty("sections")
    private Map<String, Object> sections;

    @JsonProperty("strengths")
    private List<String> strengths;

    @JsonProperty("suggestions")
    private List<String> suggestions;

    @JsonProperty("atsIssues")
    private List<Map<String, String>> atsIssues;
}