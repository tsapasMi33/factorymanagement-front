import {Component, OnInit, ViewChild} from '@angular/core';
import {StatisticsService} from "../../services/statistics.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LineChartComponent} from "../line-chart/line-chart.component";

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent implements OnInit{
  @ViewChild('chart') chart!: LineChartComponent

  form!: FormGroup

  constructor(private statsService$: StatisticsService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      comparison:[false],
      periodSpan:[1],
    })
  }

  getData() {
    this.statsService$.getEvolutionStats(this.form.value).subscribe({
      next: value => {
        this.chart.update(value)
      }
    })
  }


}
