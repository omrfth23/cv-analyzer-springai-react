package com.omrfth.cv_analyzer_backend.domain.analysis;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnalysisResultRepository extends JpaRepository<AnalysisResult, Long> {

    Optional<AnalysisResult> findByCvId(Long cvId);

    boolean existsByCvId(Long cvId);
}
