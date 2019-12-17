import { switchMap, map } from 'rxjs/operators';
import { LoadWeightEntriesForGroup } from '../store/actions/group.actions';
import * as fromStore from '../store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Group } from 'src/app/shared/group';
import { Observable } from 'rxjs';


@Injectable()
export class GroupResolver implements Resolve<void> {

    constructor(private store: Store<fromStore.GroupsState>) {}

    resolve(route: ActivatedRouteSnapshot): void {
        this.store.select(fromStore.getGroup(route.paramMap.get('id'))).pipe(
            map((group: Group ) => {
                this.store.dispatch(new LoadWeightEntriesForGroup(group));
            })
        ).subscribe();
    }

}
