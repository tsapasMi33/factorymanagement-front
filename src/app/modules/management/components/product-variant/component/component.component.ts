import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ComponentService} from "../../../services/component.service";
import {ProductComponent} from "../../../../../core/models/product-component.model";
import {MaterialType} from "../../../../../core/enums/material-type.enum";
import {Material} from "../../../../../core/enums/material.enum";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit {
  protected readonly MaterialType = MaterialType;
  protected readonly Material = Material;
  components!: ProductComponent[];
  filteredComponents!: ProductComponent[];
  selectedComponent!: ProductComponent;
  filterForm!: FormGroup;
  createForm!: FormGroup
  @Output() componentEmitter = new EventEmitter<ProductComponent>;

  constructor(private componentService$: ComponentService,
              private fb: FormBuilder,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.filterForm = this.generateForm()
    this.load()
  }

  load() {
    this.componentService$.getComponents().subscribe({
      next: value => {
        this.components = value;
        this.filteredComponents = value;
      },
      error: err => console.error(err)
    })
  }

  selectComponent(component: ProductComponent) {
    this.selectedComponent = component;
    this.setFilterForm();
  }

  applyFilter() {
    this.filteredComponents = this.components.filter(c => {
      return (
        (!this.filterForm.get("name")?.value || c.name.toLowerCase().includes(this.filterForm.get("name")?.value.toLowerCase())) &&
        (!this.filterForm.get("type")?.value || c.type === this.filterForm.get("type")?.value) &&
        (!this.filterForm.get("material")?.value || c.material === this.filterForm.get("material")?.value) &&
        (!this.filterForm.get("thickness")?.value || c.thickness === this.filterForm.get("thickness")?.value) &&
        (!this.filterForm.get("length")?.value || c.length === this.filterForm.get("length")?.value) &&
        (!this.filterForm.get("width")?.value || c.width === this.filterForm.get("width")?.value)
      );
    });
  }

  generateForm() {
    return this.fb.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      material: [null, [Validators.required]],
      thickness: [null],
      length: [null],
      width: [null],
      price: [null, [Validators.required]]
    })
  }

  setFilterForm() {
    this.filterForm.get('name')?.setValue(this.selectedComponent.name);
    this.filterForm.get('type')?.setValue(this.selectedComponent.type);
    this.filterForm.get('material')?.setValue(this.selectedComponent.material);
    this.filterForm.get('thickness')?.setValue(this.selectedComponent.thickness);
    this.filterForm.get('length')?.setValue(this.selectedComponent.length);
    this.filterForm.get('width')?.setValue(this.selectedComponent.width);
    this.filterForm.get('price')?.setValue(this.selectedComponent.price);
  }

  reset() {
    this.filteredComponents = this.components
    this.filterForm = this.generateForm();
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


}
