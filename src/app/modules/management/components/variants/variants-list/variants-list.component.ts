import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProductVariant} from "../../../../../core/models/product-variant.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductVariantService} from "../../../services/product-variant.service";
import {ProductFamily} from "../../../../../core/models/product-family.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-variants-list',
  templateUrl: './variants-list.component.html',
  styleUrls: ['./variants-list.component.css']
})
export class VariantsListComponent implements OnInit{
  filteredVariants: ProductVariant[] = new Array(25)
  variants!: ProductVariant[]
  familiesPresent!: ProductFamily[];
  selectedVariant!: ProductVariant;

  updatePriceForm!: FormGroup;

  filterForm: FormGroup;
  loading = true;

  constructor(private productVariantService$: ProductVariantService,
              private fb: FormBuilder,
              private modalService: NgbModal) {
    this.filterForm = this.generateFilterForm()
  }

  ngOnInit(): void {
    this.loadContent()
  }

  loadContent() {
    this.productVariantService$.getProductVariants().subscribe({
      next: value => {
        this.loading = true
        this.variants = value;
        this.filteredVariants = value
        this.familiesPresent = value.map(v => v.productFamily);
        const idMap = new Map<number,ProductFamily>;
        this.familiesPresent.forEach(f => idMap.set(f.id, f))
        this.familiesPresent = Array.from(idMap.values())
        this.loading = false;
      },
      error: err => console.error(err)
    })
  }


  generateFilterForm() {
    return this.fb.group({
      family:[null],
      code:[null],
      material:[null],
      length:[null],
      width:[null],
      height:[null]
    })
  }

  onFilter() {
    this.filteredVariants = this.variants.filter(v => {
      return (
        (!this.filterForm.get("code")?.value || v.code.toLowerCase().includes(this.filterForm.get("code")?.value.toLowerCase())) &&
        (!this.filterForm.get("family")?.value || v.productFamily.id === +this.filterForm.get("family")?.value) &&
        (!this.filterForm.get("material")?.value || v.material === this.filterForm.get("material")?.value) &&
        (!this.filterForm.get("height")?.value || v.height === this.filterForm.get("height")?.value) &&
        (!this.filterForm.get("length")?.value || v.length === this.filterForm.get("length")?.value) &&
        (!this.filterForm.get("width")?.value || v.width === this.filterForm.get("width")?.value)
      );
    });
  }

  reset() {
    this.filteredVariants = this.variants
  }

  open(content: TemplateRef<any>, variant: ProductVariant) {
    this.selectedVariant = variant;
    this.updatePriceForm = this.fb.group({
      price: [variant.price]
    })
    this.modalService.open(content)
  }

  update(modal: any) {
    this.selectedVariant.price = this.updatePriceForm.get('price')?.value;
    this.productVariantService$.updateVariant(this.selectedVariant).subscribe({
      next: () => {
        modal.close()
        this.loadContent()
      }
    })
  }
}
