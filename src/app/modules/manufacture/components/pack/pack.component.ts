import {Component, OnInit, TemplateRef} from '@angular/core';
import {Product} from "../../../../core/models/product.model";
import {ProductFamily} from "../../../../core/models/product-family.model";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {PacketService} from "../../services/packet.service";
import {Client} from "../../../../core/models/client.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.css']
})
export class PackComponent implements OnInit{
  public products: Product[] = new Array(25);
  public clientsPresent!: Client[];
  public productFamiliesPresent!: ProductFamily[];

  public  collectionSize!: number;
  public page!: number;
  public pageSize!: number;
  public totalPages!: number;
  public maxSize=15;
  public rotate= true;

  filterForm!: FormGroup;
  createPacketForm!: FormGroup;

  public loading = false;

  modalInput = '';

  constructor(private productService$: ProductService,
              private packetService$: PacketService,
              private fb: FormBuilder,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadFilter();
    this.filterForm = this.generateFilterForm()
    this.createPacketForm = this.generatePacketForm()
    this.loadContent(1)
  }

  onFilter() {
    this.loadContent(1)
  }

  loadContent(page: number){
    this.loading = true;
    this.productService$.getProductsPage(page, {nextStep:'PACKED', ...this.filterForm.value}).subscribe({
      next: value => {
        this.products = value.content;
        this.collectionSize = value.totalElements;
        this.page = value.number + 1;
        this.pageSize = value.size;
        this.totalPages = value.totalPages;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        console.error(err)
      }
    });
  }

  loadFilter() {
    this.productService$.getActiveClients(undefined, 'PACKED').subscribe({
      next: value => {
        this.clientsPresent = value;
      }
    });
    this.productService$.getActiveFamilies(undefined, 'PACKED').subscribe({
      next: value => this.productFamiliesPresent = value
    });
  }

  onCheckBoxChange(event: any, productId: number) {
    if (event.target.checked) {
      this.createPacketFormArray.push(new FormControl({id: productId}));
    } else {
      const idx = this.createPacketFormArray.controls.findIndex(fc => fc.value.id ===  productId);
      this.createPacketFormArray.removeAt(idx);
    }
  }

  onCreatePacket(modal?: any) {
    this.packetService$.createPacket(this.createPacketForm.value).subscribe({
      next: value => {
        this.loadContent(1);
        this.createPacketForm = this.generatePacketForm();
      },
      error: err => console.error(err)
    })
    if (modal) {
      modal.close();
    }
  }

  public pageChanged(event: any) {
    this.loadContent(event);
  }

  generateFilterForm() {
    return this.fb.group({
      clientId:[null],
      productFamilyId:[null],
      productVariantCode:[null],
      orderDate:[null],
      deliveryDate:[null]
    });
  }


  get createPacketFormArray(): FormArray {
    return this.createPacketForm.get('products') as FormArray;
  }

  generatePacketForm() {
    return this.fb.group({
      products: this.fb.array([])
    })
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content);
  }


  checkInput() {
    const regex  = /^[0-9]{10}[/][0-9]+[.][0-9]{2}$/;

    if (regex.test(this.modalInput)) {
      this.addToPacket();
      this.modalInput = "";
    }
  }


  private addToPacket() {
    this.products.forEach(p => {
      if (p.order.code + '/' + p.code === this.modalInput &&
        this.createPacketFormArray.controls.findIndex(cp => cp.value.id === p.id) === -1
      ) {
        this.createPacketFormArray.push(new FormControl({id: p.id, code: p.order.code+'/'+p.code}))
        return;
      }
    });
  }
}
