import { message } from "antd";
import axios from "axios";
import { create } from "zustand";
import { request } from "../server";

interface NotificationType {
  search: string,
  isFetching: boolean,
  users: [],
  page: number,
  notification: boolean,
  getUsers: () => void;
  setNotification: (bool: boolean) => void;
  setPage: (number: number) => void,
  handleSearch: (value: string) => void;
  upgradeToClient: (id: string) => void;
}

const useNotification = create<NotificationType>()((set) => ({
  isFetching: false,
  notification: false,
  search: "",
  page: 1,
  users: [],
  getUsers: async() => {
    try {
      const {data} = await request.get("users");
      set((state) => ({...state, users: data}))
    } catch (err) {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data.message);
      } else {
        message.error(
          "Something went wrong. Please try again or contact IT department"
        );
      }
    }
  },
  setNotification: () => {},
  setPage: () => {},
  handleSearch: () => {},
  upgradeToClient: () => {},
}));

export default useNotification;