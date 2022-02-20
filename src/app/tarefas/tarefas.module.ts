import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { TarefasRoutingModule } from './tarefas-routing.module';
import { TarefasComponent } from './tarefas/tarefas.component';




@NgModule({
  declarations: [
    TarefasComponent
  ],
  imports: [
    CommonModule,
    TarefasRoutingModule,
    AppMaterialModule,
    SharedModule

  ]
})
export class TarefasModule { }
