import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { WeightChartComponent } from './weight-chart/weight-chart.component';
import { AuthService } from './auth.service';
import { WeightService } from './weight.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { GroupService } from './group.service';



@NgModule({
  declarations: [
    WeightChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule
  ],
  providers: [
    WeightService,
    AuthService,
    UserService,
    GroupService
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    WeightChartComponent
  ]
})
export class SharedModule { }
