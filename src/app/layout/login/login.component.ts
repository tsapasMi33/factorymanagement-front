import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup


  constructor(private $authService: AuthService) {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null,[Validators.min(6), Validators.max(6)])
    })
  }

  onSubmit(){
    if (this.form.valid) {
      this.$authService.connect(this.form.value).subscribe({
        next: () => console.log("ok"),
        error: () => console.error("problem")
      })
    }
  }
}
