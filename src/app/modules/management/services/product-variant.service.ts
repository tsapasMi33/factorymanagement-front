import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProductVariant} from "../../../core/models/product-variant.model";

@Injectable({
  providedIn: 'root'
})
export class ProductVariantService {

  constructor(private http: HttpClient) { }

  createProductVariant(productVariant: any) {
    return this.http.post('http://localhost:8080/product-variant', productVariant)
  }

  getProductVariants() {
    return this.http.get<ProductVariant[]>('http://localhost:8080/product-variant/all');
  }

  updateVariant(selectedVariant: ProductVariant) {
    let params = new HttpParams()
    params = params.append('price', selectedVariant.price)
    return this.http.patch('http://localhost:8080/product-variant/' + selectedVariant.id,null,{params})
  }
}
