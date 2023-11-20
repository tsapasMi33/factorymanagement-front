import {Component, OnInit} from '@angular/core';
import {BatchService} from "../../services/batch.service";
import {Batch} from "../../../../core/models/batch.model";

@Component({
  selector: 'app-cut',
  templateUrl: './cut.component.html',
  styleUrls: ['./cut.component.css']
})
export class CutComponent implements OnInit{
  public batches!: Batch[]

  public totalPages!: number;
  public currentPage!: number

  constructor(private batchService$: BatchService) {
  }

  ngOnInit(): void {
    this.currentPage = 1;
    this.load(this.currentPage)
    console.log(this.currentPage)
  }

  load(page: number) {
    this.batchService$.getBatchesFor(page, "CUT").subscribe({
      next: response => {
        console.log(response)
        this.batches = response.content.map(batch => {
          batch.products.map(product => {
            product.variant.components.filter(component => component.type === "PLATE")
            return product;
          });
          return batch;
        });

        this.currentPage = response.pageable.pageNumber + 1;
        this.totalPages = response.totalPages;
        console.log(this.currentPage, this. totalPages)
      },
      error: err => console.error(err)
    })
  }

  onStartCut(batchId: number) {
    this.batchService$.doJob("CUT", batchId, 'start').subscribe();
  }

  onPauseCut(batchId: number) {
    this.batchService$.doJob("CUT", batchId, 'pause').subscribe();
  }

  onFinishCut(batchId: number) {
    this.load(this.currentPage)
    this.batchService$.doJob("CUT", batchId, 'finish').subscribe();
  }

  get pagesNav(): number[] {
    const displayedPages = [];
    let totalPagesToShow = 10;
    const halfPagesToShow = Math.floor(totalPagesToShow / 2);

    if( this.totalPages < 11) {
      totalPagesToShow = this.totalPages
    }

    let startPage = this.currentPage - halfPagesToShow;
    let endPage = this.currentPage + halfPagesToShow;

    if (startPage < 1) {
      startPage = 1;
      endPage = totalPagesToShow;
    }

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = this.totalPages - totalPagesToShow + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      displayedPages.push(i);
    }

    return displayedPages;
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
    this.load(this.currentPage);
  }

  goToPage(page: number) {
    this.load(page);
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
    }
    this.load(this.currentPage);
  }
}
