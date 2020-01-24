import { countWeightEntries } from './../store/reducers/group.reducer';
import { User } from 'src/app/shared/user';
import { SelectGroup, LoadGroupUsers, LoadWeightEntriesForGroup, CountWeightEntriesForGroup } from './../store/actions/group.actions';
import { map, take } from 'rxjs/operators';
import * as fromStore from '../store';
import * as fromHome from '../../home/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Group } from 'src/app/shared/group';
import { AuthService } from 'src/app/shared/services/auth.service';
import { forkJoin } from 'rxjs';


@Injectable()
export class GroupResolver implements Resolve<void> {

    constructor(
        private store: Store<fromStore.GroupsState>) {}

    resolve(route: ActivatedRouteSnapshot): void {
        this.store.select(fromStore.getGroup(route.paramMap.get('id')))
        .pipe(
            map((group) => {
                if (group) {
                    this.store.dispatch(new SelectGroup(group));
                    this.store.dispatch(new LoadWeightEntriesForGroup(group.users));
                    this.store.dispatch(new LoadGroupUsers(group));
                    this.store.dispatch(new CountWeightEntriesForGroup(group.users));
                }
            })
        ).subscribe();
    }

}
