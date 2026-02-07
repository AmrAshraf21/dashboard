import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponent, ApexChart, ApexAxisChartSeries, ApexXAxis, ApexYAxis, ApexGrid, ApexDataLabels, ApexPlotOptions } from 'ng-apexcharts';
import { VisitsData } from '../../../../core/models/analytics.model';

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  colors: string[];
};

@Component({
  selector: 'app-visits-chart',
  templateUrl: './visits-chart.component.html',
  styleUrls: ['./visits-chart.component.scss']
})
export class VisitsChartComponent implements OnChanges {
  @Input() data: VisitsData[] = [];
  @Input() isLoading = false;
  @ViewChild('chart') chart!: ChartComponent;

  public chartOptions: Partial<BarChartOptions>;
  selectedView: 'day' | 'week' | 'month' = 'day';

  constructor() {
    this.chartOptions = this.getDefaultChartOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.updateChart();
    }
  }

  private getDefaultChartOptions(): Partial<BarChartOptions> {
    return {
      series: [{
        name: 'Visits',
        data: []
      }],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: '50%',
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: false
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
            return value.toFixed(0);
          }
        }
      },
      grid: {
        borderColor: '#f3f4f6',
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true
          }
        },
        xaxis: {
          lines: {
            show: false
          }
        }
      }
    };
  }

  private updateChart(): void {
    if (!this.data || this.data.length === 0) return;

    this.chartOptions = {
      ...this.chartOptions,
      series: [{
        name: 'Visits',
        data: this.data.map(d => d.visits)
      }],
      xaxis: {
        ...this.chartOptions.xaxis,
        categories: this.data.map(d => d.day)
      }
    };
  }

  onViewChange(view: 'day' | 'week' | 'month'): void {
    this.selectedView = view;
    // In a real app, this would trigger a service call to fetch new data
  }
}