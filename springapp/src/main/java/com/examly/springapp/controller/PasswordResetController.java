package com.examly.springapp.controller;

import com.examly.springapp.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping("/api/reset-password")
    public void resetPassword(@RequestParam String email) {
        passwordResetService.sendPasswordResetEmail(email);
    }

    @PostMapping("/verify-reset-token")
    public void verifyResetToken(@RequestParam String token, @RequestParam String newPassword, @RequestParam int otp, @RequestParam String secretKey) {
        passwordResetService.verifyResetToken(token, newPassword, otp, secretKey);
    }
}
