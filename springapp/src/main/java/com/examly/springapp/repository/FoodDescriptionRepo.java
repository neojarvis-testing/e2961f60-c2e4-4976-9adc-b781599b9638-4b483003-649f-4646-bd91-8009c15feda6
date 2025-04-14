package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.FoodDescription;



@Repository
public interface FoodDescriptionRepo extends JpaRepository<FoodDescription,Integer>{
    
}
