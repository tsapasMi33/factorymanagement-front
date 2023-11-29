import {Component, OnInit, TemplateRef} from '@angular/core';
import {User} from "../../../../core/models/user.model";
import {UserService} from "../../services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

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

  errorMessage = new BehaviorSubject<string>('')

  constructor(private userService$: UserService,
              private modalService: NgbModal,
              private fb: FormBuilder) {
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
    this.userForm = this.generateUserForm()
    this.open(modal);
  }

  getUser(id: number, content: TemplateRef<any>) {
    this.create = false;
    this.selectedUserId = id
    this.userService$.getUser(id).subscribe({
      next: value => {
        this.userForm = this.generateUserForm();
        this.setUserForm(value);
        this.open(content)
      },
      error: err => console.error(err)
    })
  }

  saveUser(modal: any) {
    if (this.create) {
      this.userService$.createUser(this.userForm.value).subscribe({
        next: value => this.load(),
        error: err => console.error(err)
      })
    } else {
      this.userService$.updateUser(this.selectedUserId ,this.userForm.value).subscribe({
        next: value => {
          this.load();
          this.showSuccess('User has been updated!')
        },
        error: err => console.error(err)
      })
    }
    modal.close()
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  generateUserForm() {
    return this.fb.group({
      username: [null,[Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      role: [null, [Validators.required]],
      costPerMinute: [null, [Validators.min(0)]]
    })
  }


  private setUserForm(user: User) {
    this.userForm.get('username')?.setValue(user.username)
    this.userForm.get('role')?.setValue(user.role)
    this.userForm.get('costPerMinute')?.setValue(user.costPerMinute)
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

  private showSuccess(message: string) {
    this.errorMessage.next(message);
    setInterval(() => {
      this.errorMessage.next('')
    },5000)
  }

}
