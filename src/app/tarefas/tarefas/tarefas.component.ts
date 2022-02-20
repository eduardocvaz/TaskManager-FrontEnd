import { AddDialogComponent } from './../../add-dialog/add-dialog.component';
import { async } from '@angular/core/testing';
import { TarefasService } from './../services/tarefas.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { Tarefa } from '../model/tarefa';
import { catchError, Observable, of} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class TarefasComponent implements OnInit {

  tarefas$: Observable<Tarefa[]>;
  dataSource = new MatTableDataSource<Tarefa>();

  myTarefas: Tarefa[] = [];


  displayedColumns = ['id', 'titulo','responsavel','prioridade','status', 'actions'];


  constructor(
    private tarefaService: TarefasService,
    public dialog: MatDialog
    ) {
      this.tarefas$ = this.tarefaService.list()
      .pipe(
        catchError(err => {
          this.onError('Erro ao carregar tarefas.');
          return of([]);
        }));

      this.tarefas$.subscribe(tarefas => {
        this.myTarefas = tarefas;
        this.dataSource = new MatTableDataSource(this.myTarefas);
      });
      this.dataSource = new MatTableDataSource(this.myTarefas);
  }

  editTarefa(element: any) {
    this.dialog.open(AddDialogComponent, {
      width: '30%',
      data:element
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.updateTable();
    }
    );
  }

  deleteTarefa(id: number) {
    this.tarefaService.delete(id).subscribe(() => {
      this.onError('Tarefa excluída com sucesso.');
      this.updateTable();
    });
  }

  checkTarefa(id: number) {
    this.tarefaService.check(id).subscribe(() => {
      this.onError('Tarefa concluída com sucesso.');
      this.updateTable();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  updateTable() {
    this.tarefas$ = this.tarefaService.list()
    .pipe(
      catchError(err => {
        this.onError('Erro ao carregar tarefas.');
        return of([]);
      }));

      this.tarefas$.subscribe(tarefas => {
        this.myTarefas = tarefas;
        this.dataSource = new MatTableDataSource(this.myTarefas);
      });
      this.dataSource = new MatTableDataSource(this.myTarefas);
  }


  ngOnInit(): void {
  }

}
