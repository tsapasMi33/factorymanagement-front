import {Component, OnInit, ViewChild} from '@angular/core';
import {Material} from "../../../../core/enums/material.enum";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../services/order.service";
import {ClientService} from "../../services/client.service";
import {Client} from "../../../../core/models/client.model";
import {ProductVariant} from "../../../../core/models/product-variant.model";
import {debounceTime, Subject, tap} from "rxjs";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AlertType} from "../../../../core/enums/alertType.enum";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  protected readonly Material = Material;
  orderForm!: FormGroup
  clients!: Client[];

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  alertType = 'danger'
  private _message$ = new Subject<string>();
  message = ''

  constructor(private orderService$: OrderService,
              private clientService$: ClientService,
              private fb: FormBuilder) {
    this._message$
      .pipe(
        takeUntilDestroyed(),
        tap((message) => (this.message = message)),
        debounceTime(5000),
      )
      .subscribe(() => this.selfClosingAlert?.close());
  }

  ngOnInit(): void {
    this.clientService$.getClients().subscribe({
      next: value => this.clients = value,
      error: () => this.showMessage("An unexpected error occurred! Please Reload the page. If the problem persists, contact tech support.", "danger")
    })
    this.orderForm = this.generateOrderForm();
  }

  get clientFormGroup() {
    return this.orderForm.controls['client'] as FormGroup;
  }

  get productsFormArray() {
    return this.orderForm.controls['products'] as FormArray;
  }

  addProduct($event: ProductVariant) {
    let productIndex = this.productsFormArray.controls.findIndex(p => p.get('variant')?.value === $event)
    if (productIndex !== -1) {
      this.productsFormArray.at(productIndex).get('quantity')?.setValue(this.productsFormArray.at(productIndex).get('quantity')?.value + 1)
    } else {
      const orderLine = this.fb.group({
        comments: [null],
        quantity: [1],
        variant: [$event]
      })
      this.productsFormArray.push(orderLine);
    }
  }

  getFormArrayControl(orderLine: AbstractControl) {
    return orderLine as FormGroup;
  }

  createOrder() {
    this.orderService$.createOrder(this.orderForm.value).subscribe({
      next: () => {
        this.showMessage('The order has been encoded successfully!', "success");
        this.orderForm = this.generateOrderForm();
      },
      error: err => this.showMessage(err.error.errors.message, "warning")
    })
  }

  private generateOrderForm() {
    return this.fb.group({
      plannedDeliveryDate: [null, [Validators.required]],
      deliveryPreference: [null, [Validators.required]],
      client: this.fb.group({
        id: [null,[Validators.required]]
      }),
      products: this.fb.array<FormGroup>([],[Validators.required])
    })
  }

  public showMessage(message: string, type: AlertType) {
    this.alertType = type;
    this._message$.next(message);
  }
}
