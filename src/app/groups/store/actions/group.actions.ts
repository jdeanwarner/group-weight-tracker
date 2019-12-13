import { WeightEntry } from '../../../shared/weight-entry';
import { Action } from '@ngrx/store';
import { DocumentReference } from '@angular/fire/firestore';

export const LOAD_GROUPS = '[groups] Load Groups';
export const LOAD_GROUPS_SUCCESS = '[groups] Load Groups Success';
export const LOAD_GROUPS_FAIL = '[groups] Load Groups Fail';

export const INSERT_GROUP = '[groups] Insert Group';
export const INSERT_GROUP_SUCCESS = '[groups] Insert Group Success';
export const INSERT_GROUP_FAIL = '[groups] Insert Group Fail';

export const UPDATE_GROUP = '[groups] Update Group';
export const UPDATE_GROUP_SUCCESS = '[groups] Update Group Success';
export const UPDATE_GROUP_FAIL = '[groups] Update Group Fail';

export const DELETE_GROUP = '[groups] Delete Group';
export const DELETE_GROUP_SUCCESS = '[groups] Delete Group Success';
export const DELETE_GROUP_FAIL = '[groups] Delete Group Fail';

export class LoadGroups implements Action {
    readonly type = LOAD_GROUPS;
}

export class LoadGroupsSuccess implements Action {
    readonly type = LOAD_GROUPS_SUCCESS;

    constructor(public playload: any[]) {}
}

export class LoadGroupsFail implements Action {
    readonly type = LOAD_GROUPS_FAIL;

    constructor(public playload: any) {}
}

export class InsertGroup implements Action {
    readonly type = INSERT_GROUP;

    constructor(public playload: any) {}
}

export class InsertGroupSuccess implements Action {
    readonly type = INSERT_GROUP_SUCCESS;
    constructor(public playload: DocumentReference) {}
}

export class InsertGroupFail implements Action {
    readonly type = INSERT_GROUP_FAIL;

    constructor(public playload: any) {}
}

export class UpdateGroup implements Action {
    readonly type = UPDATE_GROUP;

    constructor(public playload: any) {}
}

export class UpdateGroupSuccess implements Action {
    readonly type = UPDATE_GROUP;
}

export class UpdateGroupFail implements Action {
    readonly type = UPDATE_GROUP;

    constructor(public playload: any) {}
}

export class DeleteGroup implements Action {
    readonly type = DELETE_GROUP;

    constructor(public playload: string) {}
}

export class DeleteGroupSuccess implements Action {
    readonly type = DELETE_GROUP_SUCCESS;
}

export class DeleteGroupFail implements Action {
    readonly type = DELETE_GROUP_FAIL;

    constructor(public playload: any) {}
}


export type GroupActions =
    LoadGroups |
    LoadGroupsFail |
    LoadGroupsSuccess |
    InsertGroup |
    InsertGroupFail |
    InsertGroupSuccess |
    UpdateGroup |
    UpdateGroupFail |
    UpdateGroupSuccess |
    DeleteGroup |
    DeleteGroupFail |
    DeleteGroupSuccess;
