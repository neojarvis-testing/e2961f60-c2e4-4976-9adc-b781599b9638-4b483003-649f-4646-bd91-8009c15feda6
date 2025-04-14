import { Component, OnInit } from '@angular/core';
import { orders } from 'src/app/models/orders.model';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { OrderService } from 'src/app/services/order.service';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminorderschart',
  templateUrl: './adminorderschart.component.html',
  styleUrls: ['./adminorderschart.component.css']
})
export class AdminorderschartComponent implements OnInit {

  constructor(private orderService: OrderService,private feedbackService:FeedbackService) { }

  feedbacks: Feedback[] = [];
  sampleOrders: orders[] = [];
  chartData: any[] = [];
  chartLabels: string[] = [];
  chartOptions: any;

  public comparisonOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          suggestedMax: 5  // since ratings are from 1 to 5
        }
      }]
    }
  };

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(data => {
      this.sampleOrders = data;
      console.log(this.sampleOrders);
      this.processOrderData();
    });
  }
  

  // SALES BY DATE (LINE CHART)
  public salesByDateOptions: ChartOptions = { responsive: true };
  public salesByDateLabels: Label[] = [];
  public salesByDateType = 'line';
  public salesByDateLegend = true;
  public salesByDateData: ChartDataSets[] = [{
    data: [],
    label: 'Total Sales',
    backgroundColor: 'rgba(75, 192, 192, 0.2)', // light teal fill
    borderColor: 'rgba(75, 192, 192, 1)',          // teal border
    borderWidth: 2,
    fill: false
  }];

  // ORDERS BY DATE (CHANGED TO LINE CHART)
  public ordersByDateOptions: ChartOptions = { responsive: true };
  public ordersByDateLabels: Label[] = [];
  public ordersByDateType = 'line';  // Changed from 'bar' to 'line'
  public ordersByDateLegend = true;
  public ordersByDateData: ChartDataSets[] = [{
    data: [],
    label: 'Number of Orders',
    backgroundColor: 'rgba(153, 102, 255, 0.2)', // light purple fill
    borderColor: 'rgba(153, 102, 255, 1)',         // purple border
    borderWidth: 2,
    fill: false  // Ensures no area fill for line chart
  }];

  // SALES BY FOOD (BAR CHART)
  public salesByFoodOptions: ChartOptions = { responsive: true };
  public salesByFoodLabels: Label[] = [];
  public salesByFoodType = 'bar';
  public salesByFoodLegend = true;
  public salesByFoodData: ChartDataSets[] = [{
    data: [],
    label: 'Total Sales',
    backgroundColor: 'rgba(255, 159, 64, 0.2)',  // light orange
    borderColor: 'rgba(255, 159, 64, 1)',         // orange
    borderWidth: 2
  }];

  // QUANTITY BY FOOD (BAR CHART)
  public quantityByFoodOptions: ChartOptions = { responsive: true };
  public quantityByFoodLabels: Label[] = [];
  public quantityByFoodType = 'bar';
  public quantityByFoodLegend = true;
  public quantityByFoodData: ChartDataSets[] = [{
    data: [],
    label: 'Quantity Ordered',
    backgroundColor: 'rgba(255, 99, 132, 0.2)',  // light red
    borderColor: 'rgba(255, 99, 132, 1)',         // red
    borderWidth: 2
  }];

  // STATUS DISTRIBUTION (PIE CHART)
  public statusDistributionOptions: ChartOptions = { responsive: true };
  public statusDistributionLabels: Label[] = [];
  public statusDistributionType = 'pie';
  public statusDistributionLegend = true;
  public statusDistributionData: number[] = [];
  // Specify colors for each slice of the pie chart
  public statusDistributionColors: Color[] = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
      ]
    }
  ];

  // SALES BY USER (BAR CHART)
  public salesByUserOptions: ChartOptions = { responsive: true };
  public salesByUserLabels: Label[] = [];
  public salesByUserType = 'bar';
  public salesByUserLegend = true;
  public salesByUserData: ChartDataSets[] = [{
    data: [],
    label: 'Total Sales',
    backgroundColor: 'rgba(54, 162, 235, 0.2)',  // light blue
    borderColor: 'rgba(54, 162, 235, 1)',         // blue
    borderWidth: 2
  }];

  processOrderData() {
    const salesByDate: { [key: string]: number } = {};
    const ordersByDate: { [key: string]: number } = {};
    const salesByFood: { [key: string]: number } = {};
    const quantityByFood: { [key: string]: number } = {};
    const statusDistribution: { [key: string]: number } = {};
    const salesByUser: { [key: string]: number } = {};

    this.sampleOrders.forEach(order => {
      const date = new Date(
        Number(order.orderDate[0]),
        Number(order.orderDate[1]) - 1,
        Number(order.orderDate[2])
      ).toISOString().split('T')[0];
      const foodName = order.food.foodName;
      const status = order.orderStatus;
      const username = order.user.username;
    
      // Sales by Date
      if (!salesByDate[date]) salesByDate[date] = 0;
      salesByDate[date] += order.totalAmount;
    
      // Orders by Date
      if (!ordersByDate[date]) ordersByDate[date] = 0;
      ordersByDate[date] += 1;
    
      // Sales by Food
      if (!salesByFood[foodName]) salesByFood[foodName] = 0;
      salesByFood[foodName] += order.totalAmount;
    
      // Quantity by Food
      if (!quantityByFood[foodName]) quantityByFood[foodName] = 0;
      quantityByFood[foodName] += order.quantity;
    
      // Status Distribution
      if (!statusDistribution[status]) statusDistribution[status] = 0;
      statusDistribution[status] += 1;
    
    });
    
    // Update Sales By Date Chart
    this.salesByDateLabels = Object.keys(salesByDate);
    this.salesByDateData[0].data = Object.values(salesByDate);

    // Update Orders By Date Chart (now line chart)
    this.ordersByDateLabels = Object.keys(ordersByDate);
    this.ordersByDateData[0].data = Object.values(ordersByDate);

    // Update Sales By Food Chart
    this.salesByFoodLabels = Object.keys(salesByFood);
    this.salesByFoodData[0].data = Object.values(salesByFood);

    // Update Quantity By Food Chart
    this.quantityByFoodLabels = Object.keys(quantityByFood);
    this.quantityByFoodData[0].data = Object.values(quantityByFood);

    // Update Status Distribution Chart
    this.statusDistributionLabels = Object.keys(statusDistribution);
    this.statusDistributionData = Object.values(statusDistribution);

  }
}
