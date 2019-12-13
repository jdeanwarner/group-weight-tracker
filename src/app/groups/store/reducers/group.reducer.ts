import { Group } from './../../../shared/group';

import * as groupActions from '../actions/group.actions';

export interface GroupState {
    data: Group[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: GroupState = {
    data: [],
    loaded: false,
    loading: false
};

export function reducer(state: GroupState = initialState, action: groupActions.GroupActions):
GroupState {
    switch (action.type) {
        case groupActions.LOAD_GROUPS: {
            state.loading = true;
            state.loaded = false;
            return state;
        }
        case groupActions.LOAD_GROUPS_SUCCESS: {
            return {
                ... state,
                loading: false,
                loaded: true,
                data : action.playload
            };
        }
        case groupActions.LOAD_GROUPS_FAIL: {
            state.loading = false;
            state.loaded = false;
            return state;
        }
        default:
            return state;
    }
}

export const getGroupsLoading = (state: GroupState) => state.loading;
export const getGroupsLoaded = (state: GroupState) => state.loaded;
export const getGroupsData = (state: GroupState) => state.data;
