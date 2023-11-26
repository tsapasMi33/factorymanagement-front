import { Component } from '@angular/core';
import {Material} from "../../../../core/enums/material.enum";
import {AbstractControl, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {OrderService} from "../../services/order.service";
import {ClientService} from "../../services/client.service";
import {Client} from "../../../../core/models/client.model";
import {ProductVariant} from "../../../../core/models/product-variant.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  protected readonly Material = Material;
  orderForm: FormGroup
  clients!: Client[];

  constructor(private orderService$: OrderService, private clientService$: ClientService, private fb: FormBuilder) {
    this.clientService$.getClients().subscribe({
      next: value => this.clients = value,
      error: err => console.error(err)
    })
    this.orderForm = this.generateOrderForm();
  }

  get clientGroup() {
    return this.orderForm.controls['client'] as FormGroup;
  }

  get productsArray() {
    return this.orderForm.controls['products'] as FormArray;
  }

  addProduct($event: ProductVariant) {
    let productIndex = this.productsArray.controls.findIndex(p => p.get('variant')?.value === $event)
    if (productIndex !== -1) {
      this.productsArray.at(productIndex).get('quantity')?.setValue(this.productsArray.at(productIndex).get('quantity')?.value + 1)
    } else {
      const orderLine = this.fb.group({
        comments: [null],
        quantity: [1],
        variant: [$event]
      })
      this.productsArray.push(orderLine);
    }
  }

  getControl(orderLine: AbstractControl<any>) {
    return orderLine as FormGroup;
  }

  createOrder() {
    this.orderService$.createOrder(this.orderForm.value).subscribe({
      next: value => console.log('ok'),
      error: err => console.error(err)
    })
  }

  private generateOrderForm() {
    return this.fb.group({
      plannedDeliveryDate: [null],
      deliveryPreference: [null],
      client: this.fb.group({
        id: [null]
      }),
      products: this.fb.array<FormGroup>([])
    })
  }
}
