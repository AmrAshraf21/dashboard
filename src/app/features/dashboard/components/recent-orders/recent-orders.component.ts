import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../../core/models/orders.model';
import { OrdersService } from '../../../../core/services/order.service';

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss']
})
export class RecentOrdersComponent {
  @Input() orders: Order[] = [];
  @Input() isLoading = false;

  displayedColumns: string[] = ['itemName', 'quantity', 'orderDate', 'amount', 'status'];

  constructor(
    private router: Router,
    private ordersService: OrdersService
  ) { }

  getStatusClass(status: string): string {
    return this.ordersService.getStatusColorClass(status as any);
  }

  onViewAllOrders(): void {
    this.router.navigate(['/orders']);
  }

  onOrderClick(order: Order): void {
    this.router.navigate(['/orders', order.id]);
  }

  trackByOrderId(index: number, order: Order): string {
    return order.id;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
}