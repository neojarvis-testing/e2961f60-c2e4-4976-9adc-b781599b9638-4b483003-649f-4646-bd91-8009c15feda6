package com.examly.springapp.exceptions;

public class InsufficientQuantityException extends RuntimeException{

    public InsufficientQuantityException(){
        super();
    }
    public InsufficientQuantityException(String message){
        super(message);
    }

}
