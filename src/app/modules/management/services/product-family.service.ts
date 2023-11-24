import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductFamily} from "../../../core/models/product-family.model";

@Injectable()
export class ProductFamilyService {

  constructor(private http: HttpClient) { }

  getProductFamilies() {
    return this.http.get<ProductFamily[]>('http://localhost:8080/product-family/all')
  }

  saveProductFamily(productFamilyForm: any) {
    return this.http.post('http://localhost:8080/product-family', productFamilyForm)
  }
}
