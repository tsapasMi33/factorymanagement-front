import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Stats} from "../../../core/models/stats.model";
import {Step} from "../../../core/enums/step.enum";
import {Evolution} from "../../../core/models/evolution.model";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  getProductionStatistics(startDate: string, endDate: string){
    return this.http.post<Stats>('http://localhost:8080/stats/production',
      {startDate: startDate, endDate: endDate})
  }

  getStatisticsForStep(step: string, startDate: Date, endDate: Date) {
    return this.http.post<Stats>('http://localhost:8080/stats/production/step',
      {step: step ,startDate: startDate, endDate: endDate })
  }

  getStatisticsForUser(username: string, step: string, startDate: Date, endDate: Date) {
    return this.http.post<Stats>('http://localhost:8080/stats/production/step/user',
      {username: username, step: step ,startDate: startDate, endDate: endDate })
  }

  getEvolutionStats(value: any) {
    return this.http.post<Evolution>('http://localhost:8080/stats/evolution', value)
  }

  getWorkload() {
    return this.http.get<Stats>('http://localhost:8080/stats/workload')
  }
}
