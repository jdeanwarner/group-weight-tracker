import { AuthService } from './auth.service';
import { WeightService } from './weight.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    WeightService,
    AuthService
  ]
})
export class SharedModule { }
