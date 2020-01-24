import { SharedModule } from 'src/app/shared/shared.module';
import { WeightEntryListComponent } from './weight-entry-list/weight-entry-list.component';
import { WeightChartComponent } from '../shared/weight-chart/weight-chart.component';
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
        resolve: [WeightEntriesResolver],
        children: [
          {
            path: '',
            component: HomePage,
          },
          {
            path: ':id',
            loadChildren: () => import('./weight-entry/weight-entry.module').then( m => m.WeightEntryPageModule)
          }
        ]
      }
    ]),
    StoreModule.forFeature('weightEntries', reducers),
    EffectsModule.forFeature(effects),
    SharedModule
  ],
  providers: [
    WeightEntriesResolver
  ],
  declarations: [HomePage, WeightEntryListComponent]
})
export class HomePageModule {}
