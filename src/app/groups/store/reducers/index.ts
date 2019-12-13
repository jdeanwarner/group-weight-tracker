import * as fromWeightEntry from './group.reducer';
import * as fromUsers from './user.reducer';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

export interface GroupsState {
    groups: fromWeightEntry.GroupState;
    users: fromUsers.UserState;
}

export const reducers: ActionReducerMap<GroupsState> = {
    groups : fromWeightEntry.reducer,
    users: fromUsers.reducer
};

export const getGroupsState = createFeatureSelector<GroupsState>('groups');
