package com.examly.springapp.service;

import com.examly.springapp.exceptions.UserNotFoundException;
import com.examly.springapp.model.AuthUser;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;

public interface UserService {
    public User registerUser(User user);
    public User getUserById(int id);
    public AuthUser loginUser(LoginDTO user);
    public User updatedUser(int id,User user) throws UserNotFoundException; 
}
