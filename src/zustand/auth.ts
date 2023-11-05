import axios from "axios";
import { create } from "zustand";
import { NavigateFunction } from "react-router-dom";
import { FormInstance, message } from "antd";
import Cookies from "js-cookie";

import { ROLE, TOKEN } from "../constants";
import { request } from "../server";

interface AuthType {
  isAuthenticated: boolean;
  role: null | string;
  loading: boolean;
  photo: string;
  accountInfo: [];
  callback: boolean;
  login: (form: FormInstance, navigate: NavigateFunction) => void;
  logout: (navigate: NavigateFunction) => void;
  register: (form: FormInstance, navigate: NavigateFunction) => void;
  updateAccount: (form: FormInstance, navigate: NavigateFunction) => void;
  uploadPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updatePassword: (form: FormInstance, navigate: NavigateFunction) => void;
  getAccountInfo: (form: FormInstance) => void;
  setCallback: () => void;
}

const useAuth = create<AuthType>()((set, get) => ({
  isAuthenticated: Boolean(Cookies.get(TOKEN)),
  isLoading: false,
  callback: false,
  role: Cookies.get(ROLE) || null,
  loading: false,
  photo: "",
  accountInfo: [],

  login: async (form, navigate) => {
    try {
      set((state) => ({ ...state, loading: true }));
      const values = await form.validateFields();

      const {
        data: { token, user },
      } = await request.post("auth/login", values);
      Cookies.set(TOKEN, token);
      Cookies.set(ROLE, user.role);
      set((state) => ({ ...state, role: user.role }));
      message.success("You are logged in");
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data.message);
      } else {
        message.error(
          "Something went wrong. Please try again or contact IT department"
        );
      }
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },

  logout: (navigate) => {
    Cookies.remove(TOKEN);
    Cookies.remove(ROLE);
    set((state) => ({ ...state, accountInfo: [] }));
    navigate("/");
  },

  register: async (form, navigate) => {
    try {
      set((state) => ({ ...state, loading: true }));
      const values = await form.validateFields();
      await request.post("auth/register", values);
      message.success("You are registrated successfully");
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data.message);
      } else {
        message.error(
          "Something went wrong. Please try again or contact IT department"
        );
      }
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },

  updateAccount: async (form, navigate) => {
    try {
      const values = await form.validateFields();
      await request.put(`auth/updatedetails`, values);
      set((state) => ({ ...state, loading: true }));
      message.success("Information saved successfully");
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data.message);
      } else {
        message.error(
          "Something went wrong. Please try again or contact IT department"
        );
      }
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },

  uploadPhoto: async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const { data } = await request.post("auth/upload", formData);
      set((state) => ({ ...state, photo: data }));
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

  updatePassword: async (form, navigate) => {
    try {
      const values = await form.validateFields();
      await request.put("auth/updatepassword", values);
      message.success("Password updated");
      navigate("/");
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

  getAccountInfo: async (form) => {
    try {
      const callBack = get().callback;
      const { data } = await request.get("auth/me");
      const newData = { ...data, birthday: data.birthday?.split("T")[0] };
      set((state) => ({ ...state, accountInfo: newData }));
      form.setFieldsValue(newData);
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

  setCallback: () => {
    const callback = get().callback;
    set((state) => ({ ...state, callback: !callback }));
  },
}));

export default useAuth;