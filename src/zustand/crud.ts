import { NavigateFunction } from "react-router-dom";
import { FormInstance } from "antd";

import { create } from "zustand";

import { LIMIT } from "../constants";
import { request } from "../server";
import { AxiosResponse } from "axios";
import { getCookiesData } from "../utils/updateCookies";
import { PhotoType } from "../types/portfolios";

const crud = <T>(url: string) => {
  interface DataState {
    search: string;
    total: number;
    totalUsers: number;
    loading: boolean;
    data: T[] | null | any;
    sortedUsers: T[] | null | any;
    selected: null | string;
    isModalLoading: boolean;
    isModalOpen: boolean;
    page: number;
    photo: AxiosResponse | PhotoType | null;
    uploadPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearch: (
      e: React.ChangeEvent<HTMLInputElement>,
      navigate: NavigateFunction
    ) => void;
    showModal: (form: FormInstance) => void;
    editData: (form: FormInstance, id: string) => void;
    deleteData: (id: string) => void;
    handleOk: (form: FormInstance) => void;
    closeModal: () => void;
    getData: () => void;
    handlePage: (page: number, navigate: NavigateFunction) => void;
  }
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page") || 1;
  const search = params.get("search");

  return create<DataState>()((set, get) => {
    return {
      search: search || "",
      total: 0,
      totalUsers: 0,
      loading: false,
      data: [],
      sortedUsers: [],
      selected: null,
      isModalLoading: false,
      isModalOpen: false,
      page: +page,
      photo: null,

      handlePage: (page, navigate) => {
        const { search, getData } = get();
        set({ page });
        getData();

        const query = new URLSearchParams();

        query.append("page", page.toString());
        query.append("search", search);

        navigate(`/${url}?` + query);
      },

      getData: async () => {
        try {
          const { userId, role } = await getCookiesData();
          const { search, page } = get();
          const params = { search };

          set({ loading: true });

          const {
            data: { pagination },
          } = await request.get(
            role === "admin" ? url : `${url}?user=${userId}`,
            {
              params,
            }
          );

          const { data } = await request.get(
            role === "admin" ? url : `${url}?user=${userId}`,
            {
              params: { ...params, page, limit: LIMIT },
            }
          );

          set({ data, total: pagination.total });
        } finally {
          set({ loading: false });
        }
      },

      handleSearch: (e, navigate) => {
        set({ search: e.target.value, page: 1 });

        const query = new URLSearchParams();

        query.append("page", page.toString());
        query.append("search", e.target.value);

        navigate(`/${url}?` + query);

        get().getData();
      },

      showModal: (form) => {
        set({ isModalOpen: true, selected: null });
        form.resetFields();
      },

      editData: async (form, id) => {
        try {
          set((state) => ({
            ...state,
            selected: id,
            loading: true,
            isModalOpen: true,
          }));
          const { data } = await request.get(`${url}/${id}`);
          form.setFieldsValue({
            ...data,
            startDate: data?.startDate?.split("T")[0],
            endDate: data?.endDate?.split("T")[0],
          });
        } finally {
          set((state) => ({ ...state, selected: id, loading: false }));
        }
      },

      deleteData: async (id) => {
        try {
          set({
            loading: true,
          });
          await request.delete(`${url}/${id}`);
          await get().getData();
        } finally {
          set({
            loading: false,
          });
        }
      },

      handleOk: async (form) => {
        try {
          const { selected, photo } = get();
          const values = await form.validateFields();
          values.photo = photo;

          set({
            isModalLoading: true,
          });

          if (selected === null) {
            await request.post(url, values);
          } else {
            await request.put(`${url}/${selected}`, values);
          }

          set({ isModalOpen: false });
          get().getData();
          form.resetFields();
        } finally {
          set({ isModalLoading: false });
        }
      },

      closeModal: () => {
        set((state) => ({ ...state, isModalOpen: false }));
      },

      uploadPhoto: async (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        formData.append("file", file);
        const {data} = await request.post("upload", formData);
        set({ photo: data });
      },
    };
  });
};

export default crud;
