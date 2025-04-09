package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.FoodNotFoundException;
import com.examly.springapp.exceptions.UserNotFoundException;
import com.examly.springapp.model.Food;
import com.examly.springapp.repository.FoodRepo;

@Service
public class FoodServiceImpl implements FoodService{

    @Autowired
    private FoodRepo foodRepo;

    @Override
    public Food addFood(Food food) throws FoodNotFoundException {
        if (food == null) {
            throw new FoodNotFoundException("Food cannot be null.");
        }
        Food savedFood = foodRepo.save(food);
        return savedFood;
    } 

    @Override
    public List<Food> getAllFoods() throws IllegalArgumentException, FoodNotFoundException {
        List<Food> foodList = foodRepo.findAll();
        if (foodList.isEmpty()) {
            throw new FoodNotFoundException("No foods found in the system.");
        }
        return foodList;
    }

    @Override
    public Optional<Food> getFoodById(int id) throws IllegalArgumentException, FoodNotFoundException {
        if (id <= 0) {
            throw new IllegalArgumentException("Food ID must be a positive integer.");
        }
        Optional<Food> food = foodRepo.findById(id);
        if (food.isEmpty()) {
            throw new FoodNotFoundException("Food with ID " + id + " not found.");
        }
        return food;
    }

    @Override
    public Food updateFood(int id, Food foodDetails) throws FoodNotFoundException {
        Food existingFood = foodRepo.findById(id).orElseThrow(() -> new FoodNotFoundException("Food with ID " + id + " not found."));
      
        existingFood.setFoodName(foodDetails.getFoodName());
        existingFood.setPrice(foodDetails.getPrice());
        existingFood.setStockQuantity(foodDetails.getStockQuantity());
        existingFood.setPhoto(foodDetails.getPhoto());
        
        return foodRepo.save(existingFood);
    }

    @Override
    public boolean deleteFood(int id) throws IllegalArgumentException,FoodNotFoundException {
        if (id <= 0) {
            throw new IllegalArgumentException("Invalid food ID.");
        }
        if (!foodRepo.existsById(id)) {
            throw new FoodNotFoundException("Food with ID " + id + " not found."); 
        }
        foodRepo.deleteById(id);
        return true;
    }

    @Override
    public List<Food> getFoodsByUserId(int userId) throws IllegalArgumentException, UserNotFoundException {
        if (userId <= 0) {
            throw new IllegalArgumentException("Invalid user ID.");
        }
        List<Food> foodsByUser = foodRepo.findByUserUserId(userId);
        if (foodsByUser.isEmpty()) {
            throw new UserNotFoundException("User with ID " + userId + " not found or no foods associated.");
        }
        return foodsByUser;
    }
   
}

    



 
