package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.InsufficientQuantityException;
import com.examly.springapp.model.Food;
import com.examly.springapp.model.Orders;
import com.examly.springapp.repository.FoodRepo;
import com.examly.springapp.repository.OrderRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private FoodRepo foodRepo;

    @Override
    public Orders addOrder(Orders order) {

        Optional<Food> opt = foodRepo.findById(order.getFood().getFoodId());
        if(opt.isEmpty()){
            throw new EntityNotFoundException("Food with id "+order.getFood().getFoodId()+" not found");
        }
        Food existingFood = opt.get();
        if(existingFood.getStockQuantity()<order.getQuantity()){
            throw new InsufficientQuantityException("Order less than or equal to available Stock");
        }
        existingFood.setStockQuantity(existingFood.getStockQuantity()-order.getQuantity());
        foodRepo.save(existingFood);
        Orders savedOrder = orderRepo.save(order);
        return orderRepo.findById(savedOrder.getOrderId()).orElse(savedOrder);
    }

    @Override
    public List<Orders> getAllOrders() {
        return orderRepo.findAll();
    }

    @Override
    public Optional<Orders> getOrderById(int id) {
        Optional<Orders> opt = orderRepo.findById(id);
        if (opt.isEmpty()) {
            throw new EntityNotFoundException("Order with ID " + id + " not found!");
        }

        return opt;
    }

    @Override
    public Orders updateOrder(int id, Orders orderDetails) {
        orderDetails.setOrderId(id);
        Optional<Orders> opt = orderRepo.findById(id);
        if (opt.isEmpty()) {
            throw new EntityNotFoundException("Order with ID " + id + " not found!");
        }

        Orders existingOrders = opt.get();
        existingOrders.setOrderStatus(orderDetails.getOrderStatus());
        existingOrders.setTotalAmount(orderDetails.getTotalAmount());
        existingOrders.setQuantity(orderDetails.getQuantity());
        existingOrders.setOrderDate(orderDetails.getOrderDate());
        existingOrders.setUser(orderDetails.getUser());
        existingOrders.setFood(orderDetails.getFood());

        return orderRepo.save(existingOrders);

    }

    @Override
    public boolean deleteOrder(int id) {
        if (orderRepo.existsById(id)) {
            orderRepo.deleteById(id);
            return true;
        } else {
            throw new EntityNotFoundException("Order with ID " + id + " not found!");
        }

    }

    @Override
    public List<Orders> getOrdersByUserId(int userId) {
        List<Orders> ordersList = orderRepo.findOrdersByUserId(userId);
        if(ordersList.isEmpty()){
            throw new EntityNotFoundException("Order with ID " + userId + " not found!");
        }

        return ordersList;
    }

}
