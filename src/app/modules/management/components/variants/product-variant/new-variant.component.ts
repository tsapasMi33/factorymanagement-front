import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {ProductVariantService} from "../../../services/product-variant.service";
import {ProductComponent} from "../../../../../core/models/product-component.model";
import {ProductFamily} from "../../../../../core/models/product-family.model";
import {Material} from "../../../../../core/enums/material.enum";

@Component({
  selector: 'app-new-variant',
  templateUrl: './new-variant.component.html',
  styleUrls: ['./new-variant.component.css']
})
export class NewVariantComponent implements OnInit {
  productVariantForm!: FormGroup;

  totalCost = 0;

  successMessage = new BehaviorSubject<string>('')

  constructor(private productVariantService$: ProductVariantService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productVariantForm = this.generateForm();
  }


  setFamily($event: ProductFamily) {
    (this.productVariantForm.get('productFamily') as FormControl).setValue($event)
  }

  generateForm() {
    return this.fb.group({
      material: [null, [Validators.required]],
      variantIdentifier: [null, [Validators.required, Validators.minLength(1)]],
      width: [null],
      length: [null],
      height: [null],
      price: [null, [Validators.min(0), Validators.required]],
      description: [null],
      productFamily: [null, [Validators.required]],
      components: this.fb.array([])
    })
  }

  get componentsFormArray() {
    return this.productVariantForm.get('components') as FormArray;
  }

  addComponent($event: ProductComponent) {
    let componentIndex = this.componentsFormArray.controls.findIndex(c => c.get('component')?.value === $event);
    if (componentIndex !== -1) {
      this.componentsFormArray.at(componentIndex).get('quantity')?.setValue(this.componentsFormArray.at(componentIndex).get('quantity')?.value + 1);
    } else {
      const componentLine = this.fb.group({
        component: [$event],
        quantity: [1]
      })
      this.componentsFormArray.push(componentLine)
    }
    this.calculateCost();
  }

  removeComponent(i: number) {
    this.componentsFormArray.removeAt(i);
    this.calculateCost();
  }

  create() {
    const mappedComponents = this.componentsFormArray.controls.map((c) => {
      const { id } = c.get('component')?.value
      const quantity = c.get('quantity')?.value;

      return Array.from({length: quantity}, () => ({id}));
    })

    const vForm = this.productVariantForm.value
    vForm.components = mappedComponents.flatMap( c => c);
    this.productVariantService$.createProductVariant(vForm).subscribe({
      next: () => {
        this.productVariantForm = this.generateForm();
        this.showSuccess('The new product Variant has been successfully encoded')
      }
    })
  }

  private showSuccess(message: string) {
    this.successMessage.next(message);
    setInterval(() => {
      this.successMessage.next('')
    },5000)
  }

  getFormArrayControl(componentLine: AbstractControl<any>) {
    return componentLine as FormGroup;
  }

  protected readonly Material = Material;

  calculateCost() {
    let x = this.componentsFormArray.controls.map(c => (c.get('component')?.value).price * c.get('quantity')?.value)
    let sum = 0;
    x.forEach(c => sum = sum + c)
    this.totalCost = sum;
  }

}
