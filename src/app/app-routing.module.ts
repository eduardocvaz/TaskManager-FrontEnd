import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tarefas', pathMatch: 'full' },
  { path: 'tarefas',
    loadChildren: () => import('./tarefas/tarefas.module').then(m => m.TarefasModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
