import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Client} from "../../../core/models/client.model";

@Injectable()
export class ClientService {

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get<Client[]>('http://localhost:8080/client/all')
  }

  getClient(id: number) {
    return this.http.get<Client>('http://localhost:8080/client/' + id)
  }

  updateClient(id:number, client: any) {
    return this.http.put('http://localhost:8080/client/' + id, client) // always empty body
  }

  createClient(client: any) {
    return this.http.post('http://localhost:8080/client', client);
  }

  deleteClient(id: number) {
    return this.http.delete('http://localhost:8080/client/' + id)
  }
}
