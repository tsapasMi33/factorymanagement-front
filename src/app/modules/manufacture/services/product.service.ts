import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../../../core/models/product.model";
import {Step} from "../../../core/enums/step.enum";
import {Page} from "../../../core/models/Page.model";
import {Client} from "../../../core/models/client.model";
import {Batch} from "../../../core/models/batch.model";
import {ProductFamily} from "../../../core/models/product-family.model";
import {Packet} from "../../../core/models/packet.model";


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
    let params = new HttpParams();
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

  getProductsFor(page: number, step: Step) {
    let params = new HttpParams();
    params = params.append('page', page)
    params = params.append('nextStep', step);

    return this.http.get<Page<Product>>('http://localhost:8080/product/all',{params})
  }

  doJob(step: Step, productId: number, action: string){
    let params = new HttpParams();
    params = params.append('step', step)
    return this.http.patch<Product>('http://localhost:8080/product/' + productId + '/' + action, null,{params})
  }

  archiveAll() {
    return this.http.patch('http://localhost:8080/product/archive', null)
  }

  getActiveClients(productsAtStep?: Step, productsAtNextStep?: Step) {
    let params = new HttpParams();
    if (productsAtStep){
      params = params.append('productsAtStep', productsAtStep)
    }
    if (productsAtNextStep){
      params = params.append('productsAtNextStep', productsAtNextStep)
    }
    return this.http.get<Client[]>('http://localhost:8080/client/all-active', {params});
  }

  getActiveFamilies(productsAtStep?: Step, productsAtNextStep?: Step) {
    let params = new HttpParams();
    if (productsAtStep){
      params = params.append('productsAtStep', productsAtStep)
    }
    if (productsAtNextStep){
      params = params.append('productsAtNextStep', productsAtNextStep)
    }
    return this.http.get<ProductFamily[]>('http://localhost:8080/product-family/all-active', {params})
  }

  getActiveBatches(){
    return this.http.get<Batch[]>('http://localhost:8080/batch/all-active')
  }

  getActivePackets() {
    return this.http.get<Packet[]>('http://localhost:8080/packet/all-active')
  }

  getProductByCode(orderCode: string, productCode: string) {
    return this.http.get<Product>('http://localhost:8080/product/code/' + orderCode + '/' + productCode);
}
}
