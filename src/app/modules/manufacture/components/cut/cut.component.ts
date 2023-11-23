import {Component, OnInit} from '@angular/core';
import {BatchService} from "../../services/batch.service";
import {Batch} from "../../../../core/models/batch.model";

@Component({
  selector: 'app-cut',
  templateUrl: './cut.component.html',
  styleUrls: ['./cut.component.css']
})
export class CutComponent implements OnInit{
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
    this.batchService$.getBatchesFor(page, "CUT").subscribe({
      next: value => {
        console.log(value)
        this.batches = value.content.map(batch => {
          batch.products.map(product => {
            product.variant.components.filter(component => component.type === "PLATE")
            return product;
          });
          return batch;
        });

        this.collectionSize = value.totalElements;
        this.page = value.number + 1;
        this.pageSize = value.size;
        this.totalPages = value.totalPages;
      },
      error: err => console.error(err)
    })
  }

  onStartJob(id: number) {
    this.batchService$.doJob("CUT", id, 'start').subscribe();
  }

  onPauseJob(id: number) {
    this.batchService$.doJob("CUT", id, 'pause').subscribe();
  }

  onFinishJob(id: number) {
    this.batchService$.doJob("CUT", id, 'finish').subscribe({
      next: response => this.load(this.page),
      error: err => {console.log(err)}
    });
  }

  public pageChanged(event: any) {
    this.load(event);
  }
}
