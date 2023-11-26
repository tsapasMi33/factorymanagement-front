import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {AuthDto} from "../core/models/auth.model";

const AUTH_KEY = 'connectedUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _connectedUser$ = new BehaviorSubject<AuthDto | null>(this.connectedUser)
  constructor(private http: HttpClient) { }

  connect(loginForm:{'username': string, 'password': string}) {
    return this.http.post<AuthDto>('http://localhost:8080/user/login',loginForm).pipe(
      tap({
        next: auth => this.connectedUser = auth
      })
    );
  }


  disconnect(){
    if( this.isConnected ) {
      this.connectedUser = null;
    }
  }

  get isConnected(): boolean {
    return !!this.connectedUser;
  }

  get connectedUser(): AuthDto | null {
    const authString = localStorage.getItem(AUTH_KEY);
    if( authString )
      return JSON.parse(authString) as AuthDto;
    else
      return null;
  }

  private set connectedUser(user: AuthDto | null){
    if( user )
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    else
      localStorage.removeItem(AUTH_KEY);

    this._connectedUser$.next( this.connectedUser );
  }

  get connectedUser$(): Observable<AuthDto | null>{
    return this._connectedUser$.asObservable()
  }

  get connected$(): Observable<boolean>{
    return this.connectedUser$.pipe(
      map( auth => !!auth )
    )
  }

  get token(): string | null {
    return this.connectedUser ? this.connectedUser.token : null;
  }
}
