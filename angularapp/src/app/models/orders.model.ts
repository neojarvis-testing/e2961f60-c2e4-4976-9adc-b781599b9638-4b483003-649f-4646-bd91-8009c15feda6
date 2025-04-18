import { Food } from "./food.model";
import { User } from "./user.model";

export interface orders {
    orderId ?: number;
    orderStatus : string;
    totalAmount : number;
    quantity : number;

    userId ?: number;
    user? :User;
    foodId ?: number;
    food ?: Food;

    orderDate : string;
    address?:string;
    

}
