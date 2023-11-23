import { Component } from '@angular/core';
import {Batch} from "../../../../core/models/batch.model";
import {BatchService} from "../../services/batch.service";

@Component({
  selector: 'app-bend',
  templateUrl: './bend.component.html',
  styleUrls: ['./bend.component.css']
})
export class BendComponent {
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
    this.batchService$.getBatchesFor(page, "BENT").subscribe({
      next: value => {
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
    this.batchService$.doJob("BENT", id, 'start').subscribe();
  }

  onPauseJob(id: number) {
    this.batchService$.doJob("BENT", id, 'pause').subscribe();
  }

  onFinishJob(batchId: number) {
    this.batchService$.doJob("BENT", batchId, 'finish').subscribe({
      next: response => this.load(this.page),
      error: err => {console.log(err)}
    });

  }

  public pageChanged(event: any) {
    this.load(event);
  }
}
