import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../../../core/models/product.model";
import {AuthService} from "../../../../services/auth.service";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {debounceTime, Subject, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AlertType} from "../../../../core/enums/alertType.enum";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {
  public products: Product[] = new Array(15);

  public  collectionSize!: number;
  public page!: number;
  public pageSize!: number;
  public totalPages!: number;
  public maxSize=15;
  public rotate= true;

  scanInput = '';

  public loading = false;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  alertType = 'danger'
  private _message$ = new Subject<string>();
  message = ''

  constructor(private productService$: ProductService,
              private authService$: AuthService) {
    this._message$
      .pipe(
        takeUntilDestroyed(),
        tap((message) => (this.message = message)),
        debounceTime(5000),
      )
      .subscribe(() => this.selfClosingAlert?.close());
  }

  ngOnInit(): void {
        this.loadContent(1);
    }

  loadContent(page: number) {
    this.loading = true;
    this.productService$.getProductsFor(page, "FINISHED").subscribe({
      next: value => {
        this.products = value.content;
        this.collectionSize = value.totalElements;
        this.page = value.number + 1;
        this.pageSize = value.size;
        this.totalPages = value.totalPages;
        this.loading = false
      },
      error: () => this.showMessage("An unexpected error occurred! Please Reload the page. If the problem persists, contact tech support.", "danger")
    })
  }

  onStartJob(id: number, index: number) {
    this.productService$.doJob("FINISHED", id, 'start').subscribe({
      next: value => this.products[index] = value,
      error: err => this.showMessage(err.error.errors.message, "warning")
    });
  }

  onPauseJob(id: number, index: number) {
    this.productService$.doJob("FINISHED", id, 'pause').subscribe({
      next: value => this.products[index] = value,
      error: err => this.showMessage(err.error.errors.message, "warning")
    });
  }

  onFinishJob(id: number, index: number) {
    this.productService$.doJob("FINISHED", id, 'finish').subscribe({
      next: () => this.products.splice(index, 1),
      error: err => this.showMessage(err.error.errors.message, "warning")
    });
  }

  public pageChanged(event: any) {
    this.loadContent(event);
  }

  isProductOngoing(product: Product) {
    let status: boolean | undefined = product.steps.filter(s => s.step === 'FINISHED')[0]?.paused;
    return status === false
  }

  isProductPaused(product: Product) {
    let status: boolean | undefined = product.steps.filter(s => s.step === 'FINISHED')[0]?.paused;
    return status === true
  }

  getCurrentUser(product: Product) {
    return product.steps.filter(s => s.step === 'FINISHED')[0]?.createdBy.username
  }

  checkInput() {
    const regex  = /[0-9]{10}\/[0-9]+[.][0-9]{2}/;
    if (regex.test(this.scanInput)) {
      this.doJob()
      this.scanInput = '';
    }
  }

  doJob() {
    let code = this.scanInput.split('/')
    this.productService$.getProductByCode(code[0],code[1]).subscribe({
      next: value => {
        if (!this.isProductOngoing(value)) {
          this.products.filter(p => p.id !== value.id);
          this.products.splice(0,0,value);
          this.onStartJob(value.id, 0);
        } else {
          this.onFinishJob(value.id, 0);
        }
      },
      error: err => this.showMessage(err.error.errors.message, "warning")
    })
  }


  disableButton(product: Product, action: string) {
    if (action === 'start') {
      return this.isProductOngoing(product) ||
        (this.isProductPaused(product) && this.getCurrentUser(product) !== this.authService$.connectedUser?.username);

    } else if (action === 'pause') {
      return this.isProductPaused(product) ||
        !this.isProductOngoing(product) ||
        (this.isProductOngoing(product) && this.getCurrentUser(product) !== this.authService$.connectedUser?.username);

    } else {
      return !this.isProductOngoing(product) ||
        this.isProductPaused(product) ||
        (this.isProductOngoing(product) && this.getCurrentUser(product) !== this.authService$.connectedUser?.username);

    }
  }

  private showMessage(message: string, type: AlertType) {
    this.alertType = type;
    this._message$.next(message);
  }
}
