import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Material} from "../../../../../core/enums/material.enum";
import {ProductVariant} from "../../../../../core/models/product-variant.model";
import {ProductVariantService} from "../../../services/product-variant.service";
import {ProductFamily} from "../../../../../core/models/product-family.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AlertType} from "../../../../../core/enums/alertType.enum";

@Component({
  selector: 'app-product-variant-list',
  templateUrl: './product-variant-list.component.html',
  styleUrls: ['./product-variant-list.component.css']
})
export class ProductVariantListComponent implements OnInit {
  protected readonly Material = Material;
  productVariants!: ProductVariant[];
  filteredProductVariants!: ProductVariant[];
  productFamilies!: ProductFamily[];
  filterForm!: FormGroup;
  selectedProductVariant!: ProductVariant
  @Output() variantSelectedEmitter = new EventEmitter<ProductVariant>;
  @Output() errorEmitter = new EventEmitter<{message: string, type: AlertType}>

  constructor(private productVariantService$: ProductVariantService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.generateFilterForm();
    this.load();
  }

  load() {
    this.productVariantService$.getProductVariants().subscribe({
      next: value => {
        this.productVariants = value
        this.filteredProductVariants = value
        this.productFamilies = [...new Map(value.map(value => [value.productFamily.id, value.productFamily])).values()]
      },
      error: err => this.errorEmitter.next({message:err.error.errors.message, type:"warning"})
    })
  }

  generateFilterForm() {
    return this.fb.group({
      code: [null],
      productFamily: [null],
      material: [null],
      length: [null],
      width: [null],
      height: [null]
    })
  }

  applyFilter() {
    this.filteredProductVariants = this.productVariants.filter(c => {
      return (
        (!this.filterForm.get("code")?.value || c.code.toLowerCase().includes(this.filterForm.get("code")?.value.toLowerCase())) &&
        (!this.filterForm.get("productFamily")?.value || c.productFamily === this.filterForm.get("productFamily")?.value) &&
        (!this.filterForm.get("material")?.value || c.material === this.filterForm.get("material")?.value) &&
        (!this.filterForm.get("length")?.value || c.length === this.filterForm.get("length")?.value) &&
        (!this.filterForm.get("width")?.value || c.width === this.filterForm.get("width")?.value) &&
        (!this.filterForm.get("height")?.value || c.height === this.filterForm.get("height")?.value)
      );
    });
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
