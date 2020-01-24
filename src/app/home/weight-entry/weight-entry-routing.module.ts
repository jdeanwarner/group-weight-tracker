import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeightEntryPage } from './weight-entry.page';
import { WeightEntryResolver } from './weight-entry.resolver';

const routes: Routes = [
  {
    path: '',
    component: WeightEntryPage,
    resolve: [
      WeightEntryResolver
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeightEntryPageRoutingModule {}
