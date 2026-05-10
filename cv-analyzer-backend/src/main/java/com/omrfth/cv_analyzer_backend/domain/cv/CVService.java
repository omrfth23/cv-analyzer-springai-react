package com.omrfth.cv_analyzer_backend.domain.cv;


import com.omrfth.cv_analyzer_backend.domain.user.User;
import com.omrfth.cv_analyzer_backend.domain.user.UserRepository;
import com.omrfth.cv_analyzer_backend.infrastructure.pdf.PdfTextExtractor;
import com.omrfth.cv_analyzer_backend.infrastructure.storage.MinioStorageService;
import com.omrfth.cv_analyzer_backend.shared.exception.AppException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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

    public CV upload(MultipartFile file, String email) {

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    log.warn("Kullanıcı bulunamadı, guest olarak devam ediliyor: {}", email);
                    return userRepository.findAll()
                            .stream().findFirst()
                            .orElseThrow(() -> new AppException("Hiç kullanıcı yok, önce kayıt olun", HttpStatus.NOT_FOUND));
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