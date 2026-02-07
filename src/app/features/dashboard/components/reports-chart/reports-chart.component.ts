import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponent, ApexChart, ApexAxisChartSeries, ApexXAxis, ApexYAxis, ApexGrid, ApexTooltip, ApexStroke, ApexFill, ApexDataLabels } from 'ng-apexcharts';
import { ReportData } from '../../../../core/models/analytics.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  colors: string[];
};

@Component({
  selector: 'app-reports-chart',
  templateUrl: './reports-chart.component.html',
  styleUrls: ['./reports-chart.component.scss']
})
export class ReportsChartComponent implements OnChanges {
  @Input() data: ReportData | null = null;
  @Input() isLoading = false;
  @ViewChild('chart') chart!: ChartComponent;

  public chartOptions: Partial<ChartOptions>;
  selectedPeriod: 'day' | 'week' | 'month' | 'year' = 'week';

  constructor() {
    this.chartOptions = this.getDefaultChartOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.updateChart();
    }
  }

  private getDefaultChartOptions(): Partial<ChartOptions> {
    return {
      series: [{
        name: 'Revenue',
        data: []
      }],
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 90, 100]
        }
      },
      colors: ['#2196F3'],
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '12px'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '12px'
          },
          formatter: (value) => {
            return '$' + value.toFixed(0);
          }
        }
      },
      grid: {
        borderColor: '#f3f4f6',
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (value) => {
            return '$' + value.toFixed(2);
          }
        },
        x: {
          show: true
        }
      }
    };
  }

  private updateChart(): void {
    if (!this.data) return;

    this.chartOptions = {
      ...this.chartOptions,
      series: [{
        name: 'Revenue',
        data: this.data.series
      }],
      xaxis: {
        ...this.chartOptions.xaxis,
        categories: this.data.labels
      }
    };
  }

  onPeriodChange(period: string): void {
    this.selectedPeriod = period as 'day' | 'week' | 'month' | 'year';
    // In a real app, this would trigger a service call to fetch new data
    // For now, it just updates the selected period
  }
}