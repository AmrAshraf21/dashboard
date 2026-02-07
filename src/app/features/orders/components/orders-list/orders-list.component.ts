import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Order } from '../../../../core/models/orders.model';
import { OrdersService } from '../../../../core/services/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'itemName', 'quantity', 'orderDate', 'amount', 'status', 'actions'];
  dataSource: MatTableDataSource<Order>;

  isLoading = false;
  totalOrders = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<Order>([]);
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.isLoading = true;

    this.ordersService.getOrders(this.pageIndex + 1, this.pageSize)
      .subscribe({
        next: (response: any) => {
          this.dataSource.data = response.orders;
          this.totalOrders = response.total;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error loading orders:', error);
          this.isLoading = false;
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadOrders();
  }

  onViewOrder(order: Order): void {
    this.router.navigate(['/orders', order.id]);
  }

  getStatusClass(status: string): string {
    return this.ordersService.getStatusColorClass(status as any);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  trackByOrderId(index: number, order: Order): string {
    return order.id;
  }
}