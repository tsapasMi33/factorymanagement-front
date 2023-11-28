import { Component } from '@angular/core';
import {Batch} from "../../../../core/models/batch.model";
import {BatchService} from "../../services/batch.service";

@Component({
  selector: 'app-bend',
  templateUrl: './bend.component.html',
  styleUrls: ['./bend.component.css']
})
export class BendComponent {
  public batches: Batch[] = new Array(5);

  public  collectionSize!: number;
  public page!: number;
  public pageSize!: number;
  public totalPages!: number;
  public maxSize=15;
  public rotate= true;

  public loading = false;

  constructor(private batchService$: BatchService) {
  }

  ngOnInit(): void {
    this.loadContent(1)
  }

  loadContent(page: number) {
    this.loading = true
    this.batchService$.getBatchesFor(page, "BENT").subscribe({
      next: value => {
        this.batches = value.content
        this.batches.forEach(b => b.products.forEach(p => p.variant.components = p.variant.components.filter(c => c.type === 'PLATE')));
        this.collectionSize = value.totalElements;
        this.page = value.number + 1;
        this.pageSize = value.size;
        this.totalPages = value.totalPages;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        console.error(err);
      }
    })
  }

  onStartJob(id: number) {
    this.batchService$.doJob("BENT", id, 'start').subscribe({
      next: () => this.loadContent(1)
    });
  }

  onPauseJob(id: number) {
    this.batchService$.doJob("BENT", id, 'pause').subscribe({
      next: () => this.loadContent(1)
    });
  }

  onFinishJob(batchId: number) {
    this.batchService$.doJob("BENT", batchId, 'finish').subscribe({
      next: response => this.loadContent(this.page),
      error: err => {console.log(err)}
    });

  }

  public pageChanged(event: any) {
    this.loadContent(event);
  }

  isBatchOngoing(batch: Batch) {
    let status: boolean | undefined = batch.products[0].steps.filter(s => s.step === 'BENT')[0]?.paused;
    return status === false
  }

  isBatchPaused(batch: Batch) {
    let status: boolean | undefined = batch.products[0].steps.filter(s => s.step === 'BENT')[0]?.paused;
    return status === true
  }

  getCurrentUser(batch: Batch) {
    return batch.products[0].steps.filter(s => s.step === 'BENT')[0]?.createdBy.username
  }
}
