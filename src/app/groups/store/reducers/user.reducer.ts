import * as userActions from '../actions/user.actions';
import { User } from 'src/app/shared/user';

export interface UserState {
    loggedInUser: {
        data: User;
        loaded: boolean;
        loading: boolean;
    };
    searchUsers: {
        data: User[],
        loaded: boolean;
        loading: boolean;
    };
}

export const initialState: UserState = {
    loggedInUser: {
        data: null,
        loaded: false,
        loading: false
    },
    searchUsers: {
        data: [],
        loaded: false,
        loading: false
    }
};


export function reducer(state: UserState = initialState, action: userActions.UserActions):
UserState {
    switch (action.type) {
        case userActions.LOAD_USERS_BY_NAME: {
            state.searchUsers.loading = true;
            state.searchUsers.loaded = false;
            return state;
        }
        case userActions.LOAD_USERS_BY_NAME_SUCCESS: {
            return {
                ... state,
                searchUsers: {
                    loading: false,
                    loaded: true,
                    data : action.playload
                }
            };
        }
        case userActions.LOAD_USERS_BY_NAME_FAIL: {
            state.searchUsers.loading = false;
            state.searchUsers.loaded = false;
            return state;
        }
        default:
            return state;
    }
}

export const getUsersByNameLoading = (state: UserState) => state.searchUsers.loading;
export const getUsersByNameLoaded = (state: UserState) => state.searchUsers.loaded;
export const getUsersByNameData = (state: UserState) => state.searchUsers.data;
