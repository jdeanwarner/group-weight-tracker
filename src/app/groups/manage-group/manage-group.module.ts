import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageGroupPageRoutingModule } from './manage-group-routing.module';

import { ManageGroupPage } from './manage-group.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from '../store';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageGroupPageRoutingModule,
    SharedModule,
    StoreModule.forFeature('groups', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [ManageGroupPage, AddUserComponent, UserListComponent]
})
export class ManageGroupPageModule {}
