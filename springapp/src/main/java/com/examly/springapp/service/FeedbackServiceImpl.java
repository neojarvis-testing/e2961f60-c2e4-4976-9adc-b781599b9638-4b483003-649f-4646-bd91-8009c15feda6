package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.repository.FeedbackRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class FeedbackServiceImpl implements FeedbackService{
    
    private final FeedbackRepo feedbackRepo;

    public FeedbackServiceImpl(FeedbackRepo feedbackRepo) {
        this.feedbackRepo = feedbackRepo;
    }
    
    @Override
    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepo.save(feedback);
    }

    @Override
    public Feedback getFeedbackById(Long id) {

        Optional<Feedback> feedback = feedbackRepo.findById(id);
        if(feedback.isEmpty())
        {
            throw new EntityNotFoundException("Feedback not found with ID: " + id);
        }
        return feedback.get();
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepo.findAll();
    }

    @Override
    public void deleteFeedback(Long id) {

        if(!feedbackRepo.existsById(id))
        {
            throw new EntityNotFoundException("Feedback not found with ID: " + id);
        }
        feedbackRepo.deleteById(id);
    }

    @Override
    public List<Feedback> getFeedbacksByUserId(Long userId) {
            return feedbackRepo.findByUserUserId(userId);    
    }

    @Override
    public Feedback updateFeedback(Long id, Feedback feedbackDetails) {

        Optional<Feedback> feedback = feedbackRepo.findById(id);
        if (feedback.isEmpty()) {
            throw new EntityNotFoundException("Feedback not found with ID: " + id);
        }

        Feedback existingFeedback = feedback.get();
        existingFeedback.setFeedbackText(feedbackDetails.getFeedbackText());
        existingFeedback.setDate(feedbackDetails.getDate());
        existingFeedback.setRating(feedbackDetails.getRating());
        existingFeedback.setFood(feedbackDetails.getFood());
        existingFeedback.setUser(feedbackDetails.getUser());

        return feedbackRepo.save(existingFeedback);
    }
    @Override
    public boolean feedbackExistsForFood(Integer userId, Integer foodId) {
        return feedbackRepo.existsFeedbackByUserAndFood(userId, foodId);
    }
    


}
