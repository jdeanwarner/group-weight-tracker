import { Group } from './../../../shared/group';

import * as groupActions from '../actions/group.actions';
import { WeightEntry } from 'src/app/shared/weight-entry';

export interface GroupState {
    info: {
        entities: { [userId: string]: Group };
        loaded: boolean;
        loading: boolean;
    };
    selected: Group;
    entries: {
        entities: { [userId: string]: WeightEntry[] };
        loaded: boolean;
        loading: boolean;
    };
}

export const initialState: GroupState = {
    info: {
        entities: {},
        loaded: false,
        loading: false
    },
    selected : null,
    entries: {
        entities: {},
        loaded: false,
        loading: false
    }
};

function getGroupEntities(entries: WeightEntry[]): { [userId: string]: WeightEntry[] } {
    const userMap: { [userId: string]: WeightEntry[] } = {};
    entries.forEach((entry: WeightEntry) => {
        if (!userMap[entry.uid]) {
            userMap[entry.uid] = [];
        }

        userMap[entry.uid].push(entry);
    });
    return userMap;
}

export function reducer(state: GroupState = initialState, action: groupActions.GroupActions): GroupState {
    switch (action.type) {
        case groupActions.LOAD_GROUPS: {
            state.info.loading = true;
            state.info.loaded = false;
            return state;
        }
        case groupActions.LOAD_GROUPS_SUCCESS: {
            return {
                ... state,
                info: {
                    loading: false,
                    loaded: true,
                    entities : action.playload.reduce(
                        (map: { [id: number]: WeightEntry }, entry) => {
                            return {
                                ... map,
                                [entry.id]: entry
                            };
                    }, {})
                }
            };
        }
        case groupActions.LOAD_GROUPS_FAIL: {
            state.info.loading = false;
            state.info.loaded = false;
            return state;
        }
        case groupActions.SELECT_GROUP : {
            state.selected = action.playload;
            return state;
        }
        case groupActions.LOAD_WEIGHT_ENTRIES_FOR_GROUP: {
            state.entries.loading = true;
            state.entries.loaded = false;
            return state;
        }
        case groupActions.LOAD_WEIGHT_ENTRIES_FOR_GROUP_SUCCESS: {
            return {
                ... state,
                entries: {
                    loading: false,
                    loaded: true,
                    entities : getGroupEntities(action.playload)
                }
            };
        }
        case groupActions.LOAD_WEIGHT_ENTRIES_FOR_GROUP_FAIL: {
            state.entries.loading = false;
            state.entries.loaded = false;
            return state;
        }
        default:
            return state;
    }
}

export const getGroupsLoading = (state: GroupState) => state.info.loading;
export const getGroupsLoaded = (state: GroupState) => state.info.loaded;
export const getGroupsEntities = (state: GroupState) => state.info.entities;

export const getSelectedGroup = (state: GroupState) => state.selected;

export const getWeightEntriesLoading = (state: GroupState) => state.entries.loading;
export const getWeightEntriesLoaded = (state: GroupState) => state.entries.loaded;
export const getWeightEntriesEntities = (state: GroupState) => state.entries.entities;
