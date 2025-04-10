package com.examly.springapp.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        Optional<User> opt = userRepo.findByEmail(email);

        if(opt.isEmpty()){
            throw new UsernameNotFoundException("Invalid User");
        }
        User user = opt.get();


        List<GrantedAuthority> auths = new ArrayList<>();
        if(user.getUserRole()!=null){
            auths.add(new SimpleGrantedAuthority(user.getUserRole()));
            return new UserPrinciple(user);
        }else{
            throw new IllegalStateException("User role is null");
        }
    }

}
