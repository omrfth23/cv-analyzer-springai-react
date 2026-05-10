package com.omrfth.cv_analyzer_backend.domain.analysis;


import com.omrfth.cv_analyzer_backend.domain.cv.CV;
import com.omrfth.cv_analyzer_backend.domain.cv.CVService;
import com.omrfth.cv_analyzer_backend.domain.github.GitHubProfile;
import com.omrfth.cv_analyzer_backend.domain.github.GitHubService;
import com.omrfth.cv_analyzer_backend.infrastructure.ai.AIAnalysisClient;
import com.omrfth.cv_analyzer_backend.shared.dto.AnalysisRequest;
import com.omrfth.cv_analyzer_backend.shared.dto.ProgressUpdate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalysisService {

    private final CVService cvService;
    private final GitHubService gitHubService;
    private final AIAnalysisClient aiClient;
    private final AnalysisResultRepository resultRepository;
    private final SimpMessagingTemplate messaging;

    @Async("analysisExecutor")
    public void startAnalysisAsync(Long cvId, AnalysisRequest request) {
        String topic = "/topic/analysis/" + cvId;
        try {
            // Step 1
            progress(topic, 10, "📄 CV okunuyor...");
            CV cv = cvService.getById(cvId);

            // Step 2
            progress(topic, 28, "🐙 GitHub profili çekiliyor...");
            GitHubProfile github = gitHubService.fetchProfile(request.getGithubUsername());

            // Step 3
            progress(topic, 55, "🤖 AI analizi yapılıyor...");
            AnalysisResult result = aiClient.analyze(cv.getExtractedText(), github, request.getJobDescription());
            result.setCv(cv);

            // Step 4
            progress(topic, 85, "💾 Sonuçlar kaydediliyor...");
            resultRepository.save(result);

            // Done
            messaging.convertAndSend(topic, new ProgressUpdate(100, "✅ Tamamlandı!", "done"));

        } catch (Exception e) {
            log.error("Analiz hatası cvId={}", cvId, e);
            messaging.convertAndSend(topic, new ProgressUpdate(0, "❌ Hata: " + e.getMessage(), "error"));
        }
    }

    private void progress(String topic, int pct, String msg) {
        messaging.convertAndSend(topic, new ProgressUpdate(pct, msg, "running"));
    }
}
