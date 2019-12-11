import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeightEntryPageRoutingModule } from './weight-entry-routing.module';

import { WeightEntryPage } from './weight-entry.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    WeightEntryPageRoutingModule
  ],
  declarations: [WeightEntryPage]
})
export class WeightEntryPageModule {}
