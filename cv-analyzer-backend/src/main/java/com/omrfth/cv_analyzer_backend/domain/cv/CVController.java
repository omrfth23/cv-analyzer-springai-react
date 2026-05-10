package com.omrfth.cv_analyzer_backend.domain.cv;

import com.omrfth.cv_analyzer_backend.domain.analysis.AnalysisService;
import com.omrfth.cv_analyzer_backend.shared.dto.AnalysisRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/cv")
@RequiredArgsConstructor
public class CVController {

    private final CVService cvService;
    private final AnalysisService analysisService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Long>> upload(
            @RequestPart("file") MultipartFile file,
            @AuthenticationPrincipal UserDetails user) {

        String email = user != null ? user.getUsername() : "test@test.com";
        CV cv = cvService.upload(file, email);
        return ResponseEntity.ok(Map.of("cvId", cv.getId()));
    }

    @PostMapping("/{cvId}/analyze")
    public ResponseEntity<Void> analyze(
            @PathVariable Long cvId,
            @RequestBody AnalysisRequest request) {
        analysisService.startAnalysisAsync(cvId, request);
        return ResponseEntity.accepted().build();
    }
}
