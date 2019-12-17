import { LoadGroups } from './../store/actions/group.actions';
import * as fromStore from '../store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';


@Injectable()
export class JoinedGroupsResolver implements Resolve<void> {

    constructor(private store: Store<fromStore.GroupsState>) {}

    resolve(route: ActivatedRouteSnapshot): void {
        this.store.dispatch(new LoadGroups());
    }

}
