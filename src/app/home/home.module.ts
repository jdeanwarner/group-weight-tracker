import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects, reducers } from './store';
import { WeightEntriesResolver } from './weight-entries.resolver';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        resolve: [WeightEntriesResolver]
      },
      {
        path: 'add',
        loadChildren: () => import('./add-weight-entry/add-weight-entry.module').then( m => m.AddWeightEntryPageModule)
      }
    ]),
    StoreModule.forFeature('weightEntries', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [
    WeightEntriesResolver
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
