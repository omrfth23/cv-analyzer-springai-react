package com.omrfth.cv_analyzer_backend.domain.auth;

import com.omrfth.cv_analyzer_backend.domain.user.User;
import com.omrfth.cv_analyzer_backend.domain.user.UserRepository;
import com.omrfth.cv_analyzer_backend.shared.exception.AppException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authManager;

    public AuthController.AuthResponse register(AuthController.RegisterRequest req) {
        if (userRepo.existsByEmail(req.email()))
            throw new AppException("Email zaten kayıtlı", HttpStatus.CONFLICT);

        User user = User.builder()
                .email(req.email())
                .password(encoder.encode(req.password()))
                .name(req.name())
                .build();

        userRepo.save(user);
        String token = jwtUtil.generate(user.getEmail());
        return new AuthController.AuthResponse(token, user.getEmail(), user.getName());
    }

    public AuthController.AuthResponse login(AuthController.LoginRequest req) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(req.email(), req.password()));
        User user = userRepo.findByEmail(req.email())
                .orElseThrow(() -> new AppException("Kullanıcı bulunamadı", HttpStatus.NOT_FOUND));
        String token = jwtUtil.generate(user.getEmail());
        return new AuthController.AuthResponse(token, user.getEmail(), user.getName());
    }
}
