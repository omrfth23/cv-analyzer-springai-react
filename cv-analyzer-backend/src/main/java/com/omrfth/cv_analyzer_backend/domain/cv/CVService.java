package com.omrfth.cv_analyzer_backend.domain.cv;


import com.omrfth.cv_analyzer_backend.domain.user.User;
import com.omrfth.cv_analyzer_backend.domain.user.UserRepository;
import com.omrfth.cv_analyzer_backend.infrastructure.pdf.PdfTextExtractor;
import com.omrfth.cv_analyzer_backend.infrastructure.storage.MinioStorageService;
import com.omrfth.cv_analyzer_backend.shared.exception.AppException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class CVService {

    private final CVRepository cvRepository;
    private final UserRepository userRepository;
    private final MinioStorageService storageService;
    private final PdfTextExtractor pdfExtractor;

    public CV upload(MultipartFile file, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("Kullanıcı bulunamadı", HttpStatus.NOT_FOUND));

        // 1. MinIO'ya yükle
        String objectKey = "cv/" + user.getId() + "/" + file.getOriginalFilename();
        storageService.upload(file, objectKey);

        // 2. PDF'den metin çıkar
        String text = pdfExtractor.extract(file);

        // 3. DB'ye kaydet
        CV cv = CV.builder()
                .user(user)
                .originalFileName(file.getOriginalFilename())
                .storagePath(objectKey)
                .extractedText(text)
                .status(CvStatus.UPLOADED)
                .build();

        return cvRepository.save(cv);
    }

    public CV getById(Long id) {
        return cvRepository.findById(id)
                .orElseThrow(() -> new AppException("CV bulunamadı", HttpStatus.NOT_FOUND));
    }
}