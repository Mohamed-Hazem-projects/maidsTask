import { createAction, props } from "@ngrx/store";
import { IUserList } from "../../Models/user-list";
import { IUserAPI } from "../../Models/user-api";

//load the user list from the API
export const loadUserList = createAction(
  '[users-list] load users initiated',
  props<{ pageNo: number }>()
);

export const loadUserListSuccess = createAction(
  '[users-list] load users succeeded',
  props<{ userList: IUserList }>()
);

export const loadUserListError = createAction(
  '[users-list] load users failed',
  props<{ error: string }>()
);

//load a user from the API by ID
export const searchByIDInit = createAction(
  '[header][search] search for user',
  props<{ ID: number }>()
);

//to set selectedUser from state to null
export const noSearch = createAction(
  '[header][search] remove searched user'
);

export const searchByIDSuccess = createAction(
  '[header][search] search for user succeeded',
  props<{ User: IUserAPI }>()
);

export const searchByIDFailed = createAction(
  '[header][search] search for user failed',
  props<{ error: string }>()
);
