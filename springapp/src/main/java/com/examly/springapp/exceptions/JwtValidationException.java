package com.examly.springapp.exceptions;

import org.springframework.http.HttpStatus;

public class JwtValidationException extends RuntimeException{

    public JwtValidationException(){
        super();
    }
    public JwtValidationException(String message,HttpStatus status){
        super(message);
    }

}
