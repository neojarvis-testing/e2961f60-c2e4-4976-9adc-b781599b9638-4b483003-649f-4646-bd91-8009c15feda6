package com.examly.springapp.exceptions;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(){
        super();
    }
    public InvalidTokenException(String message){
        super(message);
    }
    
}
