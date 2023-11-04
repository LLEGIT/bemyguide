import axios, { AxiosError, HttpStatusCode } from "axios";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import { Routes } from "./routes";
import { CommonToastError, CommonToastErrorWithTitle } from "./toast";

export type ApiError = AxiosError | unknown;
export const errorHandler = (error: ApiError, showToast?: boolean) => {
  if (axios.isAxiosError(error)) {
    handleAxiosError(error, showToast);
  } else {
    handleApiError(error as any, showToast);
  }
};

const handleAxiosError = (error: AxiosError, showToast?: boolean) => {
  if (error.response) {
    const httpStatusCode = error.response.status;
    const errorData: any = error.response.data;

    if (errorData.error_code) {
      CommonToastErrorWithTitle(errorData.error_code, showToast);
      return;
    }

    switch (httpStatusCode) {
      case HttpStatusCode.Unauthorized:
        if (typeof errorData === "string") {
          if (errorData.includes("No user found")) {
            CommonToastErrorWithTitle(
              "toast_error_user_wrong_login",
              showToast
            );
          } else if (errorData.includes("Wrong password combination")) {
            CommonToastErrorWithTitle(
              "toast_error_user_wrong_password",
              showToast
            );
          }
        } else {
          CommonToastErrorWithTitle("toast_error_unauthorized", showToast);
        }
        break;
      case HttpStatusCode.Forbidden:
        if (errorData?.message === "user already exists") {
          CommonToastErrorWithTitle(
            "toast_error_user_taken_username",
            showToast
          );
        } else if (errorData.keyValue) {
          if (errorData.keyValue.hasOwnProperty("username")) {
            CommonToastErrorWithTitle(
              "toast_error_user_taken_username",
              showToast
            );
          } else if (errorData.keyValue.hasOwnProperty("email")) {
            CommonToastErrorWithTitle(
              "toast_error_user_taken_email",
              showToast
            );
          } else if (errorData.keyValue.hasOwnProperty("phone_nb")) {
            CommonToastErrorWithTitle(
              "toast_error_user_taken_phone_nb",
              showToast
            );
          } else {
            CommonToastError(showToast);
          }
        } else {
          CommonToastError(showToast);
        }
        break;
      default:
        CommonToastError(showToast);
    }
  } else if (error.message === "Network Error") {
    if (!window.location.href.includes("/error")) {
      CommonToastErrorWithTitle("toast_error_network_error", showToast);
      return (window.location.href = Routes.Error);
    }
    return;
  } else {
    CommonToastError(showToast);
  }
};

const handleApiError = (error: any, showToast?: boolean) => {
  CommonToastErrorWithTitle(error.error_code, showToast);
};

export const is404Error = (error?: ApiError) =>
  axios.isAxiosError(error) &&
  (error as AxiosError).response?.status === HttpStatusCode.NotFound;
