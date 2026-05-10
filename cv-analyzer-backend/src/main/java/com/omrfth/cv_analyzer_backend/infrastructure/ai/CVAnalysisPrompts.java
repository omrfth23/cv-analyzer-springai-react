package com.omrfth.cv_analyzer_backend.infrastructure.ai;

import com.cvanalyzer.domain.github.GitHubProfile;

public class CVAnalysisPrompts {

    public static String build(String cvText, GitHubProfile github, String jobDescription) {
        return """
            Sen bir uzman kariyer danışmanı ve ATS (Applicant Tracking System) uzmanısın.
            Aşağıdaki CV metnini ve GitHub profilini analiz ederek JSON formatında kapsamlı bir değerlendirme yap.

            ## CV Metni:
            %s

            ## GitHub Profili:
            - Kullanıcı: %s
            - Public Repo: %d, Takipçi: %d, Toplam Star: %d
            - En iyi repolar: %s

            ## Hedef Pozisyon:
            %s

            Aşağıdaki JSON yapısını SADECE JSON olarak döndür, açıklama ekleme:
            {
              "overallScore": <0-100>,
              "jobMatch": <0-100>,
              "atsScore": <0-100>,
              "sections": {
                "skills": { "score": <0-100>, "label": "Teknik Beceriler", "found": [...], "missing": [...] },
                "experience": { "score": <0-100>, "label": "Deneyim", "detail": "...", "feedback": "..." },
                "education": { "score": <0-100>, "label": "Eğitim", "detail": "...", "feedback": "..." },
                "github": { "score": <0-100>, "label": "GitHub Profili", "detail": "...", "feedback": "..." }
              },
              "strengths": ["...", "...", "..."],
              "suggestions": ["...", "...", "...", "..."],
              "atsIssues": [
                { "type": "error|warning|info", "text": "..." }
              ]
            }
            """.formatted(
                cvText.substring(0, Math.min(cvText.length(), 3000)),
                github.getLogin(),
                github.getPublicRepos(),
                github.getFollowers(),
                github.getTotalStars(),
                github.getTopRepos().stream().map(r -> r.getName() + "(" + r.getStars() + "★)").toList(),
                jobDescription != null ? jobDescription : "Belirtilmedi"
        );
    }
}
