package com.omrfth.cv_analyzer_backend.infrastructure.ai;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.omrfth.cv_analyzer_backend.domain.analysis.AnalysisResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Component;

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
            // JSON fence'lerini temizle
            String clean = response.replaceAll("```json|```", "").trim();
            return objectMapper.readValue(clean, AnalysisResult.class);
        } catch (Exception e) {
            log.error("AI yanıtı parse edilemedi: {}", response, e);
            throw new RuntimeException("AI yanıtı işlenemedi");
        }
    }
}
