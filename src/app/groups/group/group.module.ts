import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupPageRoutingModule } from './group-routing.module';

import { GroupPage } from './group.page';
import { GroupResolver } from './group.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupPageRoutingModule,
    SharedModule
  ],
  declarations: [GroupPage],
  providers: [ GroupResolver ]
})
export class GroupPageModule {}
