package com.omrfth.cv_analyzer_backend.domain.analysis;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/analysis")
@RequiredArgsConstructor
public class AnalysisController {

    private final AnalysisResultRepository analysisResultRepository;

    @GetMapping("/{cvId}")
    public ResponseEntity<AnalysisResult> getResult(@PathVariable Long cvId) {
        return analysisResultRepository.findByCvId(cvId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
