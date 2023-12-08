import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../../../core/models/product.model";
import {ProductFamily} from "../../../../core/models/product-family.model";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {BatchService} from "../../services/batch.service";
import {Client} from "../../../../core/models/client.model";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {debounceTime, Subject, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AlertType} from "../../../../core/enums/alertType.enum";

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

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  alertType = 'danger'
  private _message$ = new Subject<string>();
  message = ''

  public loading = false

  constructor(private productService$: ProductService,
              private batchService$: BatchService,
              private fb: FormBuilder
              ) {
    this._message$
      .pipe(
        takeUntilDestroyed(),
        tap((message) => (this.message = message)),
        debounceTime(5000),
      )
      .subscribe(() => this.selfClosingAlert?.close());
  }

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
    this.productService$.getProductsPage(page,{currentStep:"ENCODED", ...this.filterForm.value}).subscribe({
      next: value => {
        this.products = value.content;
        this.collectionSize = value.totalElements;
        this.page = value.number + 1;
        this.pageSize = value.size;
        this.totalPages = value.totalPages;
        this.loading = false;
      },
      error: () => this.showMessage("An unexpected error occurred! Please Reload the page. If the problem persists, contact tech support.", "danger")

    });
  }

  loadFilter() {
    this.productService$.getActiveClients('ENCODED').subscribe({
      next: value => {
        this.clientsPresent = value;
      }
    });
    this.productService$.getActiveFamilies('ENCODED').subscribe({
      next: value => this.productFamiliesPresent = value
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
      next: () => {
        this.loadContent(this.page);
        this.createBatchForm = this.generateBatchForm()
        this.showMessage('Batch was put in Production!', "success")
        },
      error: err => this.showMessage(err.error.errors.message, "warning")

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

  private showMessage(message: string, type: AlertType) {
    this.alertType = type;
    this._message$.next(message);
  }
}
