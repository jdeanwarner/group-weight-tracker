import { WeightEntry } from './../../../shared/weight-entry';
import { Action } from '@ngrx/store';
import { DocumentReference } from '@angular/fire/firestore';

export const LOAD_WEIGHT_ENTRIES = '[home] Load Weight Entries';
export const LOAD_WEIGHT_ENTRIES_SUCCESS = '[home] Load Weight Entries Success';
export const LOAD_WEIGHT_ENTRIES_FAIL = '[home] Load Weight Entries Fail';

export const INSERT_WEIGHT_ENTRIES = '[home] Insert Weight Entries';
export const INSERT_WEIGHT_ENTRIES_SUCCESS = '[home] Insert Weight Entries Success';
export const INSERT_WEIGHT_ENTRIES_FAIL = '[home] Insert Weight Entries Fail';

export const UPDATE_WEIGHT_ENTRIES = '[home] Update Weight Entries';
export const UPDATE_WEIGHT_ENTRIES_SUCCESS = '[home] Update Weight Entries Success';
export const UPDATE_WEIGHT_ENTRIES_FAIL = '[home] Update Weight Entries Fail';

export const DELETE_WEIGHT_ENTRIES = '[home] Delete Weight Entries';
export const DELETE_WEIGHT_ENTRIES_SUCCESS = '[home] Delete Weight Entries Success';
export const DELETE_WEIGHT_ENTRIES_FAIL = '[home] Delete Weight Entries Fail';

export class LoadWeightEntries implements Action {
    readonly type = LOAD_WEIGHT_ENTRIES;
}

export class LoadWeightEntriesSuccess implements Action {
    readonly type = LOAD_WEIGHT_ENTRIES_SUCCESS;

    constructor(public playload: WeightEntry[]) {}
}

export class LoadWeightEntriesFail implements Action {
    readonly type = LOAD_WEIGHT_ENTRIES_FAIL;

    constructor(public playload: any) {}
}

export class InsertWeightEntries implements Action {
    readonly type = INSERT_WEIGHT_ENTRIES;

    constructor(public playload: WeightEntry) {}
}

export class InsertWeightEntriesSuccess implements Action {
    readonly type = INSERT_WEIGHT_ENTRIES_SUCCESS;
    constructor(public playload: DocumentReference) {}
}

export class InsertWeightEntriesFail implements Action {
    readonly type = INSERT_WEIGHT_ENTRIES_FAIL;

    constructor(public playload: any) {}
}

export class UpdateWeightEntries implements Action {
    readonly type = UPDATE_WEIGHT_ENTRIES;

    constructor(public playload: WeightEntry) {}
}

export class UpdateWeightEntriesSuccess implements Action {
    readonly type = UPDATE_WEIGHT_ENTRIES_SUCCESS;
}

export class UpdateWeightEntriesFail implements Action {
    readonly type = UPDATE_WEIGHT_ENTRIES_FAIL;

    constructor(public playload: any) {}
}

export class DeleteWeightEntries implements Action {
    readonly type = DELETE_WEIGHT_ENTRIES;

    constructor(public playload: string) {}
}

export class DeleteWeightEntriesSuccess implements Action {
    readonly type = DELETE_WEIGHT_ENTRIES_SUCCESS;
}

export class DeleteWeightEntriesFail implements Action {
    readonly type = DELETE_WEIGHT_ENTRIES_FAIL;

    constructor(public playload: any) {}
}


export type WeightEntryActions =
    LoadWeightEntries |
    LoadWeightEntriesFail |
    LoadWeightEntriesSuccess |
    InsertWeightEntries |
    InsertWeightEntriesFail |
    InsertWeightEntriesSuccess |
    UpdateWeightEntries |
    UpdateWeightEntriesFail |
    UpdateWeightEntriesSuccess |
    DeleteWeightEntries |
    DeleteWeightEntriesFail |
    DeleteWeightEntriesSuccess;
