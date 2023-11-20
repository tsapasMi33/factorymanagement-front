import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../../../core/models/product.model";
import {ProductFamily} from "../../../core/models/product-family.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-planning',
    templateUrl: './planning.component.html',
    styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  public products!: Product[];
  public clientsPresent!: { id: number, name: string }[];
  public productFamiliesPresent!: ProductFamily[];
  public batchesPresent!: {id: number | null, code: string | null}[];
  public packetsPresent!: {id: number | null, code: string | null}[];

  public totalPages!: number;
  public currentPage!: number

  filterForm: FormGroup;

  constructor(private planningService$: ProductService) {
    this.filterForm = new FormGroup({
      currentStep: new FormControl(null),
      clientId: new FormControl(null),
      productFamilyId: new FormControl(null),
      productVariantCode: new FormControl(null),
      batchId: new FormControl(null),
      packetId: new FormControl(null),
      orderDate: new FormControl(null),
      deliveryDate: new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.currentPage = 1;
    this.load(this.currentPage)
  }

  onFilter() {
    this.currentPage = 1;
    this.load(this.currentPage)
  }

  load(page: number){
    this.planningService$.getProductsPage(page,{...this.filterForm.value}).subscribe({
      next: value => {
        console.log(value)
        this.products = value.content;

        this.clientsPresent = [...new Map(this.products.map(value => [value.order.client.id, value.order.client])).values()];
        this.productFamiliesPresent = [...new Map(this.products.map(value => [value.variant.productFamily.id,value.variant.productFamily])).values()];
        this.batchesPresent = [...new Map(this.products.map(value => [value.batchId, { id: value.batchId, code: value.batchCode }])).values()]
          .filter(value => value.id !== null);
        this.packetsPresent = [...new Map(this.products.map(value => [value.packetId, { id: value.packetId, code: value.packetCode }])).values()]
          .filter(value => value.id !== null);

        this.currentPage = value.pageable.pageNumber + 1;
        this.totalPages = value.totalPages;
      }
    });
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
