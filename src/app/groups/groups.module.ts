import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GroupsPage } from './groups.page';
import { GroupsRoutingModule } from './groups-routing.module';
import { JoinedGroupsResolver } from './joined-groups.resolver';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupsRoutingModule,
    SharedModule,
    StoreModule.forFeature('groups', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [GroupsPage],
  providers: [JoinedGroupsResolver]
})
export class GroupsPageModule {}
