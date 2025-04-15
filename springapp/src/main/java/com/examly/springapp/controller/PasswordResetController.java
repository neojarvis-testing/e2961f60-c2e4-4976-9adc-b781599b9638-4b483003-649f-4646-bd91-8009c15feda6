package com.examly.springapp.controller;

import com.examly.springapp.model.ResetPasswordRequestDto;
import com.examly.springapp.service.GoogleAuthenticatorService;
import com.examly.springapp.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @Autowired
    private GoogleAuthenticatorService googleAuthenticatorService;

    @PostMapping("/api/reset-password")
    public void resetPassword(@RequestParam String email) {
        passwordResetService.sendPasswordResetEmail(email);
        googleAuthenticatorService.generateSecretKey();

    }

    @PostMapping("/api/verify-reset-token")
    public ResponseEntity<?> verifyResetToken(@RequestBody ResetPasswordRequestDto resetPassword) {
        try{
            passwordResetService.verifyResetToken(resetPassword);
            return ResponseEntity.status(201).body(true);
        }catch(Exception e){
            return ResponseEntity.status(401).body(false);
        }
        
    }
}
