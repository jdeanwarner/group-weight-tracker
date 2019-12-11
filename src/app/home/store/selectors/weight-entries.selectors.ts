import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromWeightEntries from '../reducers/weight-entry.reducer';

export const getWeightEntriesState = createSelector(
    fromFeature.getWeightState,
    (state: fromFeature.WeightState) => state.weightEntries
);

export const getWeightEntriesEntites = createSelector(getWeightEntriesState, fromWeightEntries.getWeightEntriesEntites);


export const getAllWeightEntries = createSelector(
    getWeightEntriesEntites,
    (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    }
);


export const getWeightEntriesLoading = createSelector(getWeightEntriesState, fromWeightEntries.getWeightEntriesLoading);
export const getWeightEntriesLoaded = createSelector(getWeightEntriesState, fromWeightEntries.getWeightEntriesLoaded);
