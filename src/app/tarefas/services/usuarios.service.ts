import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  add(value: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private httpClient: HttpClient) { }

  private readonly API = 'http://localhost:8080/usuarios';


  list() {
    return this.httpClient.get<Usuario[]>(this.API)
    .pipe(
      first(),
      tap(console.log)
    );
  }

  get(id: number) {
    return this.httpClient.get<Usuario>(`${this.API}/${id}`)
    .pipe(
      first(),
      tap(console.log)
    );
  }
}
