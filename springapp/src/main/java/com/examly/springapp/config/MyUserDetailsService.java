package com.examly.springapp.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Component
public class MyUserDetailsService implements UserDetailsService{


    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email);

        if(user==null){
            throw new UsernameNotFoundException("Invalid User");
        }

        List<GrantedAuthority> auths = new ArrayList<>();
        auths.add(new SimpleGrantedAuthority(user.getUserRole()));
        return new UserPrinciple(user);
        
    }

}
