import { Component, OnInit } from '@angular/core';
import { orders } from 'src/app/models/orders.model';
import { User } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-adminvieworders',
  templateUrl: './adminvieworders.component.html',
  styleUrls: ['./adminvieworders.component.css']
})
export class AdminviewordersComponent implements OnInit {

  orders: orders[] = [];
  selectedUser: any = null;
  changeStatus: boolean = false;
  deletePopupVisible: boolean = false; 
  deletePopupMessage: string = ''; 
  loading:boolean = true;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {

    this.getAllOrders();
  }

  getAllOrders() {
    this.loading = true
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data;
      this.loading=false;
    },()=>{
      this.loading=false;
    })
  }

  updatedStatus(orderId: number, newStatus: string) {
    // Find the order by id
    const order = this.orders.find(order => order.orderId === orderId);
    console.log(order);
    // Check if the order exists
    if (order) {
      order.orderStatus = newStatus;
      this.orderService.updateOrder(orderId, order).subscribe(data => {
        console.log(data);
      })
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } else {
      console.error(`Order with id ${orderId} not found.`);
    }
  }

  deleteOrder(orderId: number) {
    console.log(orderId);
    const order = this.orders.find(order => order.orderId === orderId);
    
    if (order && (order.orderStatus === 'Making Food' || order.orderStatus === 'On the way' || order.orderStatus === 'Delivered')) {
      this.changeStatus=false;
      this.deletePopupMessage = `Cannot delete order as its status is ${order.orderStatus}.`;
      this.deletePopupVisible = true;
    } else if (order) {
      this.changeStatus = true;
      this.orderService.deleteOrder(orderId).subscribe(data => {
        this.deletePopupMessage="Successfully Cancelled the order."
        this.deletePopupVisible = true;
        this.getAllOrders(); 
      });
    }
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  closeUser() {
    this.selectedUser = null;
  }

  closeDeletePopup() {
    this.deletePopupVisible = false; 
  }

}
