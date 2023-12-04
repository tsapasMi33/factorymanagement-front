import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ProductFamily} from "../../../../../../core/models/product-family.model";
import {ProductFamilyService} from "../../../../services/product-family.service";
import {Step} from "../../../../../../core/enums/step.enum";


@Component({
  selector: 'app-product-family',
  templateUrl: './product-family.component.html',
  styleUrls: ['./product-family.component.css']
})
export class ProductFamilyComponent implements OnInit {
  productFamilies!: ProductFamily[];
  selectedProductFamily!: ProductFamily;
  productFamilyForm!: FormGroup;
  @Output() productFamilyIdEmitter = new EventEmitter<ProductFamily>

  constructor(private productFamilyService$: ProductFamilyService, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.productFamilyService$.getProductFamilies().subscribe({
      next: value => {
        this.productFamilies = value
      },
      error: err => console.error(err)
    })
  }

  selectFamily(productFamily: ProductFamily) {
    this.selectedProductFamily = productFamily;
    this.productFamilyIdEmitter.next(this.selectedProductFamily)
  }

  open(content: TemplateRef<any>) {
    this.generateForm();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }


  addStep(step: Step) {
    this.formSteps.push(new FormControl(step))
  }


  saveProductFamily(modal: any) {
    this.productFamilyService$.saveProductFamily(this.productFamilyForm.value).subscribe({
      next: value => {
        this.load()
        modal.close()
      },
      error: err => console.error(err)
    })

    modal.close()
  }

  get formSteps() {
    return this.productFamilyForm.get('productionPath') as FormArray;
  }

  generateForm() {
    this.productFamilyForm = new FormGroup({
      name: new FormControl<string>(""),
      productionPath: new FormArray([])
    })
  }

}
