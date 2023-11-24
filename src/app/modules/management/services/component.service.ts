import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductComponent} from "../../../core/models/product-component.model";

@Injectable()
export class ComponentService {

  constructor(private http: HttpClient) { }

  getComponents() {
    return this.http.get<ProductComponent[]>('http://localhost:8080/component/all');
  }

  createComponent(component: any) {
    return this.http.post('http://localhost:8080/component', component)
  }

  updateComponent(id: number, component: any) {
    return this.http.put('http://localhost:8080/component/' + id, component)
  }
}
