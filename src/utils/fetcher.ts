import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ApiError, errorHandler } from "./errorHandler";

export enum Method {
  POST = "post",
  GET = "get",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export interface CommonApiResponse<T> {
  status: number;
  data: T;
}

interface FetcherProps extends AxiosRequestConfig {
  url: string;
  method: Method;
  postBody?: any;
}

const fetcherBase = async <T>({
  url,
  method,
  postBody,
  ...props
}: FetcherProps): Promise<T> => {
  const config: AxiosRequestConfig<any> = {
    url: url,
    method: method,
    data: postBody || {},
    validateStatus: function (status) {
      return status >= 200 && status < 300;
    },
    ...props,
  };
  const res = await axios.request<T>(config);
  if (!res) {
    throw AxiosError.ERR_NETWORK;
  }
  return res as T;
};

const fetchWithErrorHandler = async <T>(props: FetcherProps) => {
  try {
    return await fetcherBase<T>(props);
  } catch (ex) {
    errorHandler(ex as ApiError, true);
    throw ex;
  }
};

export const transformToFormData = (data: any): FormData => {
  const formData = new FormData();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }

  return formData;
}

export const commonFetcher = <T>(props: FetcherProps) =>
  fetchWithErrorHandler<T>(props);
