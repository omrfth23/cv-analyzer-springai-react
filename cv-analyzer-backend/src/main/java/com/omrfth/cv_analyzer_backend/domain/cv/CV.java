package com.omrfth.cv_analyzer_backend.domain.cv;


import com.omrfth.cv_analyzer_backend.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "cvs")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CV {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String originalFileName;
    private String storagePath;

    @Column(columnDefinition = "TEXT")  // VARCHAR(255) yerine TEXT
    private String extractedText;

    @Enumerated(EnumType.STRING)
    private CvStatus status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime uploadedAt;

    @PrePersist
    public void prePersist() { this.uploadedAt = LocalDateTime.now(); }
}