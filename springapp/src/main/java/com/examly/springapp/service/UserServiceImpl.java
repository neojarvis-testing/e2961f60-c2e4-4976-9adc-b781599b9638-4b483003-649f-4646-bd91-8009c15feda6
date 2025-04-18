package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.exceptions.DuplicateUserException;
import com.examly.springapp.exceptions.InvalidCredentialsException;
import com.examly.springapp.exceptions.UserNotFoundException;
import com.examly.springapp.model.AuthUser;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final JwtUtils jwtUtils;
    
    public UserServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder, AuthenticationManager authManager, JwtUtils jwtUtils) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.authManager = authManager;
        this.jwtUtils = jwtUtils;
    }
    
    @Override
    public User registerUser(User user) {
        Optional<User> opt = userRepo.findByEmail(user.getEmail());
        if (opt.isPresent()) {
            throw new DuplicateUserException("User already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User newUser = userRepo.save(user);
        return newUser;
    }

    @Override
    public User getUserById(int id) {

        Optional<User> opt = userRepo.findById(id);
        if (opt.isEmpty()) {
            throw new EntityNotFoundException();
        }
        return opt.get();
    }

    @Override
    public AuthUser loginUser(LoginDTO user) throws InvalidCredentialsException {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

            if (authentication.isAuthenticated()) {
                List<String> roleList = authentication.getAuthorities().stream()
                        .map(r -> r.getAuthority())
                        .collect(Collectors.toList());

                if (roleList.isEmpty()) {
                    throw new IllegalStateException("User has no role");
                }

                String role = roleList.get(0);
                AuthUser authUser = new AuthUser();
                authUser.setUserName(user.getEmail());
                authUser.setToken(jwtUtils.generateToken(user.getEmail()));
                authUser.setRole(role);
                authUser.setUserId(userRepo.findUserIdByEmail(user.getEmail()));
                authUser.setName(userRepo.findNameByEmail(user.getEmail()));
                return authUser;
            }else {
                throw new InvalidCredentialsException("Invalid User Name or Password");
            }
        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException("Invalid User Name or Password");
        }
    }

    @Override
    public User updatedUser(int id, User user) throws UserNotFoundException{
       Optional<User> opt = userRepo.findById(id);
       if(opt.isEmpty()){
        throw new UserNotFoundException("User with id "+id+" not found");
       }
       User existingUser = opt.get();
       System.out.println("********updating emial******");
       System.out.println(user.getEmail());
       existingUser.setEmail(user.getEmail());
       return userRepo.save(existingUser);

    }

}
