import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User} from "../../../../core/models/user.model";
import {UserService} from "../../services/user.service";
import {NgbAlert, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime, Subject, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AlertType} from "../../../../core/enums/alertType.enum";

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

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  alertType = 'danger'
  private _message$ = new Subject<string>();
  message = ''

  constructor(private userService$: UserService,
              private modalService: NgbModal,
              private fb: FormBuilder) {
    this._message$
      .pipe(
        takeUntilDestroyed(),
        tap((message) => (this.message = message)),
        debounceTime(5000),
      )
      .subscribe(() => this.selfClosingAlert?.close());
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
        next: () => this.load(),
        error: err => this.showMessage(err.error.errors.message, "warning")
      })
    } else {
      this.userService$.updateUser(this.selectedUserId ,this.userForm.value).subscribe({
        next: () => {
          this.load();
          this.showMessage('User has been updated!', "success")
        },
        error: err => this.showMessage(err.error.errors.message, "warning")
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
        next: () => this.load(),
        error: err => this.showMessage(err.error.errors.message, "warning")
      })
    } else {
      this.userService$.toggleUser(id, !enabled).subscribe({
        next: () => this.load(),
        error: err => this.showMessage(err.error.errors.message, "warning")
      })
    }
  }

  private showMessage(message: string, type: AlertType) {
    this.alertType = type;
    this._message$.next(message);
  }

}
