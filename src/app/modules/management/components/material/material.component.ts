import {Component, OnInit, TemplateRef} from '@angular/core';

import {MaterialTypeService} from "../../services/material-type.service";
import {MaterialType} from "../../../../core/models/material-type.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  types!: MaterialType[]
  form!: FormGroup;

  constructor(private materialTypeService$: MaterialTypeService,
              private fb: FormBuilder,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.form = this.generateForm();
    this.materialTypeService$.getMaterialTypes().subscribe({
      next: value => this.types = value
    })
  }

  generateForm() {
    return this.fb.group({
      id:[null],
      name: [null, [Validators.required]],
      material: [null, [Validators.required]],
      pricingMethod: [null, [Validators.required]],
      basePrice: [null],
      hasThickness: [null, [Validators.required]],
      hasLength: [null, [Validators.required]],
      hasWidth: [null, [Validators.required]]
    })
  }

  setForm(type: MaterialType) {
    this.form.get('id')?.setValue(type.id);
    this.form.get('name')?.setValue(type.name);
    this.form.get('material')?.setValue(type.material);
    this.form.get('pricingMethod')?.setValue(type.pricingMethod);
    this.form.get('basePrice')?.setValue(type.basePrice);
    this.form.get('hasThickness')?.setValue(type.hasThickness);
    this.form.get('hasLength')?.setValue(type.hasLength);
    this.form.get('hasWidth')?.setValue(type.hasWidth);
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  save(modal: any) {
    if (this.form.get('id')?.value === null) {
      this.materialTypeService$.create(this.form.value).subscribe({
        next: () => {
          this.load();
          modal.close();
          this.form.reset();
        }
      })
    } else {
      this.materialTypeService$.update(this.form.value).subscribe({
        next: () => {
          this.load();
          modal.close();
          this.form.reset();
        }
      })
    }
  }

  getType(type: MaterialType, modal: TemplateRef<any>) {
    this.form = this.generateForm();
    this.setForm(type);
    this.open(modal);
  }

}
