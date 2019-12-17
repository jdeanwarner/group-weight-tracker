import { GroupPage } from './group/group.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GroupsPage } from './groups.page';
import { JoinedGroupsResolver } from './joined-groups.resolver';

const routes: Routes = [
    {
        path: '',
        component: GroupsPage,
        resolve: [ JoinedGroupsResolver ],
        children: [
            {
                path: '',
                redirectTo: 'joined'
            },
            {
                path: 'joined',
                loadChildren: () => import('./joined/joined.module').then( m => m.JoinedPageModule)
            },
            {
                path: 'invitations',
                loadChildren: () => import('./invitations/invitations.module').then( m => m.InvitationsPageModule)
            },
            {
                path: ':id',
                loadChildren: () => import('./group/group.module').then( m => m.GroupPageModule)
            },
            {
                path: ':id/manage',
                loadChildren: () => import('./manage-group/manage-group.module').then( m => m.ManageGroupPageModule)
            }
        ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}
