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
          suggestedMax: 5  
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
    this.feedbackService.getFeedbacks().subscribe(data=>{
      this.feedbacks = data;
      this.processFeedbackData();
    })
  }
  
  public comparisonLabels: Label[] = [];
  public comparisonType = 'bar';
  public comparisonLegend = true;
  public comparisonData: ChartDataSets[] = [{
    data: [],
    label: 'Average Rating',
    backgroundColor: 'rgba(255, 206, 86, 0.3)',   
    borderColor: 'rgba(255, 206, 86, 1)',           
    borderWidth: 1
  }];

  public salesByDateOptions: ChartOptions = { responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Date' 
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Sales Amount'
        }
      }] }};
  public salesByDateLabels: Label[] = [];
  public salesByDateType = 'line';
  public salesByDateLegend = true;
  public salesByDateData: ChartDataSets[] = [{
    data: [],
    label: 'Total Sales',
    backgroundColor: 'rgba(75, 192, 192, 0.2)', 
    borderColor: 'rgba(75, 192, 192, 1)',          
    borderWidth: 2,
    fill: false
  }];

  public ordersByDateOptions: ChartOptions = { responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Date' 
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Number of Orders' 
        }
      }]
    }
  };
  public ordersByDateLabels: Label[] = [];
  public ordersByDateType = 'line';  
  public ordersByDateLegend = true;
  public ordersByDateData: ChartDataSets[] = [{
    data: [],
    label: 'Number of Orders',
    backgroundColor: 'rgba(153, 102, 255, 0.2)', 
    borderColor: 'rgba(153, 102, 255, 1)',         
    borderWidth: 2,
    fill: false  
  }];

  public salesByFoodOptions: ChartOptions = { responsive: true };
  public salesByFoodLabels: Label[] = [];
  public salesByFoodType = 'bar';
  public salesByFoodLegend = true;
  public salesByFoodData: ChartDataSets[] = [{
    data: [],
    label: 'Total Sales',
    backgroundColor: 'rgba(255, 159, 64, 0.2)',  
    borderColor: 'rgba(255, 159, 64, 1)',        
    borderWidth: 2
  }];

  public quantityByFoodOptions: ChartOptions = { responsive: true };
  public quantityByFoodLabels: Label[] = [];
  public quantityByFoodType = 'bar';
  public quantityByFoodLegend = true;
  public quantityByFoodData: ChartDataSets[] = [{
    data: [],
    label: 'Quantity Ordered',
    backgroundColor: 'rgba(255, 99, 132, 0.2)',  
    borderColor: 'rgba(255, 99, 132, 1)',         
    borderWidth: 2
  }];


  public statusDistributionOptions: ChartOptions = { responsive: true };
  public statusDistributionLabels: Label[] = [];
  public statusDistributionType = 'pie';
  public statusDistributionLegend = true;
  public statusDistributionData: number[] = [];
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


  public salesByUserOptions: ChartOptions = { responsive: true };
  public salesByUserLabels: Label[] = [];
  public salesByUserType = 'bar';
  public salesByUserLegend = true;
  public salesByUserData: ChartDataSets[] = [{
    data: [],
    label: 'Total Sales',
    backgroundColor: 'rgba(54, 162, 235, 0.2)',  
    borderColor: 'rgba(54, 162, 235, 1)',         
    borderWidth: 2
  }];


  processFeedbackData() {
    const foodRatings: { [foodName: string]: { totalRating: number; count: number } } = {};
    
    this.feedbacks.forEach(feedback => {
      if (feedback.food && feedback.food.foodName) {
        const foodName = feedback.food.foodName;
        if (!foodRatings[foodName]) {
          foodRatings[foodName] = { totalRating: 0, count: 0 };
        }
        foodRatings[foodName].totalRating += feedback.rating;
        foodRatings[foodName].count += 1;
      }
    });
    
    this.comparisonLabels = Object.keys(foodRatings);
    const avgRatings = Object.keys(foodRatings).map(foodName => {
      const item = foodRatings[foodName];
      return parseFloat((item.totalRating / item.count).toFixed(2));
    });
    
    this.comparisonData[0].data = avgRatings;
  }

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
    

      if (!salesByDate[date]) salesByDate[date] = 0;
      salesByDate[date] += order.totalAmount;
    
      if (!ordersByDate[date]) ordersByDate[date] = 0;
      ordersByDate[date] += 1;
    
      if (!salesByFood[foodName]) salesByFood[foodName] = 0;
      salesByFood[foodName] += order.totalAmount;
    
      if (!quantityByFood[foodName]) quantityByFood[foodName] = 0;
      quantityByFood[foodName] += order.quantity;
    
      if (!statusDistribution[status]) statusDistribution[status] = 0;
      statusDistribution[status] += 1;
    
    });
    
    this.salesByDateLabels = Object.keys(salesByDate);
    this.salesByDateData[0].data = Object.values(salesByDate);

    this.ordersByDateLabels = Object.keys(ordersByDate);
    this.ordersByDateData[0].data = Object.values(ordersByDate);

    this.salesByFoodLabels = Object.keys(salesByFood);
    this.salesByFoodData[0].data = Object.values(salesByFood);

    this.quantityByFoodLabels = Object.keys(quantityByFood);
    this.quantityByFoodData[0].data = Object.values(quantityByFood);

    this.statusDistributionLabels = Object.keys(statusDistribution);
    this.statusDistributionData = Object.values(statusDistribution);

  }
}
