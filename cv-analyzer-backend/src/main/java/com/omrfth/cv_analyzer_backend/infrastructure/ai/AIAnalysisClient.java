package com.omrfth.cv_analyzer_backend.infrastructure.ai;

import com.omrfth.cv_analyzer_backend.domain.analysis.AnalysisResult;
import com.omrfth.cv_analyzer_backend.domain.github.GitHubProfile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

@Component
@RequiredArgsConstructor
@Slf4j
public class AIAnalysisClient {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;

    public AnalysisResult analyze(String cvText, GitHubProfile github, String jobDescription) {
        String prompt = CVAnalysisPrompts.build(cvText, github, jobDescription);

        String response = chatClient.prompt()
                .user(prompt)
                .call()
                .content();

        try {
            String clean = response.replaceAll("(?s)```json|```", "").trim();
            AnalysisResultDto dto = objectMapper.readValue(clean, AnalysisResultDto.class);
            return mapToEntity(dto);
        } catch (Exception e) {
            log.error("AI yanıtı parse edilemedi. Yanıt: {}", response, e);
            throw new RuntimeException("AI yanıtı işlenemedi: " + e.getMessage());
        }
    }

    private AnalysisResult mapToEntity(AnalysisResultDto dto) {
        return AnalysisResult.builder()
                .overallScore(dto.getOverallScore())
                .jobMatch(dto.getJobMatch())
                .atsScore(dto.getAtsScore())
                .sections(dto.getSections())
                .strengths(dto.getStrengths())
                .suggestions(dto.getSuggestions())
                .atsIssues(dto.getAtsIssues())
                .build();
    }
}
