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

import com.examly.springapp.model.Orders;
import com.examly.springapp.service.OrderService;

import jakarta.persistence.EntityNotFoundException;

@RestController
public class OrdersController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/api/orders")
    @PreAuthorize("hasRole('USER')")
    ResponseEntity<?> addOrder(@RequestBody Orders order) {
        Orders newOrder = orderService.addOrder(order);
        return ResponseEntity.status(201).body(newOrder);
    }

    @GetMapping("/api/orders/{orderId}")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<?> viewOrderById(@PathVariable int orderId) {
        try {
            Optional<Orders> order = orderService.getOrderById(orderId);
            return ResponseEntity.status(200).body(order);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/api/orders/user/{userId}")
    @PreAuthorize("hasRole('USER')")
    ResponseEntity<?> viewOrdersByUserId(@PathVariable int userId) {
        try {
            List<Orders> orders = orderService.getOrdersByUserId(userId);
            return ResponseEntity.status(200).body(orders);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/api/orders")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<?> viewAllOrders() {

        List<Orders> orderList = orderService.getAllOrders();
        if (orderList.isEmpty()) {
            return ResponseEntity.status(204).body(null);
        }
        return ResponseEntity.status(200).body(orderList);

    }

    @PutMapping("/api/orders/{orderId}")
    @PreAuthorize("hasRole('USER')")
    ResponseEntity<?> updateOrder(@PathVariable int orderId, @RequestBody Orders order) {
        try {
            Orders updatedOrders = orderService.updateOrder(orderId, order);
            return ResponseEntity.status(200).body(updatedOrders);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/api/orders/{orderId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    ResponseEntity<?> deleteOrder(@PathVariable int orderId) {
        try {
            orderService.deleteOrder(orderId);
            return ResponseEntity.status(200).body(true);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());

}