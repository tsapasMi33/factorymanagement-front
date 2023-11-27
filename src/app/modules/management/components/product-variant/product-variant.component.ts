import { Component } from '@angular/core';
import {Material} from "../../../../core/enums/material.enum";
import {FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";
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

  constructor(private productVariantService$: ProductVariantService,
              private fb: FormBuilder) {
    this.productVariantForm = this.generateForm();
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

  generateForm() {
    return this.fb.group({
      material: this.fb.control(null, {validators: Validators.required,}),
      variantIdentifier: this.fb.control(null, {validators: [Validators.required, Validators.minLength(1)]}),
      width:[],
      length:[],
      height:[],
      price: this.fb.control(null, {validators: [Validators.min(0)]}),
      description:[],
      productFamily: this.fb.control(null, {validators: [Validators.required]}),
      components: this.fb.array([])
    })
  }
}
