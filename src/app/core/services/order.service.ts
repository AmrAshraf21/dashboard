import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { Order, OrdersResponse, OrderStatus } from '../models/orders.model';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    private mockOrders: Order[] = [
        {
            id: '1',
            itemName: 'Iphone 13',
            quantity: 1,
            orderDate: 'January 20, 2022',
            amount: 799.00,
            status: OrderStatus.PENDING
        },
        {
            id: '2',
            itemName: 'Xiaomi Redmi Note 10',
            quantity: 1,
            orderDate: 'January 20, 2022',
            amount: 799.00,
            status: OrderStatus.APPROVED
        },
        {
            id: '3',
            itemName: 'Iphone 13',
            quantity: 1,
            orderDate: 'January 20, 2022',
            amount: 799.00,
            status: OrderStatus.IN_PROGRESS
        },
        {
            id: '4',
            itemName: 'Samsung Galaxy S21',
            quantity: 2,
            orderDate: 'January 19, 2022',
            amount: 1599.00,
            status: OrderStatus.COMPLETED
        },
        {
            id: '5',
            itemName: 'MacBook Pro 14"',
            quantity: 1,
            orderDate: 'January 18, 2022',
            amount: 2499.00,
            status: OrderStatus.PENDING
        },
        {
            id: '6',
            itemName: 'iPad Air',
            quantity: 1,
            orderDate: 'January 17, 2022',
            amount: 599.00,
            status: OrderStatus.APPROVED
        },
        {
            id: '7',
            itemName: 'AirPods Pro',
            quantity: 3,
            orderDate: 'January 16, 2022',
            amount: 749.00,
            status: OrderStatus.COMPLETED
        },
        {
            id: '8',
            itemName: 'Sony WH-1000XM4',
            quantity: 1,
            orderDate: 'January 15, 2022',
            amount: 349.00,
            status: OrderStatus.PENDING
        }
    ];

    constructor() { }

    /**
     * Get recent orders (limited to specified number)
     */
    getRecentOrders(limit: number = 5): Observable<Order[]> {
        this.loadingSubject.next(true);

        return of(this.mockOrders.slice(0, limit)).pipe(
            delay(500),
            map(orders => {
                this.loadingSubject.next(false);
                return orders;
            }),
            catchError(error => {
                this.loadingSubject.next(false);
                return throwError(() => new Error('Failed to load recent orders'));
            })
        );
    }

    /**
     * Get paginated orders
     */
    getOrders(page: number = 1, pageSize: number = 10): Observable<OrdersResponse> {
        this.loadingSubject.next(true);

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedOrders = this.mockOrders.slice(startIndex, endIndex);

        const response: OrdersResponse = {
            orders: paginatedOrders,
            total: this.mockOrders.length,
            page,
            pageSize
        };

        return of(response).pipe(
            delay(500),
            map(data => {
                this.loadingSubject.next(false);
                return data;
            }),
            catchError(error => {
                this.loadingSubject.next(false);
                return throwError(() => new Error('Failed to load orders'));
            })
        );
    }

    /**
     * Get order by ID
     */
    getOrderById(id: string): Observable<Order | undefined> {
        this.loadingSubject.next(true);

        const order = this.mockOrders.find(o => o.id === id);

        return of(order).pipe(
            delay(300),
            map(order => {
                this.loadingSubject.next(false);
                if (!order) {
                    throw new Error('Order not found');
                }
                return order;
            }),
            catchError(error => {
                this.loadingSubject.next(false);
                return throwError(() => error);
            })
        );
    }

    /**
     * Update order status
     */
    updateOrderStatus(id: string, status: OrderStatus): Observable<Order> {
        this.loadingSubject.next(true);

        const orderIndex = this.mockOrders.findIndex(o => o.id === id);

        if (orderIndex === -1) {
            this.loadingSubject.next(false);
            return throwError(() => new Error('Order not found'));
        }

        this.mockOrders[orderIndex].status = status;

        return of(this.mockOrders[orderIndex]).pipe(
            delay(300),
            map(order => {
                this.loadingSubject.next(false);
                return order;
            }),
            catchError(error => {
                this.loadingSubject.next(false);
                return throwError(() => new Error('Failed to update order status'));
            })
        );
    }

    /**
     * Get status color class
     */
    getStatusColorClass(status: OrderStatus): string {
        const statusColors: Record<OrderStatus, string> = {
            [OrderStatus.PENDING]: 'bg-blue-100 text-blue-800',
            [OrderStatus.APPROVED]: 'bg-green-100 text-green-800',
            [OrderStatus.IN_PROGRESS]: 'bg-yellow-100 text-yellow-800',
            [OrderStatus.COMPLETED]: 'bg-gray-100 text-gray-800',
            [OrderStatus.CANCELLED]: 'bg-red-100 text-red-800'
        };

        return statusColors[status] || 'bg-gray-100 text-gray-800';
    }
}