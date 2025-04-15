package com.examly.springapp.exceptions;

public class DuplicateResetTokenException extends RuntimeException {


    public DuplicateResetTokenException(){
        super();
    }

    public DuplicateResetTokenException(String message){
        super(message);
    }
}
