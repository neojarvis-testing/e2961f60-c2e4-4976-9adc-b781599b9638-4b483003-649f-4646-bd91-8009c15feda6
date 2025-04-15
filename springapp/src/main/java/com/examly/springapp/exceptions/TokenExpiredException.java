package com.examly.springapp.exceptions;

public class TokenExpiredException extends RuntimeException{
    public TokenExpiredException(){
        super();
    }

    public TokenExpiredException(String message){
        super(message);
    }
    
}
