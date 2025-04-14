package com.examly.springapp.service;

import com.examly.springapp.model.PasswordResetToken;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.PasswordResetTokenRepo;
import com.examly.springapp.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordResetTokenRepo passwordResetTokenRepository;


    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private GoogleAuthenticatorService googleAuthenticatorService;


    public void sendPasswordResetEmail(String email) {
        
        String result = email.replace("%40", "@");
        System.out.println(result);
        User user = userRepo.findByEmail(result).orElseThrow(() -> new RuntimeException("User not found"));
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken(token, LocalDateTime.now().plusMinutes(30), user);
        passwordResetTokenRepository.save(resetToken);


        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Password Reset Request");
        mailMessage.setText("To reset your password, click the link below:\n" + "https://8081-ccccfbfebdefbbddcfebfcdbbfbdcfeda.premiumproject.examly.io/verify-reset-token?token=" + token);

        mailSender.send(mailMessage);
    }

    public void verifyResetToken(String token, String newPassword, int otp, String secretKey) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Invalid token"));
        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        if (!googleAuthenticatorService.verifyCode(secretKey, otp)) {

            throw new RuntimeException("Invalid OTP");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
        
    }
}
