import { Component, OnInit} from '@angular/core';
import {Batch} from "../../../../core/models/batch.model";
import {BatchService} from "../../services/batch.service";
import {ProductComponent} from "../../../../core/models/product-component.model";

@Component({
  selector: 'app-combine',
  templateUrl: './combine.component.html',
  styleUrls: ['./combine.component.css']
})
export class CombineComponent implements OnInit {
  public batches: Batch[] = new Array(5);

  public  collectionSize!: number;
  public page!: number;
  public pageSize!: number;
  public totalPages!: number;
  public maxSize=15;
  public rotate= true;

  scanInput = '';

  public loading = false;

  constructor(private batchService$: BatchService) {
  }

  ngOnInit(): void {
    this.loadContent(1)
  }

  loadContent(page: number) {
    this.loading = true
    this.batchService$.getBatchesFor(page, "COMBINED").subscribe({
      next: value => {
        value.content.forEach(b => b.batchComponents = this.mapBatchComponents(b))
        this.batches = value.content
        this.collectionSize = value.totalElements;
        this.page = value.number + 1;
        this.pageSize = value.size;
        this.totalPages = value.totalPages;
        this.loading = false;
        console.log(this.batches)
      },
      error: err => {
        this.loading = false;
        console.error(err);
      }
    })
  }

  onStartJob(id: number, index: number) {
    this.batchService$.doJob("COMBINED", id, 'start').subscribe({
      next: value => {
        value.batchComponents = this.mapBatchComponents(value);
        this.batches[index] = value;
      }
    });
  }

  onPauseJob(id: number, index: number) {
    this.batchService$.doJob("COMBINED", id, 'pause').subscribe({
      next: value => {
        value.batchComponents = this.mapBatchComponents(value);
        this.batches[index] = value
      }
    });
  }

  onFinishJob(id: number, index: number) {
    this.batchService$.doJob("COMBINED", id, 'finish').subscribe({
      next: value => this.batches.splice(index, 1),
      error: err => {console.log(err)}
    });

  }

  public pageChanged(event: any) {
    this.loadContent(event);
  }

  isBatchOngoing(batch: Batch) {
    let status: boolean | undefined = batch.products[0].steps.filter(s => s.step === 'COMBINED')[0]?.paused;
    return status === false
  }

  isBatchPaused(batch: Batch) {
    let status: boolean | undefined = batch.products[0].steps.filter(s => s.step === 'COMBINED')[0]?.paused;
    return status === true
  }

  getCurrentUser(batch: Batch) {
    return batch.products[0].steps.filter(s => s.step === 'COMBINED')[0]?.createdBy.username
  }

  checkInput() {
    const regex  = /[0-9]{8}/;
    if (regex.test(this.scanInput)) {
      this.doJob()
      this.scanInput = '';
    }
  }

  doJob() {
    this.batchService$.getBatchByCode(this.scanInput).subscribe({
      next: value => {
        if (!this.isBatchOngoing(value)) {
          this.batches.filter(b => b.id !== value.id);
          this.batches.splice(0,0, value)
          this.onStartJob(value.id, 0);
        } else {
          this.onFinishJob(value.id, 0);
        }
      }
    })
  }

  mapBatchComponents(batch: Batch) {
    const batchMap = new Map<number, {component: ProductComponent, count: number}>()
    batch.products.forEach( p => {
      p.variant.components.forEach( c => {
        if (batchMap.has(c.id)) {
          batchMap.set(c.id,{component: c ,count: batchMap.get(c.id)!.count! + 1})
        } else {
          batchMap.set(c.id, {component: c, count: 1})
        }
      })
    })
    return [...batchMap.values()];
  }
}
