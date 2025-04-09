import { Food } from "./food.model";
import { User } from "./user.model";

export interface Feedback {
    feedbackId ?: number;
    user : User;
    feedbackText : string;
    date : Date;
    food : Food;
    rating : number;
}
