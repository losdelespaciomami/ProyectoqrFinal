import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosdocentePage } from './cursosdocente.page';

const routes: Routes = [
  {
    path: '',
    component: CursosdocentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosdocentePageRoutingModule {}
