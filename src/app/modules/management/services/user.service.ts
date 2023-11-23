import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../../core/models/user.model";
import {Client} from "../../../core/models/client.model";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>('http://localhost:8080/user/all')
  }

  getUser(id: number) {
    return this.http.get<User>('http://localhost:8080/user/' + id)
  }


  updateUser(id:number, user: any) {
    return this.http.put('http://localhost:8080/user/' + id, {user}) // always empty body
  }

  createUser(user: any) {
    return this.http.post('http://localhost:8080/user/create-user', user);
  }

  toggleUser(id:number, enable: boolean) {
    if (enable) {
      return this.http.patch('http://localhost:8080/user/' + id + '/enable',{})
    } else {
      return this.http.patch('http://localhost:8080/user/' + id + '/disable',{})
    }
  }
}
