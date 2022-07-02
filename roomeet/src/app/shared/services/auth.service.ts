import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface IRegistro {
  username: string,
  email: string,
  password: string
}

export interface ILogin {
  username: string,
  password: string
}

export interface IResponse {
  status: string,
  body: any,
  token: string | ''
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://127.0.0.1:3000/api/';

  constructor(private http: HttpClient, private router: Router) {}
  
  registro(usuario: IRegistro) {
    return this.http.post<IResponse>(`${this.apiUrl}auth/register`, usuario);
  }

  login(usuario: ILogin) {
    return this.http.post<IResponse>(`${this.apiUrl}auth/login`, usuario);
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
