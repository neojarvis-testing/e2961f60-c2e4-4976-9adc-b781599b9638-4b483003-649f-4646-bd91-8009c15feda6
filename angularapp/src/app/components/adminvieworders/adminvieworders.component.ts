import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/models/orders.model';
import { User } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-adminvieworders',
  templateUrl: './adminvieworders.component.html',
  styleUrls: ['./adminvieworders.component.css']
})
export class AdminviewordersComponent implements OnInit {

  orders: Orders[] = [];
  selectedUser: any = null;
  changeStatus : string = '';

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data;
    })
  }

  updatedStatus(orderId: number, newStatus: string) {
    // Find the order by id
    const order = this.orders.find(order => order.orderId === orderId);
    
    // Check if the order exists
    if (order) {
      order.orderStatus = newStatus;
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } else {
      console.error(`Order with id ${orderId} not found.`);
    }
  }

  deleteOrder(orderId: number) {
    console.log(orderId);
    this.orderService.deleteOrder(orderId).subscribe(data => {
      this.getAllOrders();
    })
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  closeUser() {
    this.selectedUser = null;
  }

}
