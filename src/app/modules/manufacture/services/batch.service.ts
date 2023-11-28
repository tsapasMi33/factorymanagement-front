import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Step} from "../../../core/enums/step.enum";
import {Batch} from "../../../core/models/batch.model";
import {Page} from "../../../core/models/Page.model";

@Injectable()
export class BatchService {

  constructor(private http: HttpClient) { }

  createBatch(batchForm:{products: [{id: number}]}) {
    return this.http.post('http://localhost:8080/batch/put-in-production', [batchForm])
  }

  getBatchesFor(page: number, step: Step) {
    let params = new HttpParams();
    params = params.append('page', page)
    params = params.append('nextStep', step)
    return this.http.get<Page<Batch>>('http://localhost:8080/batch/all',{params})
  }

  doJob(step: Step, batchId: number, action: string){
    let params = new HttpParams();
    params = params.append('step', step)
    return this.http.patch<Batch>('http://localhost:8080/batch/' + batchId + '/' + action, null,{params})
  }



}
