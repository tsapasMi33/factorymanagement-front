import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../core/models/product.model";
import {ProductFamily} from "../../../../core/models/product-family.model";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {BatchService} from "../../services/batch.service";
import {Client} from "../../../../core/models/client.model";

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
  public products: Product[] = new Array(25);
  public clientsPresent!: Client[];
  public productFamiliesPresent!: ProductFamily[];

  public  collectionSize!: number;
  public page!: number;
  public pageSize!: number;
  public totalPages!: number;
  public maxSize=15;
  public rotate= true;

  filterForm!: FormGroup;
  createBatchForm!: FormGroup;

  loading = false

  constructor(private productService$: ProductService,
              private batchService$: BatchService,
              private fb: FormBuilder
              ) { }

  ngOnInit(): void {
    this.loadFilter();
    this.filterForm = this.generateFilterForm()
    this.createBatchForm = this.generateBatchForm();
    this.loadContent(1)
  }

  onFilter() {
    this.loadContent(1)
  }

  loadContent(page: number){
    this.loading = true;
    this.productService$.getProductsPage(page,{currentStep:"ENCODED",...this.filterForm.value}).subscribe({
      next: value => {
        this.products = value.content;
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
    });
  }

  loadFilter() {
    this.productService$.getActiveClients('ENCODED').subscribe({
      next: value => {
        this.clientsPresent = value
      }
    })
    this.productService$.getActiveFamilies('ENCODED').subscribe({
      next: value => this.productFamiliesPresent = value
    })
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
        this.loadContent(this.page);
        this.createBatchForm = new FormGroup({
          products: new FormArray([])
        })
        },
      error: err => console.error(err)
    })
  }


  public pageChanged(event: any) {
    this.loadContent(event);
  }

  generateFilterForm() {
    return this.fb.group({
      clientId:[null],
      productFamilyId:[null],
      productVariantCode:[null],
      orderDate:[null],
      deliveryDate:[null]
    });
  }

  private generateBatchForm() {
    return this.fb.group({
      products: this.fb.array([])
    })
  }
}
