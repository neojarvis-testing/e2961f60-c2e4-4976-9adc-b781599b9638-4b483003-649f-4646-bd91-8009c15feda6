package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackService;

@RestController
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/api/feedback")
    public ResponseEntity<?> createFeedback(@RequestBody Feedback feedback) {
        Feedback createdFeedback = feedbackService.createFeedback(feedback);
        return ResponseEntity.status(201).body(createdFeedback);
    }

    @GetMapping("/api/feedback/{id}")
    public ResponseEntity<?> getFeedbackById(@PathVariable Long id) {
        Feedback feedback = feedbackService.getFeedbackById(id);
        return ResponseEntity.status(200).body(feedback);
    }


    @GetMapping("/api/feedback")
    public ResponseEntity<?> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackService.getAllFeedbacks();
        return ResponseEntity.status(200).body(feedbacks);
    }

    @DeleteMapping("/api/feedback/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.status(200).body("Feedback deleted successfully!");
    }

    @GetMapping("/api/feedback/user/{userId}")
    public ResponseEntity<?> getFeedbacksByUserId(@PathVariable Long userId) {
        List<Feedback> feedbacks = feedbackService.getFeedbacksByUserId(userId);
        return ResponseEntity.status(200).body(feedbacks);
    }
    
}
