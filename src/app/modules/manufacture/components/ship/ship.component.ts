import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PacketService} from "../../services/packet.service";
import {Packet} from "../../../../core/models/packet.model";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ShipmentService} from "../../services/shipment.service";
import {NgbAlert, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {debounceTime, Subject, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AlertType} from "../../../../core/enums/alertType.enum";
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

  shipmentClient = ''

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  alertType = 'danger'
  private _message$ = new Subject<string>();
  message = ''

  constructor(private packetService$: PacketService,
              private shipmentService$: ShipmentService,
              private modalService: NgbModal) {
    this._message$
      .pipe(
        takeUntilDestroyed(),
        tap((message) => (this.message = message)),
        debounceTime(5000),
      )
      .subscribe(() => this.selfClosingAlert?.close());
  }

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
      error: () => this.showMessage("An unexpected error occurred! Please Reload the page. If the problem persists, contact tech support.", "danger")
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
      next: () => this.ngOnInit(),
      error: err => this.showMessage(err.error.errors.message, "warning")
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
        if (this.shipmentClient === '') {
          this.shipmentClient = p.clientName
        } else {
          if (this.shipmentClient !== p.clientName) {
            this.showMessage("All products in a Packet must belong to the same client!", "warning");
            return;
          }
        }
        this.shipmentFormArray.push(new FormControl({id: p.id, code: p.code}))
        return;
      }
    });
  }

  private showMessage(message: string, type: AlertType) {
    this.alertType = type;
    this._message$.next(message);
  }
}
