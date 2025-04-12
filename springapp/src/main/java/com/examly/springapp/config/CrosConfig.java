package com.examly.springapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CrosConfig implements WebMvcConfigurer{

    @Override
    public void addCorsMappings(CorsRegistry registry) {
       registry.addMapping("/api/**")
               .allowedOrigins("https://8081-affbecdbcccfcdfbdefbbddcfebfcdbbfbdcfeda.premiumproject.examly.io")
               .allowedMethods("GET","PUT","POST","DELETE","OPTIONS")
               .allowedHeaders("*")
               .allowCredentials(true);
    }   
}
