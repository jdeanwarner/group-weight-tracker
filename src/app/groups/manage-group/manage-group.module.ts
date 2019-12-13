import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageGroupPageRoutingModule } from './manage-group-routing.module';

import { ManageGroupPage } from './manage-group.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageGroupPageRoutingModule,
    SharedModule
  ],
  declarations: [ManageGroupPage]
})
export class ManageGroupPageModule {}
