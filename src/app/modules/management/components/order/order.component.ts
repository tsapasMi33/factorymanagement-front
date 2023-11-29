import {Component, OnInit} from '@angular/core';
import {Material} from "../../../../core/enums/material.enum";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../services/order.service";
import {ClientService} from "../../services/client.service";
import {Client} from "../../../../core/models/client.model";
import {ProductVariant} from "../../../../core/models/product-variant.model";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  protected readonly Material = Material;
  orderForm!: FormGroup
  clients!: Client[];

  successMessage = new BehaviorSubject<string>('')

  constructor(private orderService$: OrderService,
              private clientService$: ClientService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.clientService$.getClients().subscribe({
      next: value => this.clients = value,
      error: err => console.error(err)
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

  getControl(orderLine: AbstractControl<any>) {
    return orderLine as FormGroup;
  }

  createOrder() {
    this.orderService$.createOrder(this.orderForm.value).subscribe({
      next: () => {
        this.showSuccess('The order has been encoded successfully!');
        this.orderForm = this.generateOrderForm();
      },
      error: err => console.error(err)
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

  private showSuccess(message: string) {
    this.successMessage.next(message);
    setInterval(() => {
      this.successMessage.next('')
    },5000)
  }
}
