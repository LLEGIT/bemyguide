"use client";
import React, { createContext, useEffect, useState } from "react";
import { ApiUrls, apiUrl } from "@/Configs/ApiConfigs";
import { UserContext, UserLoggedIn } from "@/Models/User/UserModel";
import { CommonApiResponse, Method, commonFetcher } from "@/utils/fetcher";

type IAuth = {
  loggedIn: boolean;
  userContext?: UserContext;
  getLoggedIn?: () => void;
  logout?: () => void;
  loading?: boolean;
};

type IAuthContext = IAuth;

export const AuthContext = createContext<IAuthContext>({ loggedIn: false });

export const AuthProvider = (props: React.PropsWithChildren) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userContext, setUserContext] = useState<UserContext | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const getLoggedIn = async () => {
    const response: CommonApiResponse<UserLoggedIn> = await commonFetcher({
      url: apiUrl(ApiUrls.LOGGED_IN),
      method: Method.GET,
      withCredentials: true,
    })
    setLoggedIn(response.data.loggedIn)
    setUserContext(response.data.user)
    setLoading(false);
  };

  const logout = async () => {
    await commonFetcher({
      url: apiUrl(ApiUrls.LOGOUT),
      method: Method.GET,
      withCredentials: true,
    })
    setLoggedIn(false)
    setUserContext(undefined)
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{loggedIn, userContext, getLoggedIn, logout, loading}}>
      {props.children}
    </AuthContext.Provider>
  );
};
