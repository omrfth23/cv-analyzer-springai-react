package com.omrfth.cv_analyzer_backend.domain.cv;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CVRepository extends JpaRepository<CV, Long> {

    List<CV> findByUserIdOrderByUploadedAtDesc(Long userId);

    boolean existsByUserIdAndOriginalFileName(Long userId, String fileName);
}
