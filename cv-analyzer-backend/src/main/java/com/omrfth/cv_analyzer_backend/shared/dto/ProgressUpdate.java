package com.omrfth.cv_analyzer_backend.shared.dto;

import lombok.*;

@Data @AllArgsConstructor @NoArgsConstructor
public class ProgressUpdate {
    private int percentage;
    private String message;
    private String status; // "running" | "done" | "error"
}
