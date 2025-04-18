package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackService;

import jakarta.persistence.EntityNotFoundException;

@RestController
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }
    
    @PostMapping("/api/feedback")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createFeedback(@RequestBody Feedback feedback) {
        if (feedbackService.feedbackExistsForFood(feedback.getUser().getUserId(), feedback.getFood().getFoodId())) {
            return ResponseEntity.status(400).body("Duplicate feedback for this food is not allowed.");
        }
        Feedback createdFeedback = feedbackService.createFeedback(feedback);
        return ResponseEntity.status(201).body(createdFeedback);
    }

    @GetMapping("/api/feedback/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> getFeedbackById(@PathVariable Long id) {
        try {
            Feedback feedback = feedbackService.getFeedbackById(id);
            return ResponseEntity.status(200).body(feedback);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } 
    }

    @GetMapping("/api/feedback")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackService.getAllFeedbacks();
        if (feedbacks.isEmpty()) {
            return ResponseEntity.status(204).body(null);
        }
        return ResponseEntity.status(200).body(feedbacks);
       
    }

    @DeleteMapping("/api/feedback/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id) {
        try {
            feedbackService.deleteFeedback(id);
            return ResponseEntity.status(200).body("Feedback deleted successfully!");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }   
       
    }

    @GetMapping("/api/feedback/user/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getFeedbacksByUserId(@PathVariable Long userId) {
        List<Feedback> feedbacks = feedbackService.getFeedbacksByUserId(userId);
        if(!feedbacks.isEmpty())
        {
            return ResponseEntity.status(200).body(feedbacks);
        }
        return ResponseEntity.status(204).body(null);
    }
    
    @PutMapping("/api/feedback/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateFeedback(@PathVariable Long id, @RequestBody Feedback feedbackDetails) {
        try {
            Feedback updatedFeedback = feedbackService.updateFeedback(id, feedbackDetails);
            return ResponseEntity.status(200).body(updatedFeedback);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    
}
