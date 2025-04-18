package com.examly.springapp.exceptions;

public class OrdersExistsException extends RuntimeException {

    public OrdersExistsException(){
        super();
    }
    public OrdersExistsException(String message){
        super(message);
    }

}
