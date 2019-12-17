import { WeightEntry } from './../../../shared/weight-entry';
import { Action } from '@ngrx/store';
import { DocumentReference } from '@angular/fire/firestore';
import { Group } from 'src/app/shared/group';

export const LOAD_WEIGHT_ENTRIES = '[weight] Load Weight Entries';
export const LOAD_WEIGHT_ENTRIES_SUCCESS = '[weight] Load Weight Entries Success';
export const LOAD_WEIGHT_ENTRIES_FAIL = '[weight] Load Weight Entries Fail';

export const INSERT_WEIGHT_ENTRIES = '[weight] Insert Weight Entries';
export const INSERT_WEIGHT_ENTRIES_SUCCESS = '[weight] Insert Weight Entries Success';
export const INSERT_WEIGHT_ENTRIES_FAIL = '[weight] Insert Weight Entries Fail';

export const UPDATE_WEIGHT_ENTRIES = '[weight] Update Weight Entries';
export const UPDATE_WEIGHT_ENTRIES_SUCCESS = '[weight] Update Weight Entries Success';
export const UPDATE_WEIGHT_ENTRIES_FAIL = '[weight] Update Weight Entries Fail';

export const DELETE_WEIGHT_ENTRIES = '[weight] Delete Weight Entries';
export const DELETE_WEIGHT_ENTRIES_SUCCESS = '[weight] Delete Weight Entries Success';
export const DELETE_WEIGHT_ENTRIES_FAIL = '[weight] Delete Weight Entries Fail';

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

export class InsertWeightEntry implements Action {
    readonly type = INSERT_WEIGHT_ENTRIES;

    constructor(public playload: WeightEntry) {}
}

export class InsertWeightEntrySuccess implements Action {
    readonly type = INSERT_WEIGHT_ENTRIES_SUCCESS;
    constructor(public playload: DocumentReference) {}
}

export class InsertWeightEntryFail implements Action {
    readonly type = INSERT_WEIGHT_ENTRIES_FAIL;

    constructor(public playload: any) {}
}

export class UpdateWeightEntry implements Action {
    readonly type = UPDATE_WEIGHT_ENTRIES;

    constructor(public playload: WeightEntry) {}
}

export class UpdateWeightEntrySuccess implements Action {
    readonly type = UPDATE_WEIGHT_ENTRIES_SUCCESS;
}

export class UpdateWeightEntryFail implements Action {
    readonly type = UPDATE_WEIGHT_ENTRIES_FAIL;

    constructor(public playload: any) {}
}

export class DeleteWeightEntry implements Action {
    readonly type = DELETE_WEIGHT_ENTRIES;

    constructor(public playload: string) {}
}

export class DeleteWeightEntrySuccess implements Action {
    readonly type = DELETE_WEIGHT_ENTRIES_SUCCESS;
}

export class DeleteWeightEntryFail implements Action {
    readonly type = DELETE_WEIGHT_ENTRIES_FAIL;

    constructor(public playload: any) {}
}


export type WeightEntryActions =
    LoadWeightEntries |
    LoadWeightEntriesFail |
    LoadWeightEntriesSuccess |
    InsertWeightEntry |
    InsertWeightEntryFail |
    InsertWeightEntrySuccess |
    UpdateWeightEntry |
    UpdateWeightEntryFail |
    UpdateWeightEntrySuccess |
    DeleteWeightEntry |
    DeleteWeightEntryFail |
    DeleteWeightEntrySuccess;
