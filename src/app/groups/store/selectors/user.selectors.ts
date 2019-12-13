import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUser from '../reducers/user.reducer';

export const getUserState = createSelector(
    fromFeature.getGroupsState,
    (state: fromFeature.GroupsState) => state.users
);

export const getUserByNameData = createSelector(getUserState, fromUser.getUsersByNameData);


export const getUserByNameLoading = createSelector(getUserState, fromUser.getUsersByNameLoading);
export const getUserByNameLoaded = createSelector(getUserState, fromUser.getUsersByNameLoaded);
