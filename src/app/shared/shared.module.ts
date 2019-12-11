import { AuthService } from './auth.service';
import { WeightService } from './weight.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    WeightService,
    AuthService
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
