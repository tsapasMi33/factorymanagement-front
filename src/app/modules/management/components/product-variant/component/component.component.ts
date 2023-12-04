import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ComponentService} from "../../../services/component.service";
import {ProductComponent} from "../../../../../core/models/product-component.model";
import {Material} from "../../../../../core/enums/material.enum";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MaterialType} from "../../../../../core/models/material-type.model";
import {MaterialTypeService} from "../../../services/material-type.service";

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit {
  protected readonly Material = Material;
  components!: ProductComponent[];
  types!: MaterialType[];
  filteredComponents!: ProductComponent[];
  selectedComponent!: ProductComponent;
  createForm!: FormGroup;

  searchField = ""

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

  create(modal: any) {
    this.componentService$.createComponent(this.createForm.value).subscribe({
      next: () => {
        modal.close();
        this.load()
      },
      error: err => console.error(err)
    })
  }

  addToProduct() {
    this.componentEmitter.next(this.selectedComponent);
  }

  open(content: TemplateRef<any>) {
    this.createForm = this.generateForm();
    this.modalService.open(content);
  }

  chosenType() {
    let typeId = this.createForm.get('type')?.get('id')?.value
    let type = this.types.find(t => t.id === + typeId)
    if (!type?.hasWidth) {
      this.createForm.get('width')?.setValue(null)
      this.createForm.get('width')?.disable()
    } else {
      this.createForm.get('width')?.enable()
    }
    if (!type?.hasLength) {
      this.createForm.get('length')?.setValue(null)
      this.createForm.get('length')?.disable()
    } else {
      this.createForm.get('length')?.enable()
    }
    if (!type?.hasThickness) {
      this.createForm.get('thickness')?.setValue(null)
      this.createForm.get('thickness')?.disable()
    } else {
      this.createForm.get('thickness')?.enable()
    }
    if (type?.pricingMethod !== 'UNIT') {
      this.createForm.get('price')?.setValue(null)
      this.createForm.get('price')?.disable()
    } else {
      this.createForm.get('price')?.enable()
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
