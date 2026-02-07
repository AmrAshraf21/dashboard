export interface AnalyticsCard {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon: string;
  color?: string;
}

export interface ReportData {
  labels: string[];
  series: number[];
  period: 'day' | 'week' | 'month' | 'year';
}

export interface VisitsData {
  day: string;
  visits: number;
}

export interface DashboardAnalytics {
  cards: AnalyticsCard[];
  reportData: ReportData;
  visitsData: VisitsData[];
}