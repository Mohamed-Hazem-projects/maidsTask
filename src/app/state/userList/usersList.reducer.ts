import { createReducer, on } from "@ngrx/store";
import { loadUserList, loadUserListError, loadUserListSuccess, noSearch, searchByIDFailed, searchByIDInit, searchByIDSuccess } from "./usersList.actions";
import { IUserListState } from "./usersList.state";
import { IUser } from "../../Models/user";

export const initialState: IUserListState = {
  userList: { data: [] as IUser[] },
  selectedUser: null,
  totalUsers: 0,
  totalPages: 0,
  currentPage: 0,
  error: null,
  status: "pending"
}

export const userListReducer = createReducer(
  initialState,
  on(loadUserList, (state) => ({
    ...state,
    status: 'loading' as const
  })),

  on(loadUserListSuccess, (state, { userList }) => ({
    ...state,
    userList: { data: userList.data },
    totalUsers: userList.total,
    totalPages: userList.total_pages,
    currentPage: userList.page,
    error: null,
    status: 'success' as const
  })),

  on(loadUserListError, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as const
  })),

  on(searchByIDInit, (state) => ({
    ...state,
    status: 'loading' as const
  })),

  on(noSearch, (state) => ({
    ...state,
    selectedUser: null,
    status: 'pending' as const
  })),

  on(searchByIDSuccess, (state, { User }) => ({
    ...state,
    selectedUser: User,
    error: null,
    status: 'success' as const
  })),

  on(searchByIDFailed, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as const
  })),
)
