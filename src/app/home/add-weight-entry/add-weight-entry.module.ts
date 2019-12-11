import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddWeightEntryPageRoutingModule } from './add-weight-entry-routing.module';

import { AddWeightEntryPage } from './add-weight-entry.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AddWeightEntryPageRoutingModule
  ],
  declarations: [AddWeightEntryPage]
})
export class AddWeightEntryPageModule {}
