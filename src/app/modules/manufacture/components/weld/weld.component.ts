import { Component } from '@angular/core';
import {Batch} from "../../../../core/models/batch.model";
import {BatchService} from "../../services/batch.service";

@Component({
  selector: 'app-weld',
  templateUrl: './weld.component.html',
  styleUrls: ['./weld.component.css']
})
export class WeldComponent {
  public batches!: Batch[];

  public  collectionSize!: number;
  public page!: number;
  public pageSize!: number;
  public totalPages!: number;
  public maxSize=15;
  public rotate= true;

  constructor(private batchService$: BatchService) {
  }

  ngOnInit(): void {
    this.load(1)
  }

  load(page: number) {
    this.batchService$.getBatchesFor(page, "WELDED").subscribe({
      next: value => {
        this.batches = value.content;

        this.collectionSize = value.totalElements;
        this.page = value.number + 1;
        this.pageSize = value.size;
        this.totalPages = value.totalPages;
      },
      error: err => console.error(err)
    })
  }

  onStartJob(id: number) {
    this.batchService$.doJob("WELDED", id, 'start').subscribe();
  }

  onPauseJob(id: number) {
    this.batchService$.doJob("WELDED", id, 'pause').subscribe();
  }

  onFinishJob(id: number) {
    this.batchService$.doJob("WELDED", id, 'finish').subscribe({
      next: response => this.load(this.page),
      error: err => {console.log(err)}
    });

  }

  public pageChanged(event: any) {
    this.load(event);
  }
}
