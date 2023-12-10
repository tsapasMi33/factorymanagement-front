import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StatisticsService} from "../../services/statistics.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LineChartComponent} from "../line-chart/line-chart.component";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart!: LineChartComponent

  form!: FormGroup

  private notifier = new Subject<boolean>();

  constructor(private statsService$: StatisticsService,
              private fb: FormBuilder) {
  }

  ngOnDestroy(): void {
    this.notifier.next(true);
    this.notifier.complete();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      comparison:[false],
      periodSpan:[1],
    })
  }

  getData() {
    this.statsService$.getEvolutionStats(this.form.value)
      .pipe(takeUntil(this.notifier))
      .subscribe({
      next: value => {
        this.chart.update(value)
      }
    })
  }


}
