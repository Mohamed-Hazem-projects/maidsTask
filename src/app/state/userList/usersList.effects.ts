import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GetDataService } from "../../Services/get-data.service";
import { loadUserList, loadUserListError, loadUserListSuccess, searchByIDFailed, searchByIDInit, searchByIDSuccess } from "./usersList.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class userListEffects {
  constructor(
    private actions$: Actions,
    private service: GetDataService
  ) { }

  //using the stream of actions to  switch to a new stream and make a new action
  // in case of successful call and handle errors in case of a failed call

  loadUserList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserList),
      switchMap((pageNo) =>
        this.service.getUserListPage(pageNo.pageNo).pipe(
          map((userlist) => loadUserListSuccess({ userList: userlist })),
          catchError((error: Error) => of(loadUserListError({ error: error.message }))))
      )
    )
  )
  SearchUserByID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchByIDInit),
      switchMap((ID) =>
        this.service.getUserByID(ID.ID).pipe(
          map((User) => searchByIDSuccess({ User: User })),
          catchError((error: Error) => of(searchByIDFailed({ error: error.message }))))
      )
    )
  )
}
