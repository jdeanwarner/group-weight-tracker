import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { WeightEntry } from 'src/app/shared/weight-entry';
import { Group } from 'src/app/shared/group';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

  group$: Observable<Group>;
  groupsWeightEntries$: Observable<{ [userId: string]: WeightEntry[] }>;

  constructor(private store: Store<fromStore.GroupsState>) {
    this.groupsWeightEntries$ = this.store.select(fromStore.getWeightEntriesEntities);
    this.group$ = this.store.select(fromStore.getSelectedGroup);
  }

  ngOnInit() {

  }

}
