import {Component, OnInit} from '@angular/core';
import {CachedStats} from "../../../../core/models/cached-stats.model";
import {StatisticsService} from "../../services/statistics.service";

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.css']
})
export class BenefitComponent implements OnInit {

  private _cache!: CachedStats;

  constructor(private statsService$ : StatisticsService) {
  }

  ngOnInit(): void {
  }

  getOverallBenefitStats() {
    this.statsService$.getBenefitStats()
  }

}
