package com.examly.springapp.repository;

import com.examly.springapp.model.PasswordResetToken;
import com.examly.springapp.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PasswordResetTokenRepo extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);

    @Query("SELECT p FROM PasswordResetToken p where p.user = :user")
    public Optional<PasswordResetToken> findByUser(User user);
}
