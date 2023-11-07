import axios from "axios";
import Cookies from "js-cookie";

import { TOKEN } from "../constants";
import { message } from "antd";

export const request = axios.create({
  baseURL: "https://ap-portfolio-backend.up.railway.app/api/v1",
  timeout: 10000,
  headers: { Authorization: `Bearer ${Cookies.get(TOKEN)}` },
});

request.interceptors.response.use(
  async (response) => {
    return response;
  },
  (err) => {
    message.error(err.response.data.message);
    return Promise.reject(err);
  }
);
