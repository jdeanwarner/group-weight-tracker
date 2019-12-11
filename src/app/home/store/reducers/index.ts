import * as fromWeightEntry from './weight-entry.reducer';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

export interface WeightState {
    weightEntries: fromWeightEntry.WeightState;
}

export const reducers: ActionReducerMap<WeightState> = {
    weightEntries : fromWeightEntry.reducer,
};

export const getWeightState = createFeatureSelector<WeightState>('weightEntries');
