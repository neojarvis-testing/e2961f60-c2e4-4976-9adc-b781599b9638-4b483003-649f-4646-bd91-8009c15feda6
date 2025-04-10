package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

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

import com.examly.springapp.exceptions.FoodNotFoundException;
import com.examly.springapp.exceptions.UserNotFoundException;
import com.examly.springapp.model.Food;
import com.examly.springapp.service.FoodService;

@RestController
public class FoodController {  
    
    @Autowired
    private FoodService foodService;

    @PostMapping("api/food")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addFood(@RequestBody Food food) {
        try{
            food = foodService.addFood(food);
            return ResponseEntity.status(201).body(food);
        }
        catch(FoodNotFoundException e){
            return ResponseEntity.status(403).body(e.getMessage());

        }
    
    }

    @GetMapping("/api/food/{foodId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getFoodById(@PathVariable int foodId)  {
        try{
            Optional<Food> food = foodService.getFoodById(foodId);
            return ResponseEntity.status(200).body(food);
        }
        catch(FoodNotFoundException e){
            return ResponseEntity.status(403).body(e.getMessage());
        } 
        catch(IllegalArgumentException a){
            return ResponseEntity.status(403).body(a.getMessage());
        }

        
    }

    @GetMapping("/api/food")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')" )
    public ResponseEntity<?> viewAllFoods(){
        try{
            List<Food> allFoods = foodService.getAllFoods();
            return ResponseEntity.status(200).body(allFoods);
        }
        catch(FoodNotFoundException e){
            return ResponseEntity.status(403).body(e.getMessage());
        }  
    }

    @PutMapping("/api/food/{foodId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> editFood(@PathVariable int foodId, @RequestBody Food foodDetails) {
        try{
            Food updatedFood = foodService.updateFood(foodId, foodDetails);
            return ResponseEntity.status(200).body(updatedFood);
        }
        catch(FoodNotFoundException e){
            return ResponseEntity.status(403).body(e.getMessage());
        }
        catch(IllegalArgumentException i){
            return ResponseEntity.status(403).body(i.getMessage());
        }
    
    }

    @DeleteMapping("/api/food/{foodId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteFood (@PathVariable int id){
        try{
            boolean isDeleted=foodService.deleteFood(id);
            if(isDeleted) {
                return ResponseEntity.status(200).body("Food with ID " + id + " deleted successfully.");
            }else {
                return ResponseEntity.status(500).body("Failed to delete food with ID " + id);
            }
        }
        catch(FoodNotFoundException e){
            return ResponseEntity.status(403).body(e.getMessage());
        }
        catch(IllegalArgumentException i){
            return ResponseEntity.status(403).body(i.getMessage());
        }  
    }

    @GetMapping("/api/food/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getFoodsByUserId (@PathVariable int userId){
        try{
            List<Food> foods = foodService.getFoodsByUserId(userId);
            return ResponseEntity.status(200).body(foods);
        }
        catch(IllegalArgumentException i){
            return ResponseEntity.status(403).body(i.getMessage());
        } 
        catch(UserNotFoundException e){
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }
}


    

    

    

