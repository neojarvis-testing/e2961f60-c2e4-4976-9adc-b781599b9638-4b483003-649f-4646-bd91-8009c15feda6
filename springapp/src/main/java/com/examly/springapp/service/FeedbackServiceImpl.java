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

    @Autowired
    private FeedbackRepo feedbackRepo;

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



}
