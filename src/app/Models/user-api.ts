//represents the API response when asking for a single user

import { IUser } from "./user";

export interface IUserAPI {
  data: IUser;
  support: {
    url: string;
    text: string;
  }
}
