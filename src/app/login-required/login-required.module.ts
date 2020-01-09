import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginRequiredPageRoutingModule } from './login-required-routing.module';

import { LoginRequiredPage } from './login-required.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginRequiredPageRoutingModule
  ],
  declarations: [LoginRequiredPage]
})
export class LoginRequiredPageModule {}
