import { User } from './../../../shared/user';
import { Action } from '@ngrx/store';

export const LOAD_USERS_BY_NAME = '[user] Load Users by Name';
export const LOAD_USERS_BY_NAME_SUCCESS = '[user] Load Users by Name Success';
export const LOAD_USERS_BY_NAME_FAIL = '[user] Load User by Name Fail';


export class LoadUsersByName implements Action {
    readonly type = LOAD_USERS_BY_NAME;
    constructor(public playload: string) {}
}

export class LoadUsersByNameSuccess implements Action {
    readonly type = LOAD_USERS_BY_NAME_SUCCESS;

    constructor(public playload: User[]) {}
}

export class LoadUsersByNameFail implements Action {
    readonly type = LOAD_USERS_BY_NAME_FAIL;

    constructor(public playload: any) {}
}


export type UserActions =
    LoadUsersByName |
    LoadUsersByNameSuccess |
    LoadUsersByNameFail;
