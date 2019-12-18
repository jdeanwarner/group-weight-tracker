import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromGroups from '../reducers/group.reducer';

export const getGroupState = createSelector(
    fromFeature.getGroupsState,
    (state: fromFeature.GroupsState) => state.groups
);

export const getGroupsEntities = createSelector(getGroupState, fromGroups.getGroupsEntities);

export const getAllGroupEntries = createSelector(
    getGroupsEntities,
    (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    }
);

export const getGroup = ( id: string ) => createSelector(
    getGroupsEntities,
    (entities) => entities[id]
);


export const getGroupsLoading = createSelector(getGroupState, fromGroups.getGroupsLoading);
export const getGroupsLoaded = createSelector(getGroupState, fromGroups.getGroupsLoaded);

export const getGroupUserEntities = createSelector(getGroupState, fromGroups.getGroupUsersEntities);

export const getAllGroupUsers = createSelector(
    getGroupUserEntities,
    (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    }
);


export const getGroupUsersLoading = createSelector(getGroupState, fromGroups.getGroupUsersLoading);
export const getGroupUsersLoaded = createSelector(getGroupState, fromGroups.getGroupUsersLoaded);

export const getSelectedGroup = createSelector(getGroupState, fromGroups.getSelectedGroup);

export const getWeightEntriesEntities = createSelector(getGroupState, fromGroups.getWeightEntriesEntities);

export const getAllWeightEntries = createSelector(
    getWeightEntriesEntities,
    (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    }
);

export const getWeightEntriesLoading = createSelector(getGroupState, fromGroups.getWeightEntriesLoading);
export const getWeightEntriesLoaded = createSelector(getGroupState, fromGroups.getWeightEntriesLoaded);
