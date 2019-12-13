import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromGroups from '../reducers/group.reducer';

export const getGroupState = createSelector(
    fromFeature.getGroupsState,
    (state: fromFeature.GroupsState) => state.groups
);

export const getGroupsData = createSelector(getGroupState, fromGroups.getGroupsData);


export const getGroupsLoading = createSelector(getGroupState, fromGroups.getGroupsLoading);
export const getGroupsLoaded = createSelector(getGroupState, fromGroups.getGroupsLoaded);
