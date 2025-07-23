import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotCodePageRoutingModule } from './forgot-code-routing.module';

import { ForgotCodePage } from './forgot-code.page';
import { ReactiveFormsModule } from '@angular/forms'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ForgotCodePageRoutingModule
  ],
  declarations: [ForgotCodePage]
})
export class ForgotCodePageModule {}
