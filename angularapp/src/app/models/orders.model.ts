import { Food } from "./food.model";
import { User } from "./user.model";

export interface orders {
    orderId ?: number;
    orderStatus : string;
    totalAmount : number;
    quantity : number;
<<<<<<< HEAD
    userId ? : number;
    foodId? : number;
=======
    userId ?: number;
    user? :User;
    foodId ?: number;
    food ?: Food;
>>>>>>> cd2cc4195662e8d8b7ccbdbb16e9983e0505acb1
    orderDate : string;
    user : User;
    food : Food;
}
