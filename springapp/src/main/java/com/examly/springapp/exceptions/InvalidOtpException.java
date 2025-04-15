package com.examly.springapp.exceptions;

public class InvalidOtpException extends RuntimeException{
    public InvalidOtpException(){
        super();
    }

    public InvalidOtpException(String message){
            super(message);
    }
    
}
