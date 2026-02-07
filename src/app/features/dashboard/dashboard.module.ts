import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Components
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { ReportsChartComponent } from './components/reports-chart/reports-chart.component';
import { VisitsChartComponent } from './components/visits-chart/visits-chart.component';
import { RecentOrdersComponent } from './components/recent-orders/recent-orders.component';

@NgModule({
  declarations: [
    DashboardMainComponent,
    ReportsChartComponent,
    VisitsChartComponent,
    RecentOrdersComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgApexchartsModule
  ]
})
export class DashboardModule { }