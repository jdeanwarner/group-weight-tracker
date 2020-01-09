import { User } from './../../../shared/user';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}

  loadUsersByName$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(userActions.LOAD_USERS_BY_NAME),
      switchMap((action: userActions.LoadUsersByName) => {
        return this.userService.getUsersByName(action.playload)
          .pipe(
            map((users: User[]) => (new userActions.LoadUsersByNameSuccess(users))),
            catchError(error => {
                console.log(error);
                return of(new userActions.LoadUsersByNameFail(error));
            })
          );
        }
      )
    )
  );
}
