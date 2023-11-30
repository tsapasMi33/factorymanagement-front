import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Stats} from "../../../core/models/stats.model";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  getProductionStatistics(form: any){
    return this.http.post<Stats>('http://localhost:8080/stats/production',
      {startDate: new Date(2023,10,31), endDate:  new Date(2023,10,31) })
  }
}
