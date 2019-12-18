import { User } from 'src/app/shared/user';
import { Group } from './../../../shared/group';

import * as groupActions from '../actions/group.actions';
import { WeightEntry } from 'src/app/shared/weight-entry';

export interface GroupState {
    list: {
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
    users: {
        entities: { [userId: string]: User };
        loaded: boolean;
        loading: boolean;
    };
}

export const initialState: GroupState = {
    list: {
        entities: {},
        loaded: false,
        loading: false
    },
    selected : null,
    entries: {
        entities: {},
        loaded: false,
        loading: false
    },
    users: {
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
            state.list.loading = true;
            state.list.loaded = false;
            return state;
        }
        case groupActions.LOAD_GROUPS_SUCCESS: {
            return {
                ... state,
                list: {
                    loading: false,
                    loaded: true,
                    entities : action.playload.reduce(
                        (map: { [id: number]: Group }, group) => {
                            return {
                                ... map,
                                [group.id]: group
                            };
                    }, {})
                }
            };
        }
        case groupActions.LOAD_GROUPS_FAIL: {
            state.list.loading = false;
            state.list.loaded = false;
            return state;
        }
        case groupActions.LOAD_GROUP_USERS: {
            state.users.loading = true;
            state.users.loaded = false;
            return state;
        }
        case groupActions.LOAD_GROUP_USERS_SUCCESS: {
            return {
                ... state,
                users: {
                    loading: false,
                    loaded: true,
                    entities : action.playload.reduce(
                        (map: { [id: number]: User }, user) => {
                            return {
                                ... map,
                                [user.uid]: user
                            };
                    }, {})
                }
            };
        }
        case groupActions.LOAD_GROUPS_FAIL: {
            state.users.loading = false;
            state.users.loaded = false;
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

export const getGroupsLoading = (state: GroupState) => state.list.loading;
export const getGroupsLoaded = (state: GroupState) => state.list.loaded;
export const getGroupsEntities = (state: GroupState) => state.list.entities;

export const getGroupUsersLoading = (state: GroupState) => state.users.loading;
export const getGroupUsersLoaded = (state: GroupState) => state.users.loaded;
export const getGroupUsersEntities = (state: GroupState) => state.users.entities;

export const getSelectedGroup = (state: GroupState) => state.selected;

export const getWeightEntriesLoading = (state: GroupState) => state.entries.loading;
export const getWeightEntriesLoaded = (state: GroupState) => state.entries.loaded;
export const getWeightEntriesEntities = (state: GroupState) => state.entries.entities;
