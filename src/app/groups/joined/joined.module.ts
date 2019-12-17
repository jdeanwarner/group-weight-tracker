import { JoinedListComponent } from './joined-list/joined-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinedPageRoutingModule } from './joined-routing.module';

import { JoinedPage } from './joined.page';
import { JoinedGroupsResolver } from './joined-groups.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinedPageRoutingModule
  ],
  declarations: [JoinedPage, JoinedListComponent],
  providers: [JoinedGroupsResolver]
})
export class JoinedPageModule {}
