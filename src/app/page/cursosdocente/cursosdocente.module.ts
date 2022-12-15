import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosdocentePageRoutingModule } from './cursosdocente-routing.module';

import { CursosdocentePage } from './cursosdocente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursosdocentePageRoutingModule
  ],
  declarations: [CursosdocentePage]
})
export class CursosdocentePageModule {}
