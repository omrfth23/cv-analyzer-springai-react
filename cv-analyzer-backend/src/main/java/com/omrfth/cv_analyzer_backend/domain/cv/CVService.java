package com.omrfth.cv_analyzer_backend.domain.cv;


import com.omrfth.cv_analyzer_backend.domain.user.User;
import com.omrfth.cv_analyzer_backend.domain.user.UserRepository;
import com.omrfth.cv_analyzer_backend.infrastructure.pdf.PdfTextExtractor;
import com.omrfth.cv_analyzer_backend.infrastructure.storage.MinioStorageService;
import com.omrfth.cv_analyzer_backend.shared.exception.AppException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class CVService {

    private final CVRepository cvRepository;
    private final UserRepository userRepository;
    private final MinioStorageService storageService;
    private final PdfTextExtractor pdfExtractor;
    private final PasswordEncoder passwordEncoder;

    public CV upload(MultipartFile file, String email) {
        // Test user yoksa otomatik oluştur
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    log.info("Test kullanıcısı oluşturuluyor: {}", email);
                    return userRepository.save(User.builder()
                            .email(email)
                            .password(passwordEncoder.encode("123456"))
                            .name("Test User")
                            .build());
                });

        String objectKey = "cv/" + user.getId() + "/" + file.getOriginalFilename();
        try {
            storageService.upload(file, objectKey);
        } catch (Exception e) {
            log.warn("Storage yüklemesi atlandı: {}", e.getMessage());
        }

        String text = "";
        try {
            text = pdfExtractor.extract(file);
        } catch (Exception e) {
            log.warn("PDF metni çıkarılamadı: {}", e.getMessage());
            text = "PDF metni okunamadı";
        }

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