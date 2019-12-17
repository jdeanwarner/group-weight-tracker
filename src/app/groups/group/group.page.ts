import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { WeightEntry } from 'src/app/shared/weight-entry';
import { Group } from 'src/app/shared/group';
import { ActivatedRouteSnapshot, Router, Params, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit, OnDestroy {

  group$: Observable<Group>;
  groupsWeightEntries$: Observable<{ [userId: string]: WeightEntry[] }>;
  paramSubscription: Subscription;
  entries: WeightEntry[][];

  constructor(private store: Store<fromStore.GroupsState>, private route: ActivatedRoute) {
    this.groupsWeightEntries$ = this.store.select(fromStore.getWeightEntriesEntities);
  }

  ngOnInit() {
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.group$ = this.store.select(fromStore.getGroup(params.get('id')));
    });
    this.groupsWeightEntries$.subscribe( entities => {
      console.log('sub called');
    });
  }

  getValues(pair: { [userId: string]: WeightEntry[] }) {
    console.log(Object.values(pair));
    return Object.values(pair);
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

}
