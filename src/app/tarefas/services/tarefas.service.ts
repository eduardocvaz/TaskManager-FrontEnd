import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tarefa } from '../model/tarefa';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  constructor(private httpClient: HttpClient) { }

  // private readonly API = 'http://localhost:8080/tarefas';
  private readonly API = '/assets/tarefas.json';

  list() {
    return this.httpClient.get<Tarefa[]>(this.API)
    .pipe(
      first(),
      tap(console.log)
    );
  }

}
