package com.examly.springapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Food;

@Repository 
public interface FoodRepo extends JpaRepository<Food,Integer>{
   
    public List<Food> findByUserUserId(int userId);

    public List<Food> findAllByFoodId(int id);
 
}
