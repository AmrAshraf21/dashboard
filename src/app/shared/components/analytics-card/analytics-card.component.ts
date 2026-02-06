import { Component, Input } from '@angular/core';
import { AnalyticsCard } from '../../../core/models/analytics.model';

@Component({
  selector: 'app-analytics-card',
  templateUrl: './analytics-card.component.html',
  styleUrls: ['./analytics-card.component.scss']
})
export class AnalyticsCardComponent {
  @Input() card!: AnalyticsCard;

  get changeIcon(): string {
    return this.card.changeType === 'increase' ? 'trending_up' : 'trending_down';
  }

  get changeClass(): string {
    return this.card.changeType === 'increase' ? 'text-green-600' : 'text-red-600';
  }

  get changeSymbol(): string {
    return this.card.changeType === 'increase' ? '+' : '-';
  }
}