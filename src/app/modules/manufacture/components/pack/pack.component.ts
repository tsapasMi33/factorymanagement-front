import { Component } from '@angular/core';
import {Product} from "../../../../core/models/product.model";
import {ProductFamily} from "../../../../core/models/product-family.model";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {PacketService} from "../../services/packet.service";

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.css']
})
export class PackComponent {
  public products!: Product[];
  public clientsPresent!: { id: number, name: string }[];
  public productFamiliesPresent!: ProductFamily[];

  public  collectionSize!: number;
  public page!: number;
  public pageSize!: number;
  public totalPages!: number;
  public maxSize=15;
  public rotate= true;

  filterForm: FormGroup;
  createPacketForm!: FormGroup;

  constructor(private productService$: ProductService, private packetService$: PacketService) {

    this.filterForm = new FormGroup({
      clientId: new FormControl(null),
      productFamilyId: new FormControl(null),
      productVariantCode: new FormControl(null),
      orderDate: new FormControl(null),
      deliveryDate: new FormControl(null)
    });


  }

  ngOnInit(): void {
    this.load(1)
  }

  onFilter() {
    this.load(1)
  }

  load(page: number){
    this.productService$.getProductsFor(page, 'PACKED').subscribe({
      next: value => {
        this.products = value.content;
        this.generatePacketForm();

        this.clientsPresent = [...new Map(this.products.map(value => [value.order.client.id, value.order.client])).values()];
        this.productFamiliesPresent = [...new Map(this.products.map(value => [value.variant.productFamily.id,value.variant.productFamily])).values()];

        this.collectionSize = value.totalElements;
        this.page = value.number + 1;
        this.pageSize = value.size;
        this.totalPages = value.totalPages;
      }
    });
  }

  get createPacketFormArray(): FormArray {
    return this.createPacketForm.get('products') as FormArray;
  }

  onCheckBoxChange(event: any, productId: number) {
    if (event.target.checked) {
      this.createPacketFormArray.push(new FormControl({id: productId}));
    } else {
      const idx = this.createPacketFormArray.controls.findIndex(fc => fc.value.id ===  productId);
      this.createPacketFormArray.removeAt(idx);
    }
  }

  onCreatePacket() {
    this.packetService$.createPacket(this.createPacketForm.value).subscribe({
      next: value => {
        this.load(1)
      },
      error: err => console.error(err)
    })
  }


  public pageChanged(event: any) {
    this.load(event);
  }

  generatePacketForm() {
    this.createPacketForm = new FormGroup({
      products: new FormArray(
        []
      )
    })
  }
}
