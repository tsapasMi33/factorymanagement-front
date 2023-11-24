import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Material} from "../../../../../core/enums/material.enum";
import {ProductVariant} from "../../../../../core/models/product-variant.model";
import {ProductVariantService} from "../../../services/product-variant.service";
import {ProductFamily} from "../../../../../core/models/product-family.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-product-variant-list',
  templateUrl: './product-variant-list.component.html',
  styleUrls: ['./product-variant-list.component.css']
})
export class ProductVariantListComponent implements OnInit {
  productVariants!: ProductVariant[];
  filteredProductVariants!: ProductVariant[];
  productFamilies!: ProductFamily[];
  filterForm: FormGroup;
  selectedProductVariant!: ProductVariant
  @Output() variantSelectedEmitter = new EventEmitter<ProductVariant>;

  protected readonly Material = Material;

  constructor(private productVariantService$: ProductVariantService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      code: [null],
      productFamily: [null],
      material: [null],
      length: [null],
      width: [null],
      height: [null]
    })
  }

  load() {
    this.productVariantService$.getProductVariants().subscribe({
      next: value => {
        this.productVariants = value
        this.filteredProductVariants = value
        this.productFamilies = value.map(value => value.productFamily)
      },
      error: err => console.error(err)
    })
  }

  ngOnInit(): void {
    this.load();
  }

  applyFilter() {
    const fValue = this.filterForm.value;
    if (fValue.code != null) {
      this.filteredProductVariants = this.productVariants.filter(value => value.code.toLowerCase().includes(fValue.code.toLowerCase()))
    }
    if (fValue.family != null) {
      this.filteredProductVariants = this.productVariants.filter(value => value.productFamily === fValue.productFamily)
    }
    if (fValue.material != null) {
      this.filteredProductVariants = this.productVariants.filter(value => value.material === fValue.material)
    }
    if (fValue.length != null) {
      this.filteredProductVariants = this.productVariants.filter(value => value.length === fValue.length)
    }
    if (fValue.width != null) {
      this.filteredProductVariants = this.productVariants.filter(value => value.width === fValue.width)
    }
    if (fValue.height != null) {
      this.filteredProductVariants = this.productVariants.filter(value => value.height === fValue.height)
    }
  }

  resetFilter() {
    this.filteredProductVariants = this.productVariants;
  }

  selectVariant(variant: ProductVariant) {
    this.selectedProductVariant = variant;
  }

  addToOrder() {
    this.variantSelectedEmitter.next(this.selectedProductVariant);
  }
}
