import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../../../core/models/product.model";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {
  public products!: Product[];

  public  collectionSize!: number;
  public page!: number;
  public pageSize!: number;
  public totalPages!: number;
  public maxSize=15;
  public rotate= true;

  constructor(private productService$: ProductService) {
  }

  ngOnInit(): void {
        this.load(1);
    }

  load(page: number) {
    this.productService$.getProductsFor(page, "FINISHED").subscribe({
      next: value => {
        console.log(value)
        this.products = value.content;

        this.collectionSize = value.totalElements;
        this.page = value.number + 1;
        this.pageSize = value.size;
        this.totalPages = value.totalPages;
      },
      error: err => console.error(err)
    })
  }

  onStartJob(id: number) {
    this.productService$.doJob("FINISHED", id, 'start').subscribe();
  }

  onPauseJob(id: number) {
    this.productService$.doJob("FINISHED", id, 'pause').subscribe();
  }

  onFinishJob(id: number) {
    this.productService$.doJob("FINISHED", id, 'finish').subscribe({
      next: response => this.load(this.page),
      error: err => {console.log(err)}
    });
  }

  public pageChanged(event: any) {
    this.load(event);
  }
}
