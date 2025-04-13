package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.examly.springapp.model.Feedback;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback,Long>{

    List<Feedback> findByUserUserId(Long userId);
    
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END " +
           "FROM Feedback f " +
           "WHERE f.user.userId = :userId AND f.food.foodId = :foodId")
    boolean existsFeedbackByUserAndFood(
          @Param("userId") Integer userId, 
          @Param("foodId") Integer foodId);

}
