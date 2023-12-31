import { create } from "zustand";
import { NavigateFunction } from "react-router-dom";
import { FormInstance, message } from "antd";
import Cookies from "js-cookie";

import { ROLE, TOKEN, USER_ID } from "../constants";
import { request } from "../server";

type AccountInfo = {
  photo?: string;
};

interface AuthType {
  isAuthenticated: boolean;
  role: null | string;
  loading: boolean;
  photo: string;
  accountInfo: AccountInfo[];
  login: (form: FormInstance, navigate: NavigateFunction) => void;
  logout: (navigate: NavigateFunction) => void;
  register: (form: FormInstance, navigate: NavigateFunction) => void;
  updateAccount: (form: FormInstance, navigate: NavigateFunction) => void;
  // uploadPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updatePassword: (form: FormInstance, navigate: NavigateFunction) => void;
  getAccountInfo: (form: FormInstance) => void;
}

const useAuth = create<AuthType>()((set) => ({
  isAuthenticated: Boolean(Cookies.get(TOKEN)),
  isLoading: false,
  role: Cookies.get(ROLE) || null,
  loading: false,
  photo: "",
  accountInfo: [],

  login: async (form, navigate) => {
    try {
      const values = await form.validateFields();
      const {
        data: { token, user },
      } = await request.post("auth/login", values);
      set({ loading: true });
      Cookies.set(TOKEN, token);
      Cookies.set(ROLE, user.role);
      Cookies.set(USER_ID, user._id);
      set({ role: user.role });
      request.defaults.headers.Authorization = `Bearer ${token}`;
      message.success("You are logged in");
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } finally {
      set({ loading: false });
    }
  },

  logout: (navigate) => {
    Cookies.remove(TOKEN);
    Cookies.remove(ROLE);
    Cookies.remove(USER_ID);
    set({ accountInfo: [], role: null });
    navigate("/");
  },

  register: async (form, navigate) => {
    try {
      set({ loading: true });
      const values = await form.validateFields();
      await request.post("auth/register", values);
      message.success("You are registrated successfully");
      navigate("/login");
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },

  updateAccount: async (form, navigate) => {
    try {
      const values = await form.validateFields();
      await request.put(`auth/updatedetails`, values);
      set({ loading: true });
      message.success("Information saved successfully");
      navigate("/");
    } finally {
      set({ loading: false });
    }
  },

  // uploadPhoto: async (e) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", e.target.files[0]);
  //     const { data } = await request.post("auth/upload", formData);
  //     set((state) => ({ ...state, photo: data }));
  //   } catch (err) {
  //     if (axios.isAxiosError(err)) {
  //       message.error(err.response?.data.message);
  //     } else {
  //       message.error(
  //         "Something went wrong. Please try again or contact IT department"
  //       );
  //     }
  //   }
  // },

  updatePassword: async (form, navigate) => {
    const values = await form.validateFields();
    await request.put("auth/updatepassword", values);
    message.success("Password updated");
    navigate("/");
  },

  getAccountInfo: async (form) => {
    const { data } = await request.get("auth/me");
    const newData = { ...data, birthday: data.birthday?.split("T")[0] };
    set({ accountInfo: newData });
    form.setFieldsValue(newData);
  },
}));

export default useAuth;
