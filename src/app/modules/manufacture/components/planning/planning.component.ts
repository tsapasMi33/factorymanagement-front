import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../../../core/models/product.model";
import {ProductFamily} from "../../../../core/models/product-family.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Client} from "../../../../core/models/client.model";
import {Batch} from "../../../../core/models/batch.model";
import {Packet} from "../../../../core/models/packet.model";
import {AuthService} from "../../../../services/auth.service";
import {debounceTime, Subject, tap} from "rxjs";
import {AlertType} from "../../../../core/enums/alertType.enum";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-planning',
    templateUrl: './planning.component.html',
    styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  public products: Product[] = new Array(25);
  public clientsPresent!: Client[];
  public productFamiliesPresent!: ProductFamily[];
  public batchesPresent!: Batch[];
  public packetsPresent!: Packet[];

  public  collectionSize!: number;
  public page!: number;
  public pageSize!: number;
  public totalPages!: number;
  public maxSize= 15;
  public rotate= true;

  filterForm: FormGroup;
  loading = false;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  alertType = 'danger'
  private _message$ = new Subject<string>();
  message = ''

  constructor(private productService$: ProductService,
              private authService$: AuthService,
              private fb: FormBuilder) {
    this.filterForm = this.generateFilterForm();

    this._message$
      .pipe(
        takeUntilDestroyed(),
        tap((message) => (this.message = message)),
        debounceTime(5000),
      )
      .subscribe(() => this.selfClosingAlert?.close());
  }

  ngOnInit(): void {
    this.loadFilter()
    this.page = 1
    this.loadContent(this.page)
  }

  onFilter() {
    this.loadContent(1);
  }

  loadContent(page: number){
    this.loading = true;
    this.productService$.getProductsPage(page,{...this.filterForm.value}).subscribe({
      next: value => {
        this.products = value.content;
        this.collectionSize = value.totalElements;
        this.maxSize = 10;
        this.page = value.number + 1;
        this.pageSize = value.size;
        this.totalPages = value.totalPages;
        this.loading = false;
      },
      error: () => {
        this.showMessage("An unexpected error occurred! Please Reload the page. If the problem persists, contact tech support.", "danger")
      }
    });

  }

  loadFilter() {
    this.productService$.getActiveClients().subscribe({
      next: value => {
        this.clientsPresent = value
      }
    })
    this.productService$.getActiveBatches().subscribe({
      next: value => this.batchesPresent = value
    })
    this.productService$.getActiveFamilies().subscribe({
      next: value => this.productFamiliesPresent = value
    })
    this.productService$.getActivePackets().subscribe({
      next: value => this.packetsPresent = value
    })
  }


  public pageChanged(event: any) {
    this.loadContent(event);
  }

  archiveAll() {
    this.productService$.archiveAll().subscribe({
      next: () => this.loadContent(1)
    })
  }

  generateFilterForm() {
    return this.fb.group({
      currentStep: [null],
      clientId: [null],
      productFamilyId: [null],
      productVariantCode: [null],
      batchId: [null],
      packetId: [null],
      orderDate: [null],
      deliveryDate: [null]
    })
  }

  get connectedUserRole() {
    return this.authService$.connectedUser?.role
  }

  private showMessage(message: string, type: AlertType) {
    this.alertType = type;
    this._message$.next(message);
  }
}
