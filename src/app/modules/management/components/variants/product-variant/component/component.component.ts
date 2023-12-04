import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductComponent} from "../../../../../../core/models/product-component.model";
import {MaterialType} from "../../../../../../core/models/material-type.model";
import {ComponentService} from "../../../../services/component.service";
import {MaterialTypeService} from "../../../../services/material-type.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit {
  components!: ProductComponent[];
  types!: MaterialType[];
  filteredComponents!: ProductComponent[];
  selectedComponent!: ProductComponent;
  form!: FormGroup;

  searchField = ""
  createMode = false;

  @Output() componentEmitter = new EventEmitter<ProductComponent>;

  constructor(private componentService$: ComponentService,
              private materialTypeService$: MaterialTypeService,
              private fb: FormBuilder,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.load()
  }

  load() {
    this.componentService$.getComponents().subscribe({
      next: value => {
        this.components = value;
        this.filteredComponents = value;
      },
      error: err => console.error(err)
    });
    this.materialTypeService$.getMaterialTypes().subscribe({
      next: value => {
        this.types = value;
      }
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
      this.componentService$.createComponent(this.form.value).subscribe({
        next: () => {
          modal.close();
          this.load()
        },
        error: err => console.error(err)
      })
    } else {
      this.componentService$.updateComponent(this.form.value.id, this.form.value).subscribe({
        next: () => {
          modal.close();
          this.load()
        },
        error: err => console.error(err)
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

}
