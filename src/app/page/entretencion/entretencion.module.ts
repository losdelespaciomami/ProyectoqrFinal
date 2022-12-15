import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntretencionPageRoutingModule } from './entretencion-routing.module';

import { EntretencionPage } from './entretencion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntretencionPageRoutingModule
  ],
  declarations: [EntretencionPage]
})
export class EntretencionPageModule {}
