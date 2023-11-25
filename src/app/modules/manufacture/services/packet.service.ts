import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Packet} from "../../../core/models/packet.model";
import {Step} from "../../../core/enums/step.enum";

@Injectable({
  providedIn: 'root'
})
export class PacketService {

  constructor(private http: HttpClient) { }

  getPackets(currentStep: Step) {
    let params = new HttpParams();
    params = params.append('currentStep', currentStep)
    return this.http.get<Packet[]>('http://localhost:8080/packet/all', {params})
  }

  createPacket(packetForm: any) {
    return this.http.post('http://localhost:8080/packet/pack', packetForm)
  }
}
