import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinedPage } from './joined.page';
import { JoinedGroupsResolver } from './joined-groups.resolver';

const routes: Routes = [
  {
    path: '',
    component: JoinedPage,
    resolve: [ JoinedGroupsResolver ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinedPageRoutingModule {}
