import { SelectGroup, LoadGroupUsers, LoadWeightEntriesForGroup } from './../store/actions/group.actions';
import { map } from 'rxjs/operators';
import * as fromStore from '../store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Group } from 'src/app/shared/group';


@Injectable()
export class GroupResolver implements Resolve<void> {

    constructor(private store: Store<fromStore.GroupsState>) {}

    resolve(route: ActivatedRouteSnapshot): void {
        this.store.select(fromStore.getGroup(route.paramMap.get('id'))).pipe(
            map((group: Group ) => {
                if (group) {
                    this.store.dispatch(new SelectGroup(group));
                    this.store.dispatch(new LoadWeightEntriesForGroup(group));
                    this.store.dispatch(new LoadGroupUsers(group));
                }
            })
        ).subscribe();
    }

}
