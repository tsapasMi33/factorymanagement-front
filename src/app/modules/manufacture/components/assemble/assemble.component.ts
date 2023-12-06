import { Component } from '@angular/core';
import {Batch} from "../../../../core/models/batch.model";
import {BatchService} from "../../services/batch.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-assemble',
  templateUrl: './assemble.component.html',
  styleUrls: ['./assemble.component.css']
})
export class AssembleComponent {
  public batches: Batch[] = new Array(5);

  public  collectionSize!: number;
  public page!: number;
  public pageSize!: number;
  public totalPages!: number;
  public maxSize=15;
  public rotate= true;

  scanInput = '';

  public loading = false;

  constructor(private batchService$: BatchService,
              private authService$: AuthService) {
  }

  ngOnInit(): void {
    this.loadContent(1)
  }

  loadContent(page: number) {
    this.loading = true;
    this.batchService$.getBatchesFor(page, "ASSEMBLED").subscribe({
      next: value => {
        this.batches = value.content;
        this.collectionSize = value.totalElements;
        this.page = value.number + 1;
        this.pageSize = value.size;
        this.totalPages = value.totalPages;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        console.error(err)
      }
    })
  }

  onStartJob(id: number, index: number) {
    this.batchService$.doJob("ASSEMBLED", id, 'start').subscribe({
      next: value => this.batches[index] = value
    });
  }

  onPauseJob(id: number, index: number) {
    this.batchService$.doJob("ASSEMBLED", id, 'pause').subscribe({
      next: value => this.batches[index] = value
    });
  }

  onFinishJob(id: number, index: number) {
    this.batchService$.doJob("ASSEMBLED", id, 'finish').subscribe({
      next: value => this.batches.splice(index, 1),
      error: err => {console.log(err)}
    });
  }

  public pageChanged(event: any) {
    this.loadContent(event);
  }

  isBatchOngoing(batch: Batch) {
    let status: boolean | undefined = batch.products[0].steps.filter(s => s.step === 'ASSEMBLED' && !s.finished)[0]?.paused;
    return status === false
  }

  isBatchPaused(batch: Batch) {
    let status: boolean | undefined = batch.products[0].steps.filter(s => s.step === 'ASSEMBLED' && !s.finished)[0]?.paused;
    return status === true
  }

  getCurrentUser(batch: Batch) {
    return batch.products[0].steps.filter(s => s.step === 'ASSEMBLED' && !s.finished)[0]?.createdBy.username
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

  disableButton(batch: Batch, action: string) {
    if (action === 'start') {
      if (this.isBatchOngoing(batch) ||
        (this.isBatchPaused(batch) && this.getCurrentUser(batch) !== this.authService$.connectedUser?.username)) {
        return true;
      }
      return false;
    } else if (action === 'pause') {
      if (this.isBatchPaused(batch) ||
        !this.isBatchOngoing(batch) ||
        (this.isBatchOngoing(batch) && this.getCurrentUser(batch) !== this.authService$.connectedUser?.username)){
        return true;
      }
      return false;
    } else {
      if (!this.isBatchOngoing(batch) ||
        this.isBatchPaused(batch) ||
        (this.isBatchOngoing(batch) && this.getCurrentUser(batch) !== this.authService$.connectedUser?.username)) {
        return true;
      }
      return false;
    }
  }
}
