import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { AnalyticsCard, ReportData, VisitsData, DashboardAnalytics } from '../models/analytics.model';

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor() { }


   

    getAnalyticsCards(): Observable<AnalyticsCard[]> {
        this.loadingSubject.next(true);

        const mockCards: AnalyticsCard[] = [
            {
                id: '1',
                title: 'Total Revenue',
                value: '$52.6k',
                change: 0.4,
                changeType: 'increase',
                icon: 'attach_money',
                color: '#2196f3'
            },
            {
                id: '2',
                title: 'Today',
                value: '$1024',
                change: 0.5,
                changeType: 'decrease',
                icon: 'receipt_long',
                color: '#2196f3'
            },
            {
                id: '3',
                title: 'Items Sold',
                value: 22,
                icon: 'shopping_cart',
                color: '#2196f3'
            },
            {
                id: '4',
                title: 'Users Active',
                value: 11,
                icon: 'person',
                color: '#2196f3'
            }
        ];

        return of(mockCards).pipe(
            delay(500),
            map(cards => {
                this.loadingSubject.next(false);
                return cards;
            }),
            catchError(error => {
                this.loadingSubject.next(false);
                return throwError(() => new Error('Failed to load analytics cards'));
            })
        );
    }

   
    getReportData(period: 'day' | 'week' | 'month' | 'year' = 'week'): Observable<ReportData> {
        this.loadingSubject.next(true);

        const mockData: Record<string, ReportData> = {
            day: {
                labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
                series: [200, 150, 300, 250, 400, 350, 500, 450],
                period: 'day'
            },
            week: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                series: [250, 350, 280, 450, 520, 580, 620],
                period: 'week'
            },
            month: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                series: [1200, 1800, 1500, 2200],
                period: 'month'
            },
            year: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                series: [5000, 6000, 5500, 7000, 8000, 7500, 9000, 8500, 9500, 10000, 11000, 12000],
                period: 'year'
            }
        };

        return of(mockData[period]).pipe(
            delay(500),
            map(data => {
                this.loadingSubject.next(false);
                return data;
            }),
            catchError(error => {
                this.loadingSubject.next(false);
                return throwError(() => new Error('Failed to load report data'));
            })
        );
    }

  
    getVisitsData(): Observable<VisitsData[]> {
        this.loadingSubject.next(true);

        const mockVisits: VisitsData[] = [
            { day: 'M', visits: 450 },
            { day: 'T', visits: 380 },
            { day: 'W', visits: 520 },
            { day: 'Th', visits: 410 },
            { day: 'F', visits: 490 },
            { day: 'S', visits: 350 },
            { day: 'Su', visits: 280 }
        ];

        return of(mockVisits).pipe(
            delay(500),
            map(visits => {
                this.loadingSubject.next(false);
                return visits;
            }),
            catchError(error => {
                this.loadingSubject.next(false);
                return throwError(() => new Error('Failed to load visits data'));
            })
        );
    }

   
    getDashboardAnalytics(): Observable<DashboardAnalytics> {
        this.loadingSubject.next(true);

        return new Observable(observer => {
            Promise.all([
                this.getAnalyticsCards().toPromise(),
                this.getReportData('week').toPromise(),
                this.getVisitsData().toPromise()
            ])
                .then(([cards, reportData, visitsData]) => {
                    this.loadingSubject.next(false);
                    observer.next({
                        cards: cards || [],
                        reportData: reportData!,
                        visitsData: visitsData || []
                    });
                    observer.complete();
                })
                .catch(error => {
                    this.loadingSubject.next(false);
                    observer.error(error);
                });
        });
    }
}