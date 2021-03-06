import { UserService } from 'src/app/shared/services/user.service';
import { WeightService } from '../../../shared/services/weight.service';
import { GroupService } from '../../../shared/services/group.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, take, takeLast } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as groupActions from '../actions/group.actions';
import { DocumentReference } from '@angular/fire/firestore';
import { Group } from 'src/app/shared/group';
import { WeightEntry } from 'src/app/shared/weight-entry';
import { User } from 'src/app/shared/user';

@Injectable()
export class GroupEffects {

  constructor(
    private actions$: Actions,
    private groupService: GroupService,
    private weightService: WeightService,
    private userService: UserService
  ) {}

  loadGroups$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(groupActions.LOAD_GROUPS),
      switchMap(() => this.groupService.getGroups()
          .pipe(
            map((groups: Group[]) => new groupActions.LoadGroupsSuccess(groups)),
            catchError(error => of(new groupActions.LoadGroupsFail(error)))
          )
      )
    )
  );

  loadGroupUsers$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(groupActions.LOAD_GROUP_USERS),
    switchMap((action: groupActions.LoadGroupUsers) => {
      console.log('getting users');
      return this.userService.getGroupUsers(action.playload)
        .pipe(
          map((users: User[]) => {
          console.log(users);
          return new groupActions.LoadGroupUsersSuccess(users);
        }), catchError(error => of(new groupActions.LoadGroupsFail(error))));
    }
    )
  )
);

  insertGroup$: Observable<Action> =  createEffect(() => this.actions$.pipe(
      ofType(groupActions.INSERT_GROUP),
      mergeMap((activity: groupActions.InsertGroup) => this.groupService.insertGroup(activity.playload)
          .then( (ref: DocumentReference) => new groupActions.InsertGroupSuccess(ref))
          .catch((error) => new groupActions.InsertGroupFail(error))
      )
    )
  );

  updateGroup$: Observable<Action> =  createEffect(() => this.actions$.pipe(
      ofType(groupActions.UPDATE_GROUP),
      mergeMap((activity: groupActions.UpdateGroup) => this.groupService.updateGroup(activity.playload)
          .then( () => new groupActions.UpdateGroupSuccess())
          .catch((error) => new groupActions.UpdateGroupFail(error))
      )
    )
  );

  deleteGroup$: Observable<Action> =  createEffect(() => this.actions$.pipe(
      ofType(groupActions.DELETE_GROUP),
      mergeMap((activity: groupActions.DeleteGroup) => this.groupService.deleteGroup(activity.playload)
          .then( () => new groupActions.DeleteGroupSuccess())
          .catch((error) => new groupActions.DeleteGroupFail(error))
      )
    )
  );

  loadWeightEntriesForGroup$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(groupActions.LOAD_WEIGHT_ENTRIES_FOR_GROUP),
    switchMap((action: groupActions.LoadWeightEntriesForGroup) => {
      return this.weightService.getWeightEntriesForGroup(action.playload)
        .pipe(
          map((weightEntries: WeightEntry[]) => (new groupActions.LoadWeightEntriesForGroupSuccess(weightEntries))),
          catchError(error => {
              console.log(error);
              return of(new groupActions.LoadWeightEntriesForGroupFail(error));
          })
        );
      }
    )
  )
  );

  countWeightEntriesForGroup$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(groupActions.COUNT_WEIGHT_ENTRIES_FOR_GROUP),
    switchMap((action: groupActions.CountWeightEntriesForGroup) => {
      return this.weightService.countWeightEntriesForGroup(action.playload)
        .pipe(
          map((count: number) => (new groupActions.CountWeightEntriesForGroupSuccess(count))),
          catchError(error => of(new groupActions.CountWeightEntriesForGroupFail(error)))
        );
      }
    )
  )
  );
}
