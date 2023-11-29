import {Component, OnInit} from '@angular/core';
import {Material} from "../../../../core/enums/material.enum";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductVariantService} from "../../services/product-variant.service";
import {ProductFamily} from "../../../../core/models/product-family.model";
import {ProductComponent} from "../../../../core/models/product-component.model";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-product-variant',
  templateUrl: './product-variant.component.html',
  styleUrls: ['./product-variant.component.css']
})
export class ProductVariantComponent implements OnInit {
  protected readonly Material = Material;
  productVariantForm!: FormGroup;

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

  get componentsArray() {
    return this.productVariantForm.get('components') as FormArray;
  }

  addComponent($event: ProductComponent) {
    this.componentsArray.push(new FormControl($event));
  }

  create() {
    this.productVariantService$.createProductVariant(this.productVariantForm.value).subscribe({
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
}
