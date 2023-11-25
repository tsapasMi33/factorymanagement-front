import { Injectable } from '@angular/core';
import {HttpClient, HttpStatusCode} from "@angular/common/http";

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(orderForm : any) {
    return this.http.post<HttpStatusCode>('http://localhost:8080/order', orderForm)
  }
}
