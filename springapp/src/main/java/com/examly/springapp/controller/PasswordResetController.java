package com.examly.springapp.controller;

import com.examly.springapp.exceptions.DuplicateResetTokenException;
import com.examly.springapp.exceptions.InvalidOtpException;
import com.examly.springapp.exceptions.InvalidTokenException;
import com.examly.springapp.exceptions.TokenExpiredException;
import com.examly.springapp.model.ResetPasswordRequestDto;
import com.examly.springapp.service.GoogleAuthenticatorService;
import com.examly.springapp.service.PasswordResetService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    
    @PostMapping("/api/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String email) {
        try {
            passwordResetService.sendPasswordResetEmail(email);
            return ResponseEntity.ok("Password reset email sent successfully.");
        }
        catch(EntityNotFoundException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
        catch (DuplicateResetTokenException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }


    @PostMapping("/api/verify-reset-token")
    public ResponseEntity<?> verifyResetToken(@RequestBody ResetPasswordRequestDto resetPassword) {
        try {
            passwordResetService.verifyResetToken(resetPassword);
            return ResponseEntity.status(201).body("Password reset successfully.");
        } catch (InvalidTokenException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
        catch(TokenExpiredException e){
            return ResponseEntity.status(410).body(e.getMessage());
        }
        catch(InvalidOtpException e){
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }
}
