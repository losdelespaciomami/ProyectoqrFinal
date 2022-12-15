import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntretencionPage } from './entretencion.page';

const routes: Routes = [
  {
    path: '',
    component: EntretencionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntretencionPageRoutingModule {}
