import { ROLE, USER_ID } from "../constants";
import Cookies from "js-cookie";

export const getCookiesData = () => {
  const role = Cookies.get(ROLE);
  const userId = Cookies.get(USER_ID);

  return { role, userId };
};
