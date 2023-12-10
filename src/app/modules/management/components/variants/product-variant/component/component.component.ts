import {Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductComponent} from "../../../../../../core/models/product-component.model";
import {MaterialType} from "../../../../../../core/models/material-type.model";
import {ComponentService} from "../../../../services/component.service";
import {MaterialTypeService} from "../../../../services/material-type.service";
import {NgbAlert, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertType} from "../../../../../../core/enums/alertType.enum";
import {debounceTime, Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit, OnDestroy {
  components!: ProductComponent[];
  types!: MaterialType[];
  filteredComponents!: ProductComponent[];
  selectedComponent!: ProductComponent;
  form!: FormGroup;

  searchField = ""
  createMode = false;

  @Output() componentEmitter = new EventEmitter<ProductComponent>;
  @Output() errorEmitter = new EventEmitter<{message: string, type: AlertType}>

  private notifier = new Subject<boolean>();

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  alertType = 'danger'
  private _message$ = new Subject<string>();
  message = ''

  constructor(private componentService$: ComponentService,
              private materialTypeService$: MaterialTypeService,
              private fb: FormBuilder,
              private modalService: NgbModal) {
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
    this.load()
  }

  load() {
    this.componentService$.getComponents()
      .pipe(takeUntil(this.notifier))
      .subscribe({
      next: value => {
        this.components = value;
        this.filteredComponents = value;
      },
      error: () => this.errorEmitter.next({message: "An unexpected error occurred! Please Reload the page. If the problem persists, contact tech support.", type:"danger"})
    });
    this.materialTypeService$.getMaterialTypes()
      .pipe(takeUntil(this.notifier))
      .subscribe({
      next: value => {
        this.types = value;
      },
      error: () => this.errorEmitter.next({message: "An unexpected error occurred! Please Reload the page. If the problem persists, contact tech support.", type:"danger"})
    })
  }

  generateForm() {
    return this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      thickness: [null],
      length: [null],
      width: [null],
      type: this.fb.group({
        id:[null]
      }),
      price: [null],
      requiresCutting: [false, [Validators.required]],
      requiresBending: [false, [Validators.required]]
    })
  }


  private setForm() {
    this.form.get('id')?.setValue(this.selectedComponent.id);
    this.form.get('name')?.setValue(this.selectedComponent.name);
    this.form.get('thickness')?.setValue(this.selectedComponent.thickness);
    this.form.get('length')?.setValue(this.selectedComponent.length);
    this.form.get('width')?.setValue(this.selectedComponent.width);
    this.form.get('type')?.get('id')?.setValue(this.selectedComponent.type.id);
    this.form.get('price')?.setValue(this.selectedComponent.price);
    this.form.get('requiresCutting')?.setValue(this.selectedComponent.requiresCutting);
    this.form.get('requiresBending')?.setValue(this.selectedComponent.requiresBending);
  }

  open(content: TemplateRef<any>, create: boolean) {
    this.createMode = create;
    this.form = this.generateForm();
    if (!create){
      this.setForm()
    }
    this.modalService.open(content);
  }

  save(modal: any) {
    if (this.createMode) {
      this.componentService$.createComponent(this.form.value)
        .pipe(takeUntil(this.notifier))
        .subscribe({
        next: () => {
          modal.close();
          this.load()
        },
        error: err => this.showMessage(err.error.errors.message, "warning")
      })
    } else {
      this.componentService$.updateComponent(this.form.value.id, this.form.value)
        .pipe(takeUntil(this.notifier))
        .subscribe({
        next: () => {
          modal.close();
          this.load()
        },
        error: err => this.showMessage(err.error.errors.message, "warning")
      })
    }
  }

  addToProduct() {
    this.componentEmitter.next(this.selectedComponent);
  }

  chosenType() {
    let typeId = this.form.get('type')?.get('id')?.value
    let type = this.types.find(t => t.id === + typeId)
    if (!type?.hasWidth) {
      this.form.get('width')?.setValue(null)
      this.form.get('width')?.disable()
    } else {
      this.form.get('width')?.enable()
    }
    if (!type?.hasLength) {
      this.form.get('length')?.setValue(null)
      this.form.get('length')?.disable()
    } else {
      this.form.get('length')?.enable()
    }
    if (!type?.hasThickness) {
      this.form.get('thickness')?.setValue(null)
      this.form.get('thickness')?.disable()
    } else {
      this.form.get('thickness')?.enable()
    }
    if (type?.pricingMethod !== 'UNIT') {
      this.form.get('price')?.setValue(null)
      this.form.get('price')?.disable()
    } else {
      this.form.get('price')?.enable()
    }
  }

  search() {
    if (this.searchField.trim() === ''){
      this.filteredComponents = this.components
    } else {
      this.filteredComponents = this.components.filter(c => c.name.toLowerCase().includes(this.searchField.toLowerCase()))
    }
  }

  public showMessage(message: string, type: AlertType) {
    this.alertType = type;
    this._message$.next(message);
  }

}
