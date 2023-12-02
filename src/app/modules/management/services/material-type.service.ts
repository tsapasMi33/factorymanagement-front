import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {MaterialType} from "../../../core/models/material-type.model";

@Injectable({
  providedIn: 'root'
})
export class MaterialTypeService {

  constructor(private http: HttpClient) { }

  getMaterialTypes() {
    return this.http.get<MaterialType[]>('http://localhost:8080/material-type/all')
  }

  create(value: any) {
    return this.http.post('http://localhost:8080/material-type', value)
  }

  update(value: any) {
    return this.http.put('http://localhost:8080/material-type/' + value.id, value)
  }
}
