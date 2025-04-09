package com.examly.springapp.exceptions;

public class FoodNotFoundException extends Exception{
    public FoodNotFoundException(){
        super();
    }
    public FoodNotFoundException(String msg){
        super(msg);
    }
}
