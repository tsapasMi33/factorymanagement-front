import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {AuthDto} from "./core/models/auth.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  connected: Observable<AuthDto | null>;

  constructor(private $authService: AuthService) {
    this.connected = $authService.connectedUser$;
  }
}
