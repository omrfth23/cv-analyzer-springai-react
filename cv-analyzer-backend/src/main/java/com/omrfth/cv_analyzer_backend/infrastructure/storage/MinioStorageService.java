package com.omrfth.cv_analyzer_backend.infrastructure.storage;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
public class MinioStorageService {

    public void upload(MultipartFile file, String objectKey) {
        // MinIO bağlantısı olmadan geliştirme için loglama yeterli
        log.info("Dosya yüklendi (mock): {} -> {}", file.getOriginalFilename(), objectKey);
    }
}