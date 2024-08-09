import { IUser } from "../../Models/user";
import { IUserAPI } from "../../Models/user-api";

//defines the state of the entire app
//the reason for userList: { data: IUser[] }; instead of userList: IUser[]; is to solve
// an error with my angular version with async pipe

export interface IUserListState {
  userList: { data: IUser[] };
  selectedUser: IUserAPI | null;
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success'
}
