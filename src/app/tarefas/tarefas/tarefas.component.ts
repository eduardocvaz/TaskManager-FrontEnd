import { TarefasService } from './../services/tarefas.service';
import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../model/tarefa';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {

  tarefas$: Observable<Tarefa[]>;

  displayedColumns = ['id', 'titulo'];

  constructor(
    private tarefaService: TarefasService,
    public dialog: MatDialog
    ) {
    this.tarefas$ = this.tarefaService.list()
    .pipe(
      catchError(err => {
        this.onError('Erro ao carregar cursos.');
        return of([]);
      })
    );

  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {
  }

}
