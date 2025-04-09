package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.Orders;

public interface OrderService {
    Orders addOrder(Orders order);
    List<Orders> getAllOrders();
    Optional<Orders> getOrderById(int id);
    Orders updateOrder(int id , Orders orderDetails);
    boolean deleteOrder(int id);
    List<Orders> getOrdersByUserId(int userId);
}
