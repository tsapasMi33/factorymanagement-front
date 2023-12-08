import {Component, ViewChild} from '@angular/core';
import {Batch} from "../../../../core/models/batch.model";
import {BatchService} from "../../services/batch.service";
import {AuthService} from "../../../../services/auth.service";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {debounceTime, Subject, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AlertType} from "../../../../core/enums/alertType.enum";

@Component({
  selector: 'app-weld',
  templateUrl: './weld.component.html',
  styleUrls: ['./weld.component.css']
})
export class WeldComponent {
  public batches: Batch[] = new Array(5);

  public  collectionSize!: number;
  public page!: number;
  public pageSize!: number;
  public totalPages!: number;
  public maxSize=15;
  public rotate= true;

  scanInput = '';

  public loading = false;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  alertType = 'danger'
  private _message$ = new Subject<string>();
  message = ''

  constructor(private batchService$: BatchService,
              private authService$: AuthService) {
    this._message$
      .pipe(
        takeUntilDestroyed(),
        tap((message) => (this.message = message)),
        debounceTime(5000),
      )
      .subscribe(() => this.selfClosingAlert?.close());
  }

  ngOnInit(): void {
    this.loadContent(1)
  }

  loadContent(page: number) {
    this.loading = true;
    this.batchService$.getBatchesFor(page, "WELDED").subscribe({
      next: value => {
        this.batches = value.content;
        this.collectionSize = value.totalElements;
        this.page = value.number + 1;
        this.pageSize = value.size;
        this.totalPages = value.totalPages;
        this.loading = false;
      },
      error: () => this.showMessage("An unexpected error occurred! Please Reload the page. If the problem persists, contact tech support.", "danger")
    })
  }

  onStartJob(id: number, index: number) {
    this.batchService$.doJob("WELDED", id, 'start').subscribe({
      next: value => this.batches[index] = value,
      error: err => this.showMessage(err.error.errors.message, "warning")
    });
  }

  onPauseJob(id: number, index: number) {
    this.batchService$.doJob("WELDED", id, 'pause').subscribe({
      next: value => this.batches[index] = value,
      error: err => this.showMessage(err.error.errors.message, "warning")
    });
  }

  onFinishJob(id: number, index: number) {
    this.batchService$.doJob("WELDED", id, 'finish').subscribe({
      next: () => this.batches.splice(index, 1),
      error: err => this.showMessage(err.error.errors.message, "warning")
    });
  }

  public pageChanged(event: any) {
    this.loadContent(event);
  }

  isBatchOngoing(batch: Batch) {
    let status: boolean | undefined = batch.products[0].steps.filter(s => s.step === 'WELDED' && !s.finished)[0]?.paused;
    return status === false
  }

  isBatchPaused(batch: Batch) {
    let status: boolean | undefined = batch.products[0].steps.filter(s => s.step === 'WELDED' && !s.finished)[0]?.paused;
    return status === true
  }

  getCurrentUser(batch: Batch) {
    return batch.products[0].steps.filter(s => s.step === 'WELDED' && !s.finished)[0]?.createdBy.username
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
      },
      error: err => this.showMessage(err.error.errors.message, "warning")
    })
  }

  disableButton(batch: Batch, action: string) {
    if (action === 'start') {
      return this.isBatchOngoing(batch) ||
        (this.isBatchPaused(batch) && this.getCurrentUser(batch) !== this.authService$.connectedUser?.username);

    } else if (action === 'pause') {
      return this.isBatchPaused(batch) ||
        !this.isBatchOngoing(batch) ||
        (this.isBatchOngoing(batch) && this.getCurrentUser(batch) !== this.authService$.connectedUser?.username);

    } else {
      return !this.isBatchOngoing(batch) ||
        this.isBatchPaused(batch) ||
        (this.isBatchOngoing(batch) && this.getCurrentUser(batch) !== this.authService$.connectedUser?.username);

    }
  }

  private showMessage(message: string, type: AlertType) {
    this.alertType = type;
    this._message$.next(message);
  }
}
