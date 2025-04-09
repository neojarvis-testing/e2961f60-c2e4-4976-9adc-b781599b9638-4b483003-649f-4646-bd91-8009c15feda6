import { User } from "./user.model";

export interface Food {
    foodId ?: number;
    foodName : string;
    price : number;
    stockQuantity : number;
    photo ?: string;
    user : User;
}
