import { SelectWeightEntry } from './../store/actions/weight-entry.actions';
import * as fromStore from '../../home/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';


@Injectable()
export class WeightEntryResolver implements Resolve<void> {

    constructor(private store: Store<fromStore.WeightState>) {}

    resolve(route: ActivatedRouteSnapshot): void {
        console.log(route.paramMap.get('id'));
        this.store.select(fromStore.getWeightEntry(route.paramMap.get('id'))).pipe(
            map((entry) => {
                console.log(entry);
                this.store.dispatch(new SelectWeightEntry(entry));
            })
        ).subscribe();
    }

}
