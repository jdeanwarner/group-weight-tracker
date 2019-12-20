import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupPage } from './group.page';
import { GroupResolver } from './group.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: [ GroupResolver ],
    children: [
      {
        path: '',
        component: GroupPage,
      },
      {
        path: 'manage',
        loadChildren: () => import('../manage-group/manage-group.module').then( m => m.ManageGroupPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupPageRoutingModule {}
