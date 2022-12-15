import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrappPage } from './registrapp.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrappPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrappPageRoutingModule {}
