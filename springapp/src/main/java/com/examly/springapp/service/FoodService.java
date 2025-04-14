package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.exceptions.DuplicateIdException;
import com.examly.springapp.exceptions.FoodNotFoundException;
import com.examly.springapp.exceptions.UserNotFoundException;
import com.examly.springapp.model.Food;

@Service
public interface FoodService {

    public Food addFood(String foodJson,MultipartFile photo) throws Exception;

    public List<Food> getAllFoods() throws IllegalArgumentException, FoodNotFoundException;

    public Optional<Food> getFoodById(int id) throws IllegalArgumentException, FoodNotFoundException;

    public Food updateFood(int id,Food foodDetails) throws FoodNotFoundException;

    public boolean deleteFood(int id) throws IllegalArgumentException, FoodNotFoundException;

    public List<Food> getFoodsByUserId(int userId) throws IllegalArgumentException, UserNotFoundException;

}
