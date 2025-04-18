package com.examly.springapp.service;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.exceptions.FoodNotFoundException;
import com.examly.springapp.exceptions.OrdersExistsException;
import com.examly.springapp.exceptions.UserNotFoundException;
import com.examly.springapp.model.Food;
import com.examly.springapp.model.FoodDescription;
import com.examly.springapp.repository.FoodDescriptionRepo;
import com.examly.springapp.repository.FoodRepo;
import com.examly.springapp.repository.OrderRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class FoodServiceImpl implements FoodService {

    private final FoodRepo foodRepo;
    private final FoodDescriptionRepo foodDescriptionRepo;
    private final OrderRepo orderRepo;
    
    public FoodServiceImpl(FoodRepo foodRepo, FoodDescriptionRepo foodDescriptionRepo,OrderRepo orderRepo) {
        this.foodRepo = foodRepo;
        this.foodDescriptionRepo = foodDescriptionRepo;
        this.orderRepo= orderRepo;
    }
    
    @Override
    public Food addFood(String foodJson, MultipartFile photo) throws Exception{
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Food food = objectMapper.readValue(foodJson, Food.class);

            if (photo != null && !photo.isEmpty()) {
                food.setPhoto(photo.getBytes());
            }

            FoodDescription foodDescription = food.getFoodDescription();
            foodDescription = foodDescriptionRepo.save(foodDescription);
            food.setFoodDescription(foodDescription);

            return foodRepo.save(food);
        }catch (JsonProcessingException e) {
            throw new Exception("Invalid JSON structure: " + e.getMessage());
        }
        catch (Exception e) {
            throw new Exception("Failed to add food: " + e.getMessage());
        }

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
        Food existingFood = foodRepo.findById(id)
                .orElseThrow(() -> new FoodNotFoundException("Food with ID " + id + " not found."));

        existingFood.setFoodName(foodDetails.getFoodName());
        existingFood.setPrice(foodDetails.getPrice());
        existingFood.setStockQuantity(foodDetails.getStockQuantity());
        existingFood.setPhoto(foodDetails.getPhoto());

        return foodRepo.save(existingFood);
    }

    @Override
    public boolean deleteFood(int id) throws IllegalArgumentException, FoodNotFoundException , OrdersExistsException{
        if (id <= 0) {
            throw new IllegalArgumentException("Invalid food ID.");
        }
        if (!foodRepo.existsById(id)) {
            throw new FoodNotFoundException("Food with ID " + id + " not found.");
        }
        if(orderRepo.findOrdersByFoodId(id)){
            throw new OrdersExistsException("Order exists for this food");
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
