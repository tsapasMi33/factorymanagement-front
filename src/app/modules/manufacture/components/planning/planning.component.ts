import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../../../core/models/product.model";
import {ProductFamily} from "../../../../core/models/product-family.model";
import {FormControl, FormGroup} from "@angular/forms";
import {Client} from "../../../../core/models/client.model";

@Component({
    selector: 'app-planning',
    templateUrl: './planning.component.html',
    styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  public products!: Product[];
  public clientsPresent!: Client[];
  public productFamiliesPresent!: ProductFamily[];
  public batchesPresent!: {id: number | null, code: string | null}[];
  public packetsPresent!: {id: number | null, code: string | null}[];

  public  collectionSize!: number;
  public page!: number;
  public pageSize!: number;
  public totalPages!: number;
  public maxSize=15;
  public rotate= true;

  filterForm: FormGroup;

  constructor(private productService$: ProductService) {
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
    this.page = 1
    this.load(this.page)
  }

  onFilter() {
    this.load(1);
  }

  load(page: number){
    this.productService$.getProductsPage(page,{...this.filterForm.value}).subscribe({
      next: value => {
        this.products = value.content;
        this.productFamiliesPresent = [...new Map(this.products.map(value => [value.variant.productFamily.id,value.variant.productFamily])).values()];
        this.batchesPresent = [...new Map(this.products.map(value => [value.batchId, { id: value.batchId, code: value.batchCode }])).values()]
          .filter(value => value.id !== null);
        this.packetsPresent = [...new Map(this.products.map(value => [value.packetId, { id: value.packetId, code: value.packetCode }])).values()]
          .filter(value => value.id !== null);

        this.collectionSize = value.totalElements;
        this.maxSize = 10;
        this.page = value.number + 1;
        this.pageSize = value.size;
        this.totalPages = value.totalPages;
      }
    });
    this.productService$.getActiveClients().subscribe({
      next: value => {
        this.clientsPresent = value
      }
    })
  }

  public pageChanged(event: any) {
    this.load(event);
  }

  archiveAll() {
    this.productService$.archiveAll().subscribe({
      next: () => this.load(1)
    })
  }
}
