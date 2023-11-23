import {Component, OnInit, TemplateRef} from '@angular/core';
import {User} from "../../../../core/models/user.model";
import {UserService} from "../../services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users!: User[];
  userForm!: FormGroup;
  create = false;
  selectedUserId: number = 0;


  constructor(private userService$: UserService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.load()
  }

  load() {
    this.userService$.getUsers().subscribe({
      next: value => this.users = value,
      error: err => console.error(err)
    })
  }

  createUser(modal: TemplateRef<any>) {
    this.create = true
    this.selectedUserId = 0;
    this.generateUserForm({username: "", id: 0, role: "ADMIN", enabled: true, createdDate: new Date(), costPerMinute: 0})
    this.open(modal);
  }

  getUser(id: number, content: TemplateRef<any>) {
    this.create = false;
    this.selectedUserId = id
    this.userService$.getUser(id).subscribe({
      next: value => {
        this.generateUserForm(value)
        this.open(content)
      },
      error: err => console.error(err)
    })
  }

  saveClient(modal: any) {
    if (this.create) {
      this.userService$.createUser(this.userForm.value).subscribe({
        next: value => this.load(),
        error: err => console.error(err)
      })
    } else {
      this.userService$.updateUser(this.selectedUserId ,this.userForm.value).subscribe({
        next: value => {
          this.load();
        },
        error: err => console.error(err)
      })
    }
    modal.close()
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  generateUserForm(user: User) {
    this.userForm = new FormGroup({
      username: new FormControl(user.username),
      password: new FormControl(null),
      role: new FormControl(user.role),
      costPerMinute: new FormControl(user.costPerMinute)
    })
  }

  toggleUser(id: number, enabled: boolean) {
    if (enabled) {
      this.userService$.toggleUser(id, !enabled).subscribe({
        next: value => this.load(),
        error: err => console.error(err)
      })
    } else {
      this.userService$.toggleUser(id, !enabled).subscribe({
        next: value => this.load(),
        error: err => console.error(err)
      })
    }
  }
}
