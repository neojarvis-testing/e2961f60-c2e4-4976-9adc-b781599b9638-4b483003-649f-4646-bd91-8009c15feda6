package com.examly.springapp.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.springapp.model.Orders;

public interface OrderRepo  extends JpaRepository<Orders,Integer>{

    @Query("SELECT o FROM Orders o WHERE o.user.userId = :id")
    List<Orders> findOrdersByUserId(int id);

}
