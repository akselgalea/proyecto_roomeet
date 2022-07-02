import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from './auth.service';

export interface IUser {
  id: number,
  username: string,
  email: string,
  nombre: string | null,
  fotoPerfil: string | null,
  ciudad: string | null,
  ocupacion: number | null,
  sexo: number | null,
  descripcion: string | null,
  preferencias: number | null,
  roomie_ideal: number | null
  estado: number | null
}

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  apiUrl = 'http://127.0.0.1:3000/api/';

  constructor(private http: HttpClient) { }

  getProfiles(usuario: number) {
    return this.http.post<IResponse>(`${this.apiUrl}search/roomie`, usuario);
  }

  getProfile() {
    return this.http.get<IResponse>(`${this.apiUrl}profile`);
  }

}
