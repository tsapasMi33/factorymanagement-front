import {Component, TemplateRef} from '@angular/core';
import {Client} from "../../../../core/models/client.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ClientService} from "../../services/client.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  clients!: Client[]
  clientForm!: FormGroup;
  create = false;
  selectedClientId: number = 0;

  constructor(private clientService$: ClientService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.clientService$.getClients().subscribe({
      next: value => this.clients = value,
      error: err => console.error(err)
    })
  }


  createClient(modal: TemplateRef<any>) {
    this.create = true
    this.selectedClientId = 0;
    this.generateClientForm({name: "", companyType: "", address: {street: "", number: "", city: "", cp: "", country: ""}, discountPercentage : 0, id: 0})
    this.open(modal);
  }

  getClient(id: number, content: TemplateRef<any>) {
    this.create = false;
    this.selectedClientId = id
    this.clientService$.getClient(id).subscribe({
      next: value => {
        this.generateClientForm(value)
        this.open(content)
      },
      error: err => console.error(err)
    })
  }

  saveClient(modal: any) {
    if (this.create) {
      this.clientService$.createClient(this.clientForm.value).subscribe({
        next: value => this.load(),
        error: err => console.error(err)
      })
    } else {
      this.clientService$.updateClient(this.selectedClientId ,this.clientForm.value).subscribe({
        next: value => {
          this.load();
        },
        error: err => console.error(err)
      })
    }
    modal.close()
  }


  deleteClient(modal: any) {
    this.clientService$.deleteClient(this.selectedClientId).subscribe({
      next: value => this.load(),
      error: err => console.error(err)
    })
    modal.close();
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  generateClientForm(client: Client) {
    this.clientForm = new FormGroup(
      {
        name: new FormControl(client.name),
        companyType: new FormControl(client.companyType),
        discountPercentage: new FormControl(client.discountPercentage),
        address: new FormGroup(
          {
            street: new FormControl(client.address.street),
            number: new FormControl(client.address.number),
            cp: new FormControl(client.address.cp),
            country: new FormControl(client.address.country),
            city: new FormControl(client.address.city),
          }
        )
      }
    )
  }

}
