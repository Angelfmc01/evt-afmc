import axios from "axios";
import type { AxiosRequestConfig } from "axios";
const API_URL = "http://localhost:3000/v1";

const getToken = () => sessionStorage.getItem("token")

export const makeRequest = async <T, TData>(
  endpoint: string,
  method: "GET" | "POST" | "PUT",
  data?: TData,
  responseType: "json" = "json",
): Promise<T> => {
  try {

    const config: AxiosRequestConfig = {
        method,
        url: `${API_URL}/${endpoint}`,
        data,
        responseType,
        headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: "application/json",
        }
    }

    const response = await axios(config)
    return response.data

  } catch (error: unknown) {
    console.error(`Error en ${method} ${endpoint}:`, error);
    if (axios.isAxiosError(error)) {
      return error.response?.data as T;
    } else {
      throw new Error("Error de conexión o inesperado");
    }
  }
};
