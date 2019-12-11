import * as fromStore from '../home/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadWeightEntries } from '../home/store';


@Injectable()
export class WeightEntriesResolver implements Resolve<void> {

    constructor(private store: Store<fromStore.WeightState>) {}

    resolve(route: ActivatedRouteSnapshot): void {
        this.store.dispatch(new LoadWeightEntries());
    }

}
