// src/api/mutator/custom-instance.ts

import Axios, { type AxiosRequestConfig, AxiosError } from "axios";

// ✅ use backend URL from .env (via VITE_)
export const AXIOS_INSTANCE = Axios.create({
  baseURL: "http://localhost:8000" , // e.g., http://localhost:8000
  withCredentials: true, // 🔑 include cookies (access_token)
});

// add an optional second `options` argument for per-request overrides
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore - React Query needs a cancel method
  promise.cancel = () => {
    source.cancel("Query was cancelled by React Query");
  };

  return promise;
};

// 🔹 Strong typing for errors and request bodies
export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
