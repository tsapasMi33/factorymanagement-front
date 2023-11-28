import {Component, OnInit} from '@angular/core';
import {BatchService} from "../../services/batch.service";
import {Batch} from "../../../../core/models/batch.model";
import {Step} from "../../../../core/enums/step.enum";

@Component({
  selector: 'app-cut',
  templateUrl: './cut.component.html',
  styleUrls: ['./cut.component.css']
})
export class CutComponent implements OnInit{
  public batches: Batch[] = new Array(5)

  public  collectionSize!: number;
  public page!: number;
  public pageSize!: number;
  public totalPages!: number;
  public maxSize=15;
  public rotate= true;

  public loading = false

  constructor(private batchService$: BatchService) {
  }

  ngOnInit(): void {
    this.loadContent(1)
  }

  loadContent(page: number) {
    this.loading = true
    this.batchService$.getBatchesFor(page, "CUT").subscribe({
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
    this.batchService$.doJob("CUT", id, 'start').subscribe({
      next: () => this.loadContent(1)
    });
  }

  onPauseJob(id: number) {
    this.batchService$.doJob("CUT", id, 'pause').subscribe({
      next: () => this.loadContent(1)
    });
  }

  onFinishJob(id: number) {
    this.batchService$.doJob("CUT", id, 'finish').subscribe({
      next: response => this.loadContent(this.page),
      error: err => {console.log(err)}
    });
  }

  public pageChanged(event: any) {
    this.loadContent(event);
  }

  isBatchOngoing(batch: Batch) {
    let status: boolean | undefined = batch.products[0].steps.filter(s => s.step === 'CUT')[0]?.paused;
    return status === false
  }

  isBatchPaused(batch: Batch) {
    let status: boolean | undefined = batch.products[0].steps.filter(s => s.step === 'CUT')[0]?.paused;
    return status === true
  }

  getCurrentUser(batch: Batch) {
    return batch.products[0].steps.filter(s => s.step === 'CUT')[0]?.createdBy.username
  }
}
