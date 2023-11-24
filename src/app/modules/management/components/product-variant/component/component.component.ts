import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ComponentService} from "../../../services/component.service";
import {ProductComponent} from "../../../../../core/models/product-component.model";
import {MaterialType} from "../../../../../core/enums/material-type.enum";
import {Material} from "../../../../../core/enums/material.enum";

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit{
  components!: ProductComponent[];
  filteredComponents!: ProductComponent[];
  selectedComponent!: ProductComponent;
  componentForm!: FormGroup;
  @Output() componentEmitter = new EventEmitter<ProductComponent>;

  constructor(private componentService$: ComponentService) {
    this.generateForm(null)
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
    })
  }

  selectComponent(component: ProductComponent) {
    this.selectedComponent = component;
    this.generateForm(component);
  }

  protected readonly MaterialType = MaterialType;
  protected readonly Material = Material;

  applyFilter() {
    if (this.componentForm.get("name")?.value != null && this.componentForm.get("name")?.value != "") {
      this.filteredComponents = this.components
        .filter(c => c.name.toLowerCase().includes(this.componentForm.get("name")?.value))
    }
    if (this.componentForm.get("materialType")?.value != null && this.componentForm.get("materialType")?.value != "") {
      this.filteredComponents = this.components
        .filter(c => c.type === this.componentForm.get("materialType")?.value)
    }
    if (this.componentForm.get("material")?.value != null && this.componentForm.get("material")?.value != "") {
      this.filteredComponents = this.components
        .filter(c => c.material === this.componentForm.get("material")?.value)
    }
    if (this.componentForm.get("thickness")?.value != null) {
      this.filteredComponents = this.components
        .filter(c => c.thickness === this.componentForm.get("thickness")?.value)
    }
    if (this.componentForm.get("length")?.value != null) {
      this.filteredComponents = this.components
        .filter(c => c.length === this.componentForm.get("length")?.value)
    }
    if (this.componentForm.get("width")?.value != null && this.componentForm.get("materialType")?.value != "") {
      this.filteredComponents = this.components
        .filter(c => c.width === this.componentForm.get("width")?.value)
    }
  }

  generateForm(component: ProductComponent | null) {
    if (component === null) {
      this.componentForm = new FormGroup({
        name: new FormControl(),
        type: new FormControl(),
        material: new FormControl(),
        thickness: new FormControl(),
        length: new FormControl(),
        width: new FormControl(),
        price: new FormControl()
      })
    } else {
      this.componentForm = new FormGroup({
        name: new FormControl(component.name),
        type: new FormControl(component.type),
        material: new FormControl(component.material),
        thickness: new FormControl(component.thickness),
        length: new FormControl(component.length),
        width: new FormControl(component.width),
        price: new FormControl(component.price)
      })
    }
    }

  reset() {
    this.filteredComponents = this.components
    this.generateForm(null)
  }

  create() {
    console.log(this.componentForm.value)
    this.componentService$.createComponent(this.componentForm.value).subscribe({
      next: value => this.load(),
      error: err => console.error(err)

    })
  }

  update() {
    this.componentService$.updateComponent(this.selectedComponent.id, this.componentForm.value).subscribe({
      next: value => this.load(),
      error: err => console.error(err)
    })
  }

  addToProduct() {
    this.componentEmitter.next(this.selectedComponent);
  }
}
