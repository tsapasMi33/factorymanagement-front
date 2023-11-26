import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form!: FormGroup;
  loading = false;
  errorMessage = new BehaviorSubject<string>('')


  constructor(private $authService: AuthService) {

  }

  ngOnInit(): void {
    this.generateForm()
  }

  onSubmit(){
    if (this.form.valid) {
      this.loading = true;
      this.$authService.connect(this.form.value).subscribe({
        next: () => {
          this.loading = false;
        },
        error: err => {
          this.loading = false;
          this.showWarning('Bad Credentials!')
        }
      })
    }
  }

  generateForm() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null,[Validators.minLength(6),Validators.maxLength(6)])
    })
  }

  private showWarning(message: string) {
    this.errorMessage.next(message);
    setInterval(() => {
      this.errorMessage.next('')
    },5000)
  }
}
