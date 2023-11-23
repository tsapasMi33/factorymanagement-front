import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../core/models/product.model";
import {ProductFamily} from "../../../../core/models/product-family.model";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {BatchService} from "../../services/batch.service";

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
  public products!: Product[];
  public clientsPresent!: { id: number, name: string }[];
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
  createBatchForm: FormGroup;

  constructor(private planningService$: ProductService,
              private batchService$: BatchService) {

    this.filterForm = new FormGroup({
      clientId: new FormControl(null),
      productFamilyId: new FormControl(null),
      productVariantCode: new FormControl(null),
      orderDate: new FormControl(null),
      deliveryDate: new FormControl(null)
    });

    this.createBatchForm = new FormGroup({
      products: new FormArray(
        []
      )
    })
  }

  ngOnInit(): void {
    this.load(1)
  }

  onFilter() {
    this.load(1)
  }

  load(page: number){
    this.planningService$.getProductsPage(page,{currentStep:"ENCODED",...this.filterForm.value}).subscribe({
      next: value => {
        this.products = value.content;

        this.clientsPresent = [...new Map(this.products.map(value => [value.order.client.id, value.order.client])).values()];
        this.productFamiliesPresent = [...new Map(this.products.map(value => [value.variant.productFamily.id,value.variant.productFamily])).values()];
        this.batchesPresent = [...new Map(this.products.map(value => [value.batchId, { id: value.batchId, code: value.batchCode }])).values()]
          .filter(value => value.id !== null);
        this.packetsPresent = [...new Map(this.products.map(value => [value.packetId, { id: value.packetId, code: value.packetCode }])).values()]
          .filter(value => value.id !== null);

        this.collectionSize = value.totalElements;
        this.page = value.number + 1;
        this.pageSize = value.size;
        this.totalPages = value.totalPages;
      }
    });
  }

  get createBatchFormArray(): FormArray {
    return this.createBatchForm.get('products') as FormArray;
  }

  onCheckBoxChange(event: any, productId: number) {
    if (event.target.checked) {
      this.createBatchFormArray.push(new FormControl({id: productId}));
    } else {
      const idx = this.createBatchFormArray.controls.findIndex(fc => fc.value.id ===  productId);
      this.createBatchFormArray.removeAt(idx);
    }
  }

  onPutBatchInProduction() {
    this.batchService$.createBatch(this.createBatchForm.value).subscribe({
      next: response => {
        this.load(this.page);
        this.createBatchForm = new FormGroup({
          products: new FormArray([])
        })
        },
      error: err => console.error(err)
    })
  }


  public pageChanged(event: any) {
    this.load(event);
  }
}
