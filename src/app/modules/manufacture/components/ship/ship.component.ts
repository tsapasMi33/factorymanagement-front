import { Component } from '@angular/core';
import {PacketService} from "../../services/packet.service";
import {Packet} from "../../../../core/models/packet.model";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ShipmentService} from "../../services/shipment.service";
@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent {
  packets!: Packet[]
  presentClients!: string[]
  selectedClient = ''
  selectedClientPackets!: Packet[]
  shipmentForm!: FormGroup;

  constructor(private packetService$: PacketService, private shipmentService$: ShipmentService) {
    this.packetService$.getPackets('PACKED').subscribe({
      next: value => {
        this.packets = value;
        this.presentClients = [...new Map(value.map(value => [value.clientName, value.clientName])).values()]
      },
      error: err => console.error(err)
    })
    this.generateShipmentForm()
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

  shipPackets() {
    this.shipmentService$.shipPackets(this.shipmentForm.value).subscribe({
      next: value => console.log('ok'),
      error: err => console.error(err)
    })
  }
}
