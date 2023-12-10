import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductVariantService} from "../../../services/product-variant.service";
import {ProductComponent} from "../../../../../core/models/product-component.model";
import {ProductFamily} from "../../../../../core/models/product-family.model";
import {Material} from "../../../../../core/enums/material.enum";
import {AlertType} from "../../../../../core/enums/alertType.enum";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {debounceTime, Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-new-variant',
  templateUrl: './new-variant.component.html',
  styleUrls: ['./new-variant.component.css']
})
export class NewVariantComponent implements OnInit, OnDestroy {
  productVariantForm!: FormGroup;

  totalCost = 0;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  alertType = 'danger'
  private _message$ = new Subject<string>();
  message = ''

  private notifier = new Subject<boolean>();

  constructor(private productVariantService$: ProductVariantService,
              private fb: FormBuilder) {
    this._message$
      .pipe(
        takeUntil(this.notifier),
        tap((message) => (this.message = message)),
        debounceTime(5000),
      )
      .subscribe(() => this.selfClosingAlert?.close());
  }

  ngOnDestroy(): void {
    this.notifier.next(true)
    this.notifier.complete()
  }

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
    this.totalCost = 0;
    const mappedComponents = this.componentsFormArray.controls.map((c) => {
      const { id } = c.get('component')?.value
      const quantity = c.get('quantity')?.value;

      return Array.from({length: quantity}, () => ({id}));
    })

    const vForm = this.productVariantForm.value
    vForm.components = mappedComponents.flatMap( c => c);
    this.productVariantService$.createProductVariant(vForm)
      .pipe(takeUntil(this.notifier))
      .subscribe({
      next: () => {
        this.productVariantForm = this.generateForm();
        this.showMessage('The new product Variant has been successfully encoded', "success")
      },
      error: err => this.showMessage(err.error.errors.message, "warning")
    })
  }

  getFormArrayControl(componentLine: AbstractControl) {
    return componentLine as FormGroup;
  }

  protected readonly Material = Material;

  calculateCost() {
    let x = this.componentsFormArray.controls.map(c => (c.get('component')?.value).price * c.get('quantity')?.value)
    let sum = 0;
    x.forEach(c => sum = sum + c)
    this.totalCost = sum;
  }


  public showMessage(message: string, type: AlertType) {
    this.alertType = type;
    this._message$.next(message);
  }

}
