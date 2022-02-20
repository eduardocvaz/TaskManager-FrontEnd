import { Component, Inject, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Usuario } from '../tarefas/model/usuario';
import { UsuariosService } from '../tarefas/services/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TarefasService } from '../tarefas/services/tarefas.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarefa } from '../tarefas/model/tarefa';
import { waitForAsync } from '@angular/core/testing';
import { ErrorStateMatcher } from '@angular/material/core';
import { TarefasComponent } from '../tarefas/tarefas/tarefas.component';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
})
export class AddDialogComponent implements OnInit {
  usuarios$: Observable<Usuario[]>;

  tarefaForm!: FormGroup;

  errorStateMatcher = new ErrorStateMatcher();

  actionBtn: string = 'Adicionar';

  constructor(
    private usuarioService: UsuariosService,
    private tarefaService: TarefasService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddDialogComponent>,
    private tarefasComponent: TarefasComponent,
    @Inject(MAT_DIALOG_DATA) public ediData: any
  ) {
    this.usuarios$ = this.usuarioService.list().pipe(
      catchError((err) => {
        this._snackBar.open('Erro ao carregar usuários.', 'OK'),
          console.log(err);
        return of([]);
      })
    );
  }

  addTarefa() {
    if (!this.ediData) {
      if (this.tarefaForm.valid) {
        // console.log(this.tarefa)
        const tarefa = this.tarefaForm.getRawValue() as Tarefa;
        console.log(this.tarefaForm.value);
        console.log(tarefa);
        this.tarefaService.post(tarefa).subscribe({
          next: () => {
            this._snackBar.open('Tarefa adicionada com sucesso.', 'OK'),
              this.tarefaForm.reset();
              this.tarefasComponent.updateTable();
            this.dialogRef.close();
            
          },
          error: (err) => {
            this._snackBar.open('Erro ao adicionar tarefa.', 'OK'),
              console.log(err);
          },
        });
      } else {
        this._snackBar.open('Preencha os campos corretamente.', 'OK');
      }

      console.log(this.tarefaForm.value);
    } else {
      this.updateTarefa();
    }
  }
  updateTarefa() {
    const tarefa = this.tarefaForm.getRawValue() as Tarefa;
    tarefa.id = this.ediData.id;
    this.tarefaService.put(tarefa).subscribe({
      next: () => {
        this._snackBar.open('Tarefa editada com sucesso.', 'OK'),
        this.tarefaForm.reset();
        this.tarefasComponent.updateTable();
        this.dialogRef.close();
      },
      error: (err) => {
        this._snackBar.open('Erro ao editar tarefa.', 'OK'),
          console.log(err);
      },
    });
  }

  compareFn(x: Usuario, y: Usuario): boolean {
    return x && y ? x.id === y.id : x === y;
  }

  ngOnInit(): void {
    this.tarefaForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      prioridade: ['', Validators.required],
      status: ['', Validators.required],
      responsavel: ['', Validators.required],
    });
    if (this.ediData) {
      this.actionBtn = 'Editar';
      this.tarefaForm.controls['titulo'].setValue(this.ediData.titulo);
      this.tarefaForm.controls['descricao'].setValue(this.ediData.descricao);
      this.tarefaForm.controls['prioridade'].setValue(this.ediData.prioridade);
      this.tarefaForm.controls['status'].setValue(this.ediData.status);
      waitForAsync;
      this.tarefaForm.controls['responsavel'].setValue(
        this.ediData.responsavel
      );

    }
  }
}
