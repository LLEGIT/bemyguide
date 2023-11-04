"use client";
import {
  User,
  UserLogin,
  UserProfile,
  UserRegister,
} from "@/Models/User/UserModel";
import { ApiUrls, apiUrl } from "@/Configs/ApiConfigs";
import { CommonApiResponse, Method, commonFetcher, transformToFormData } from "@/utils/fetcher";
import {
  CommonToastError,
  CommonToastErrorWithTitle,
  CommonToastSuccessWithTitle,
} from "@/utils/toast";
import { validateFileImageType } from "@/utils/validators";

export class UserViewModel {
  static async onSave(user: UserRegister): Promise<null | "success"> {
    if (user.password !== user.confirm_password) {
      CommonToastErrorWithTitle("toast_error_user_password_notEqual");
      return null;
    }

    await commonFetcher({
      url: apiUrl(ApiUrls.USER),
      method: Method.POST,
      postBody: transformToFormData(user),
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    CommonToastSuccessWithTitle("toast_success_user_account_created");

    return "success";
  }

  static async onLogin(
    e: React.FormEvent<HTMLFormElement> | null = null,
    user: UserLogin,
    getLoggedIn: (() => void) | undefined,
    googleLogin: boolean = false
  ) {
    if (e) {
      e.preventDefault();
    }

    if (!googleLogin && (user.email === "" || user.password === "")) {
      CommonToastErrorWithTitle("toast_error_empty_field");
      return false;
    } else {
      const response: CommonApiResponse<any> = await commonFetcher({
        url: apiUrl(ApiUrls.LOGIN),
        method: Method.POST,
        postBody: user,
        withCredentials: true,
      });

      if (response?.status === 204) {
        return false;
      }

      getLoggedIn?.();
    }

    return "success";
  }

  static async avatarUpload(
    setter: (object: any) => void,
    user?: UserRegister,
    field?: string,
    setterLoading?: (loading: boolean) => void
  ) {
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.addEventListener("change", function (event) {
      let filesList: FileList | null | undefined = (
        event.target as HTMLInputElement
      ).files;

      if (setterLoading) {
        setterLoading(true);
      }

      if (
        filesList &&
        filesList.length === 1 &&
        validateFileImageType(filesList[0])
      ) {
        if (user && field) {
          setter({
            ...user,
            [field]: filesList[0], // Store the file name instead of the File object
          });
        } else {
          setter(filesList[0]);
        }

        CommonToastSuccessWithTitle("toast_success_avatar_upload");
      } else if (filesList && !validateFileImageType(filesList[0])) {
        CommonToastErrorWithTitle("toast_error_avatar_upload_wrong_file");
      } else {
        CommonToastError();
      }
    });
  }

  static async deleteAvatar(
    setUser?: (user: UserRegister) => void,
    user?: UserRegister,
    field?: string,
    setNewAvatar?: (avatar: File | string | null) => void,
    userDatas?: UserProfile
  ) {
    if (setUser && user && field) {
      setUser({
        ...user,
        [field]: undefined,
      });
    } else {
      if (userDatas) {
        userDatas.avatar = null;
      }
      setNewAvatar?.(null);
    }
  }
}
