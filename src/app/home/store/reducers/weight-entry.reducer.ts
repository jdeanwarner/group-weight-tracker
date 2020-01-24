
import * as fromWeightEntries from '../actions/weight-entry.actions';
import { WeightEntry } from 'src/app/shared/weight-entry';

export interface WeightState {
    entities: { [id: number]: WeightEntry };
    loaded: boolean;
    loading: boolean;
    selected: WeightEntry;
}

export const initialState: WeightState = {
    entities: {},
    loaded: false,
    loading: false,
    selected: null
};

function getActivityEntities(entries: WeightEntry[]) {
    return entries.reduce(
        (map: { [id: number]: WeightEntry }, entry) => {
            return {
                ... map,
                [entry.id]: entry
            };
    }, {});
}

export function reducer(state: WeightState = initialState, action: fromWeightEntries.WeightEntryActions):
WeightState {
    switch (action.type) {
        case fromWeightEntries.LOAD_WEIGHT_ENTRIES: {
            state.loading = true;
            state.loaded = false;
            return state;
        }
        case fromWeightEntries.LOAD_WEIGHT_ENTRIES_SUCCESS: {
            return {
                ... state,
                loading: false,
                loaded: true,
                entities : getActivityEntities(action.playload)
            };
        }
        case fromWeightEntries.LOAD_WEIGHT_ENTRIES_FAIL: {
            state.loading = false;
            state.loaded = false;
            return state;
        }
        case fromWeightEntries.SELECT_WEIGHT_ENTRIES: {
            return {
                ...state,
                selected: action.playload
            };
        }
        default:
            return state;
    }
}

export const getWeightEntriesLoading = (state: WeightState) => state.loading;
export const getWeightEntriesLoaded = (state: WeightState) => state.loaded;
export const getWeightEntriesEntites = (state: WeightState) => state.entities;

export const getSelectedWeightEntry = (state: WeightState) => state.selected;
