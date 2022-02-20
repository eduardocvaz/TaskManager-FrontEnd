import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tarefa } from '../model/tarefa';
import { delay, first, tap } from 'rxjs';
import { Status } from '../model/Status';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {


  constructor(private httpClient: HttpClient) { }

  private readonly API = 'http://localhost:8080/tarefas';
  // private readonly API = '/assets/tarefas.json';

  list() {
    return this.httpClient.get<Tarefa[]>(this.API)
    .pipe(
      first(),
      tap(console.log)
    );
  }

  filterByCampo(campo: string, valor: string) {
    return this.httpClient.get<Tarefa[]>(`${this.API}?${campo}=${valor}`)
    .pipe(
      first(),
      tap(console.log)
    );
  }

  get(id: number) {
    return this.httpClient.get<Tarefa>(`${this.API}/${id}`)
    .pipe(
      first(),
      tap(console.log)
    );
  }

  post(tarefa: Tarefa) {
    return this.httpClient.post(this.API, tarefa)
    .pipe(
      first(),
      tap(console.log)
    );
  }

  put(tarefa: Tarefa) {
    return this.httpClient.put(this.API, tarefa)
    .pipe(
      first(),
      tap(console.log)
    );
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`)
    .pipe(
      first(),
      tap(console.log)
    );
  }

  check(id: number) {
    return this.httpClient.put(`${this.API}/${id}/status`, Status.CONCLUIDA)
    .pipe(
      first(),
      tap(console.log)
    );
  }


}
