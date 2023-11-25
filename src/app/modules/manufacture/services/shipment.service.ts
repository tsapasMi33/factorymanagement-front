import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(private http: HttpClient) { }

  shipPackets(shipmentForm: any) {
    return this.http.post('http://localhost:8080/shipment/send', shipmentForm)
  }
}
