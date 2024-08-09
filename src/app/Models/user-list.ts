//represents the API response when asking for the users list
import { IUser } from "./user";

export interface IUserList {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUser[];
  support: {
    url: string;
    text: string;
  }
}
