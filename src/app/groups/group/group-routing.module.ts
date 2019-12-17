import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupPage } from './group.page';
import { GroupResolver } from './group.resolver';

const routes: Routes = [
  {
    path: '',
    component: GroupPage,
    resolve: [ GroupResolver ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupPageRoutingModule {}
