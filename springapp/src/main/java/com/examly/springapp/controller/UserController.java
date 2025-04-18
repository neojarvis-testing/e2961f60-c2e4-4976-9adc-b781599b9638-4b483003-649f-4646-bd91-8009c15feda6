package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.exceptions.UserNotFoundException;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PutMapping("/api/user/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody User user) {
        try {
            User updatedUser = userService.updatedUser(id, user);
            return ResponseEntity.status(200).body(updatedUser);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
