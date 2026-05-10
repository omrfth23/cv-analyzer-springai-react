package com.omrfth.cv_analyzer_backend.infrastructure.ai;

import com.omrfth.cv_analyzer_backend.domain.analysis.AnalysisResult;
import com.omrfth.cv_analyzer_backend.domain.github.GitHubProfile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

@Component
@Slf4j
public class AIAnalysisClient {

    public AnalysisResult analyze(String cvText, GitHubProfile github, String jobDescription) {
        log.info("Mock AI analizi yapılıyor — GitHub: {}", github.getLogin());

        return AnalysisResult.builder()
                .overallScore(87)
                .jobMatch(78)
                .atsScore(72)
                .sections(Map.of(
                        "skills", Map.of(
                                "score", 90,
                                "label", "Teknik Beceriler",
                                "found", List.of("Spring Boot", "React", "Docker", "PostgreSQL"),
                                "missing", List.of("Kubernetes", "GraphQL")
                        ),
                        "experience", Map.of(
                                "score", 85,
                                "label", "Deneyim",
                                "detail", "3 yıl tespit edildi",
                                "feedback", "Liderlik deneyiminizi vurgulayın."
                        ),
                        "education", Map.of(
                                "score", 80,
                                "label", "Eğitim",
                                "detail", "Bilgisayar Mühendisliği",
                                "feedback", "Sertifikalar eklenebilir."
                        ),
                        "github", Map.of(
                                "score", 92,
                                "label", "GitHub Profili",
                                "detail", github.getPublicRepos() + " public repo, " + github.getTotalStars() + " star",
                                "feedback", "README kalitesini artırın."
                        )
                ))
                .strengths(List.of(
                        "Güçlü Spring Boot ve microservices deneyimi",
                        "Aktif GitHub katkısı (" + github.getTotalStars() + " star)",
                        "Full-stack yetkinlik",
                        "Docker & CI/CD bilgisi"
                ))
                .suggestions(List.of(
                        "Kubernetes / Helm deneyimi ekleyin",
                        "Tablo yerine düz metin kullanın (ATS uyumu)",
                        "Proje metriklerini sayılarla destekleyin",
                        "LinkedIn bağlantısını CV'ye ekleyin"
                ))
                .atsIssues(List.of(
                        Map.of("type", "warning", "text", "Tablo kullanımı ATS'i zorluyor"),
                        Map.of("type", "info",    "text", "Font boyutu ideal aralıkta"),
                        Map.of("type", "error",   "text", "İletişim bilgileri header dışında")
                ))
                .build();
    }
}


//ACTUAL AI ANALYSIS OPERATIONS
/*
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
} */