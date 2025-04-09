package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.User;

@Repository
public interface UserRepo extends JpaRepository<User,Integer>{

    public Optional<User> findByEmail(String sname); 

    @Query("SELECT u.userId FROM User u WHERE u.email = :email")
    public Integer findUserIdByEmail(String email);

    @Query("SELECT u.userRole FROM User u WHERE u.email = :email")
    public String findUserRoleByEmail(String email);

}
