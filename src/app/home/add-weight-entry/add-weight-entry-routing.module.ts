import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWeightEntryPage } from './add-weight-entry.page';

const routes: Routes = [
  {
    path: '',
    component: AddWeightEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddWeightEntryPageRoutingModule {}
