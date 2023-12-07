import {Component, OnInit, ViewChild} from '@angular/core';
import {StatisticsService} from "../../services/statistics.service";
import {BarChartComponent} from "../bar-chart/bar-chart.component";
import {Benefit} from "../../../../core/models/Benefit.model";

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.css']
})
export class BenefitComponent implements OnInit {
  @ViewChild('chart') chart!: BarChartComponent

  ready = false;

  private _cache!: CachedStats;

  constructor(private statsService$ : StatisticsService) {
  }

  ngOnInit(): void {
    this.getOverallBenefitStats();
  }

  getOverallBenefitStats() {
    this.statsService$.getBenefitStats().subscribe({
      next: value => {
        this._cache = {data: value, parent: null, children: new Map(), level: 'top', concerns: 'all'}
        this.chart.updateBenefit(value, 'top')
        this.ready = true
      }
    })
  }

  getDataFor($event: any) {
    if (this.chart.level === 'top') {
      if (this._cache.children.has($event)) {
        this._cache = this._cache.children.get($event)!;
        this.chart.updateBenefit(this._cache.data, this._cache.level)
      } else {
        this.statsService$.getBenefitStatsFor($event).subscribe({
          next: value => {
            const cache: CachedStats = {
              data: value,
              parent: this._cache,
              children: new Map(),
              level: 'family',
              concerns: $event
            }
            this._cache.children.set($event, cache);
            this._cache = cache;
            this.chart.updateBenefit(this._cache.data, this._cache.level);
          }
        })
      }
    }
  }

  get topLevel() {
    return this._cache.parent === null;

  }

  goBack() {
    if (this._cache.parent !== null) {
      this._cache = this._cache.parent
      this.chart.updateBenefit(this._cache.data, this._cache.level)
    }
  }
}
interface CachedStats {
  level: string;
  concerns: string
  data: Benefit;
  parent: CachedStats | null;
  children: Map<string, CachedStats>
}
