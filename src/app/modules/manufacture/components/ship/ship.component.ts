import {Component, OnInit, TemplateRef} from '@angular/core';
import {PacketService} from "../../services/packet.service";
import {Packet} from "../../../../core/models/packet.model";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ShipmentService} from "../../services/shipment.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit{
  packets!: Packet[]
  presentClients!: string[]
  selectedClient = ''
  selectedClientPackets!: Packet[]

  shipmentForm!: FormGroup;

  modalInput = '';

  constructor(private packetService$: PacketService,
              private shipmentService$: ShipmentService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadContent();
    this.generateShipmentForm()
  }

  loadContent() {
    this.packetService$.getPackets('PACKED').subscribe({
      next: value => {
        this.packets = value;
        this.presentClients = [...new Map(value.map(value => [value.clientName, value.clientName])).values()]
      },
      error: err => console.error(err)
    })
    this.selectedClient = '';
    this.selectedClientPackets = [];
  }


  showPackets() {
    this.selectedClientPackets = this.packets.filter(p => p.clientName === this.selectedClient)
  }

  onCheckBoxChange(event: any, id: number) {
    if (event.target.checked) {
      this.shipmentFormArray.push(new FormControl({id: id}));
    } else {
      const idx = this.shipmentFormArray.controls.findIndex(fc => fc.value.id ===  id);
      this.shipmentFormArray.removeAt(idx);
    }
  }

  generateShipmentForm() {
    this.shipmentForm = new FormGroup({
      packets: new FormArray(
        []
      )
    })
  }

  get shipmentFormArray(): FormArray {
    return this.shipmentForm.get('packets') as FormArray;
  }

  shipPackets(modal?: any) {
    this.shipmentService$.shipPackets(this.shipmentForm.value).subscribe({
      next: value => this.ngOnInit(),
      error: err => console.error(err)
    })
    if (modal) {
      modal.close();
    }

  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  checkInput() {
    const regex  = /[0-9]{9}/;
    if (regex.test(this.modalInput)) {
      this.addToShipment();
      this.modalInput = "";
    }
  }

  private addToShipment() {
    this.packets.forEach(p => {
      if (p.code === this.modalInput &&
        this.shipmentFormArray.controls.findIndex(cp => cp.value.id === p.id) === -1
      ) {
        this.shipmentFormArray.push(new FormControl({id: p.id, code: p.code}))
        return;
      }
    });
  }
}
