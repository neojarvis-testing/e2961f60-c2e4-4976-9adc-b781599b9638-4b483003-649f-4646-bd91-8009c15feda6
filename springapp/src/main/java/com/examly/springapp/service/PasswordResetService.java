package com.examly.springapp.service;

import com.examly.springapp.exceptions.DuplicateResetTokenException;
import com.examly.springapp.exceptions.InvalidOtpException;
import com.examly.springapp.exceptions.InvalidTokenException;
import com.examly.springapp.exceptions.TokenExpiredException;
import com.examly.springapp.model.PasswordResetToken;
import com.examly.springapp.model.ResetPasswordRequestDto;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.PasswordResetTokenRepo;
import com.examly.springapp.repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordResetTokenRepo passwordResetTokenRepository;

    @Autowired
    private JavaMailSender mailSender;
    // private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private GoogleAuthenticatorService googleAuthenticatorService;

    public void sendPasswordResetEmail(String email) throws DuplicateResetTokenException{

        String result = email.replace("%40", "@");
        System.out.println(result);

        User user = userRepo.findByEmail(result).orElseThrow(() -> new EntityNotFoundException("User not found"));
        

        // Check if a valid token already exists for the user
        Optional<PasswordResetToken> existingToken = passwordResetTokenRepository.findByUser(user);
        
        if(existingToken.isPresent()){
            throw new DuplicateResetTokenException("A valid reset token already exists for this user. Please wait until it expires.");
        }

        String token = UUID.randomUUID().toString();

        String secretKey = googleAuthenticatorService.generateSecretKey(); // Generate new secret key
        System.out.println(secretKey);

        user.setSecretKey(secretKey); // Store secret key securely in the database
        userRepo.save(user); // Save the updated user with the secret key

        PasswordResetToken resetToken = new PasswordResetToken(token, LocalDateTime.now().plusMinutes(30), user);
        passwordResetTokenRepository.save(resetToken);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Password Reset Request");
        mailMessage.setText("To reset your password, click the link below:\n" +
                "https://8081-ccccfbfebdefbbddcfebfcdbbfbdcfeda.premiumproject.examly.io/verify-reset-token?token="
                + token +
                "\n\nAdditionally, set up Google Authenticator using the following information:\n" +
                "Your Google Authenticator Secret Key: " + secretKey +
                "\nEnter this key in Google Authenticator to generate your OTPs.");
        mailSender.send(mailMessage);
    }

    public void verifyResetToken(ResetPasswordRequestDto passwordDetails) {

        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(passwordDetails.getToken())
                .orElseThrow(() -> new InvalidTokenException("Invalid token"));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
             throw new TokenExpiredException("Token expired");
        }

        User user = resetToken.getUser();
        String storedSecretKey = user.getSecretKey(); // Fetch secret key from DB

        if (!googleAuthenticatorService.verifyCode(storedSecretKey, passwordDetails.getOtp())) {
            throw new InvalidOtpException("Invalid OTP");
        }

        user.setPassword(passwordEncoder.encode(passwordDetails.getNewPassword()));
        userRepo.save(user);
    }

}
