import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../../../core/models/product.model";
import {Step} from "../../../core/enums/step.enum";
import {Page} from "../../../core/models/Page.model";


interface Filter {
  batchId: number | null,
  clientId: number | null,
  currentStep: Step | null,
  deliveryDate: Date | null,
  orderDate: Date | null,
  packetId: number | null,
  productFamilyId: number | null,
  productVariantCode: string | null
}

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductsPage(page: number,filter: Filter) {
    let params = new HttpParams()
    params = params.append('page', page)
    for (const filterKey in filter) {
      let key = filterKey as keyof Filter
      let value = filter[key]
      if( filter[key] == 'null' )
        value = null
      if( value !== null ) {
        params = params.append(filterKey, value.toString())
      }
    }
    return this.http.get<Page<Product>>('http://localhost:8080/product/all', {params})
  }
}
