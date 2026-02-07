import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AnalyticsService } from '../../../../core/services/analytics.service';
import { OrdersService } from '../../../../core/services/order.service';
import { AnalyticsCard, ReportData, VisitsData } from '../../../../core/models/analytics.model';
import { Order } from '../../../../core/models/orders.model';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  analyticsCards: AnalyticsCard[] = [];
  reportData: ReportData | null = null;
  visitsData: VisitsData[] = [];
  recentOrders: Order[] = [];

  isLoadingAnalytics = false;
  isLoadingOrders = false;
  error: string | null = null;

  constructor(
    private analyticsService: AnalyticsService,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadDashboardData(): void {
    this.loadAnalytics();
    this.loadOrders();
  }

  private loadAnalytics(): void {
    this.isLoadingAnalytics = true;

    this.analyticsService.getDashboardAnalytics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.analyticsCards = data.cards;
          this.reportData = data.reportData;
          this.visitsData = data.visitsData;
          this.isLoadingAnalytics = false;
        },
        error: (error: any) => {
          console.error('Error loading analytics:', error);
          this.error = 'Failed to load analytics data. Please try again.';
          this.isLoadingAnalytics = false;
        }
      });
  }

  private loadOrders(): void {
    this.isLoadingOrders = true;

    this.ordersService.getRecentOrders(3)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (orders: any) => {
          this.recentOrders = orders;
          this.isLoadingOrders = false;
        },
        error: (error: any) => {
          console.error('Error loading orders:', error);
          this.error = 'Failed to load recent orders. Please try again.';
          this.isLoadingOrders = false;
        }
      });
  }

  onRefresh(): void {
    this.error = null;
    this.loadDashboardData();
  }

  trackByCardId(index: number, card: AnalyticsCard): string {
    return card.id;
  }
}