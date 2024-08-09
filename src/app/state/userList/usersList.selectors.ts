import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUserListState } from "./usersList.state";

export const selectUserListFromState = createFeatureSelector<IUserListState>('usersList')

export const selectUserList = createSelector(
  selectUserListFromState,
  (state: IUserListState) => state.userList
)

export const selectUserByID = createSelector(
  selectUserListFromState,
  (state: IUserListState) => state.selectedUser
)

export const selectStatus = createSelector(
  selectUserListFromState,
  (state: IUserListState) => state.status
)

export const selectCurrentPage = createSelector(
  selectUserListFromState,
  (state: IUserListState) => state.currentPage
)

export const selectTotalUsers = createSelector(
  selectUserListFromState,
  (state: IUserListState) => state.totalUsers
)

export const selectTotalPages = createSelector(
  selectUserListFromState,
  (state: IUserListState) => state.totalPages
)

export const selectError = createSelector(
  selectUserListFromState,
  (state: IUserListState) => state.error
)

