import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgbAlert, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ProductFamily} from "../../../../../../core/models/product-family.model";
import {ProductFamilyService} from "../../../../services/product-family.service";
import {Step} from "../../../../../../core/enums/step.enum";
import {AlertType} from "../../../../../../core/enums/alertType.enum";
import {debounceTime, Subject, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


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
  @Output() errorEmitter = new EventEmitter<{message: string, type: AlertType}>

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  alertType = 'danger'
  private _message$ = new Subject<string>();
  message = ''

  constructor(private productFamilyService$: ProductFamilyService, private modalService: NgbModal) {
    this._message$
      .pipe(
        takeUntilDestroyed(),
        tap((message) => (this.message = message)),
        debounceTime(5000),
      )
      .subscribe(() => this.selfClosingAlert?.close());
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.productFamilyService$.getProductFamilies().subscribe({
      next: value => {
        this.productFamilies = value
      },
      error: () => this.errorEmitter.next({message: "An unexpected error occurred! Please Reload the page. If the problem persists, contact tech support.", type:"danger"})
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
      next: () => {
        this.load()
        modal.close()
      },
      error: err => this.showMessage(err.error.errors.message, "warning")
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

  public showMessage(message: string, type: AlertType) {
    this.alertType = type;
    this._message$.next(message);
  }
}
