import {USER_TOKEN} from "../config/constants";

export const isLoggedIn = () => {
  if (typeof window !== undefined) {
    const token = localStorage.getItem(USER_TOKEN);
    return !!token;
  }
}
