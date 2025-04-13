package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Feedback;

public interface FeedbackService {
    public Feedback createFeedback(Feedback feedback);
    public Feedback getFeedbackById(Long id);
    public List<Feedback> getAllFeedbacks();
    public void deleteFeedback(Long id);
    public List<Feedback> getFeedbacksByUserId(Long userId);
    Feedback updateFeedback(Long id, Feedback feedbackDetails);
}
