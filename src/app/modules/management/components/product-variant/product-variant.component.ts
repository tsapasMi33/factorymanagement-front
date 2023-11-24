import { Component } from '@angular/core';
import {Material} from "../../../../core/enums/material.enum";
import {FormArray, FormControl, FormControlName, FormGroup} from "@angular/forms";
import {ProductVariantService} from "../../services/product-variant.service";
import {ProductFamily} from "../../../../core/models/product-family.model";
import {ProductComponent} from "../../../../core/models/product-component.model";

@Component({
  selector: 'app-product-variant',
  templateUrl: './product-variant.component.html',
  styleUrls: ['./product-variant.component.css']
})
export class ProductVariantComponent {

  productVariantForm: FormGroup;

  constructor(private productVariantService$: ProductVariantService) {
    this.productVariantForm = new FormGroup({
      material: new FormControl(),
      variantIdentifier: new FormControl(),
      width: new FormControl(),
      length: new FormControl(),
      height: new FormControl(),
      price: new FormControl(),
      description: new FormControl(),
      productFamily: new FormControl(),
      components: new FormArray([])
    })
  }

    protected readonly Material = Material;
  protected readonly FormControlName = FormControlName;

  setFamily($event: ProductFamily) {
    (this.productVariantForm.get('productFamily') as FormControl).setValue($event)

  }

  get componentsArray() {
    return this.productVariantForm.get('components') as FormArray;
  }

  addComponent($event: ProductComponent) {
    this.componentsArray.push(new FormControl($event));
  }

  create() {
    this.productVariantService$.createProductVariant(this.productVariantForm.value).subscribe({
      next: value => this.productVariantForm.reset()
    })
  }
}
