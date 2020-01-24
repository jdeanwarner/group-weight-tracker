import { User } from 'src/app/shared/user';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { WeightEntry } from 'src/app/shared/weight-entry';
import { Group } from 'src/app/shared/group';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

  group$: Observable<Group>;
  groupsWeightEntries$: Observable<{ [userId: string]: WeightEntry[] }>;
  users$: Observable<User[]>;
  recordsCount$: Observable<number>;
  loading = false;

  constructor(private store: Store<fromStore.GroupsState>, public loadingController: LoadingController) {
    this.groupsWeightEntries$ = this.store.select(fromStore.getWeightEntriesEntities);
    this.group$ = this.store.select(fromStore.getSelectedGroup);
    this.users$ = this.store.select(fromStore.getAllGroupUsers);
    this.recordsCount$ = this.store.select(fromStore.countWeightEntries);
  }

  ngOnInit() {

  }

  async presentLoading() {
    this.loading = true;
    const loading = await this.loadingController.create({
      spinner: null,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      duration: 5000
    });
    return await loading.present();
  }

  allRecordsLoaded(count: number, records: { [userId: string]: WeightEntry[] }): boolean {
    if (count && count > 0 && records) {
      const allActivities = Array.prototype.concat.apply([], Object.values(records));
      if (allActivities.length === count) {
        if (this.loading) {
          this.loading = false;
          this.loadingController.dismiss();
        }
        return true;
      } else {
        if (!this.loading) {
          this.presentLoading();
        }
        return false;
      }
    } else {
      return false;
    }
  }

}
