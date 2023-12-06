import {Component, ViewChild} from '@angular/core';

import {StatisticsService} from "../../services/statistics.service";
import {BarChartComponent} from "../bar-chart/bar-chart.component";
import {Stats} from "../../../../core/models/stats.model";
import {NgbCalendar, NgbDate, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-production-statistics',
  templateUrl: './production-statistics.component.html',
  styleUrls: ['./production-statistics.component.css']
})
export class ProductionStatisticsComponent {
  @ViewChild('chart') chart!: BarChartComponent

  ready = false;

  maxDate!: NgbDateStruct;
  minDate!: NgbDateStruct;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate = this.calendar.getToday();
  toDate: NgbDate | null = null;


  private _cache!: CachedStats;


  constructor(private statsService$: StatisticsService,
              private calendar: NgbCalendar) {
    let now = new Date();
    this.maxDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()}
    this.minDate = {year: 2023, month: 1, day: 1}

    this.choosePeriod();
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }


  choosePeriod() {
    let startDate = `${this.fromDate.year}-${this.fromDate.month.toString().padStart(2, '0')}-${this.fromDate.day.toString().padStart(2, '0')}`;
    let endDate;
    if (this.toDate !== null) {
      endDate = `${this.toDate.year}-${this.toDate.month.toString().padStart(2, '0')}-${this.toDate.day.toString().padStart(2, '0')}`;
    } else {
      endDate = startDate;
    }

    this.statsService$.getProductionStatistics(startDate, endDate).subscribe({
      next: value => {
        this._cache = {data: value, parent: null, children: new Map(), level: 'top', concerns: 'all'}
        this.chart.update(this._cache.data.stats, this._cache.data.labels, this._cache.level)
        this.ready = true;
      }
    })
  }


  getDataFor($event: any) {
    if (this.chart.level === 'top') {
      if (this._cache.children.has($event)) {
        this._cache = this._cache.children.get($event)!;
        this.chart.update(this._cache.data.stats, this._cache.data.labels, this._cache.level)
      } else {
        this.statsService$.getStatisticsForStep($event, this._cache.data.startDate, this._cache.data.endDate).subscribe({
          next: value => {
            const cache: CachedStats = {
              data: value,
              parent: this._cache,
              children: new Map(),
              level: 'step',
              concerns: $event
            }
            this._cache.children.set($event, cache)
            this._cache = cache;
            this.chart.update(this._cache.data.stats, this._cache.data.labels, this._cache.level)
          }
        })
      }
    } else {
      if (this._cache.children.has($event)) {
        this._cache = this._cache.children.get($event)!;
        this.chart.update(this._cache.data.stats, this._cache.data.labels, this._cache.level)
      } else {
        this.statsService$.getStatisticsForUser($event, this._cache.concerns, this._cache.data.startDate, this._cache.data.endDate).subscribe({
          next: value => {
            const cache: CachedStats = {
              data: value,
              parent: this._cache,
              children: new Map(),
              level: 'user',
              concerns: $event
            }
            this._cache.children.set($event, cache)
            this._cache = cache;
            this.chart.update(this._cache.data.stats, this._cache.data.labels, this._cache.level)
          }
        })
      }
    }
  }


  get topLevel() {
    return this._cache.parent === null;

  }

  get startDate() {
    return this._cache.data.startDate;
  }

  get endDate() {
    return this._cache.data.endDate
  }

  goBack() {
    if (this._cache.parent !== null) {
      this._cache = this._cache.parent
      this.chart.update(this._cache.data.stats, this._cache.data.labels, this._cache.level)
    }
  }
}

interface CachedStats {
  level: string;
  concerns: string
  data: Stats;
  parent: CachedStats | null;
  children: Map<string, CachedStats>
}
