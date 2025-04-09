package com.examly.springapp.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.exceptions.DuplicateUserException;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;



    @Override
    public User registerUser(User user) {
        User newUser = userRepo.save(user);
        return newUser;  
    }


    @Override
    public User getUserById(int id){

       Optional<User> opt = userRepo.findById(id);
       if(opt.isEmpty()){
        throw new EntityNotFoundException();
       }
       return opt.get();
    }

}
