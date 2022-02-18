import { TarefasService } from './../services/tarefas.service';
import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../model/tarefa';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {

  tarefas: Observable<Tarefa[]>;

  displayedColumns = ['id', 'titulo'];

  constructor(private tarefaService: TarefasService) {
    this.tarefas = this.tarefaService.list();

  }

  ngOnInit(): void {
  }

}
