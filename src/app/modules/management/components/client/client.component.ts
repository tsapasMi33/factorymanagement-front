import {Component, TemplateRef} from '@angular/core';
import {Client} from "../../../../core/models/client.model";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../services/client.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  clients: Client[] = new Array(20)
  clientForm!: FormGroup;
  create = false;
  selectedClientId: number = 0;
  pageLoading = false;
  clientSaving = false;

  errorMessage = new BehaviorSubject<string>('')

  constructor(private clientService$: ClientService,
              private modalService: NgbModal,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.pageLoading = true;
    this.clientForm = this.generateClientForm();
    this.clientService$.getClients().subscribe({
      next: value => {
        this.clients = value
        this.pageLoading = false;
      },
      error: err => {
        console.error(err);
        this.pageLoading = false;
      }
    })
  }

  createClient(modal: TemplateRef<any>) {
    this.create = true
    this.selectedClientId = 0;
    this.open(modal);
  }

  getClient(id: number, modal: TemplateRef<any>) {
    this.create = false;
    this.selectedClientId = id
    this.clientService$.getClient(id).subscribe({
      next: value => {
        this.setClientForm(value)
        this.open(modal)
      },
      error: err => console.error(err)
    })
  }

  saveClient(modal: any) {
    this.clientSaving = true;
    if (this.create) {
      this.clientService$.createClient(this.clientForm.value).subscribe({
        next: () => {
          this.load();
          this.clientSaving = false;
          this.showSuccess('Client has been saved!')
        },
        error: err => {
          console.error(err);
          this.clientSaving = false
        }
      })
    } else {
      this.clientService$.updateClient(this.selectedClientId ,this.clientForm.value).subscribe({
        next: () => {
          this.load();
          this.clientSaving = false;
          this.showSuccess('Client has been updated!')
        },
        error: err => {
          console.error(err);
          this.clientSaving = false;
        }
      })
    }
    modal.close()
  }


  deleteClient(modal: any) {
    this.clientService$.deleteClient(this.selectedClientId).subscribe({
      next: () => {
        this.load()
        this.showSuccess('Client has been deleted!')
      },
      error: err => console.error(err)
    })
    modal.close();
  }

  open(modal: TemplateRef<any>) {
    this.modalService.open(modal)
  }

  generateClientForm() {
    return this.fb.group({
      name: [null, [Validators.required]],
      companyType:[null],
      discountPercentage: [null, [Validators.min(0), Validators.max(60)]],
      address: this.fb.group({
        street:[null],
        number:[null],
        cp:[null],
        city:[null],
        country:[null],
      })
    });
  }

  private setClientForm(client: Client) {
    this.clientForm.get('name')?.setValue(client.name);
    this.clientForm.get('companyType')?.setValue(client.companyType);
    this.clientForm.get('discountPercentage')?.setValue(client.discountPercentage);
    let address = this.clientForm.get('address') as FormArray;
    address.get('street')?.setValue(client.address.street);
    address.get('number')?.setValue(client.address.number);
    address.get('cp')?.setValue(client.address.cp);
    address.get('city')?.setValue(client.address.city);
    address.get('country')?.setValue(client.address.country);
  }


  private showSuccess(message: string) {
    this.errorMessage.next(message);
    setInterval(() => {
      this.errorMessage.next('')
    },5000)
  }
}
