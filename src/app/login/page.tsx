"use client";
import React from "react";
import { frMessages } from "@/Locales/fr/frMessages";
import { UserViewModel } from "@/ViewModel/User/UserViewModel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState, useContext } from "react";
import Link from "@mui/material/Link";
import {
  UserLoginInitialViewState,
  UserLoginField,
  GoogleTokenDecoded,
} from "../../Models/User/UserModel";
import Hiking from "@mui/icons-material/Hiking";
import { AuthContext } from "@/context/AuthContext";
import { useIntl } from "react-intl";
import styled from "@emotion/styled";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { Routes } from "@/utils/routes";
import jwtDecode from "jwt-decode";
import { CommonToastError } from "@/utils/toast";

export default function Login() {
  const i18n = useIntl();
  const [user, setUser] = useState(UserLoginInitialViewState);
  const { getLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse): Promise<void> => {
    if (!credentialResponse.clientId) {
      // Handle the case where clientId is undefined
      return;
    }
  
    const token = credentialResponse.credential;
    const decodedToken: GoogleTokenDecoded = jwtDecode(token!);
  
    const googleUser = {
      username: decodedToken?.given_name,
      avatar: "",
      email: decodedToken?.email,
      // Mandatory to create user
      firstname: decodedToken?.given_name,
      lastname: "",
      phone_nb: "",
      password: "",
      confirm_password: "",
    };

    const existingGoogleUser = await UserViewModel.onLogin(null, googleUser, getLoggedIn, true);

    if (existingGoogleUser === "success") {
      router.push(Routes.Index);
      return;
    }

    sessionStorage.setItem("googleUser", JSON.stringify(googleUser));    

    router.push(Routes.Register);

    return;
  };

  return (
    <Grid container padding={{ xs: "22px", lg: "20px 29%" }}>
      <Grid item xs={12} display="flex" alignItems="center">
        <Hiking sx={{ fontSize: "40px" }} />
        <Typography marginLeft="8px" variant="h5" fontWeight="bold">
          {i18n.formatMessage({ id: "user_login_title" })}
        </Typography>
      </Grid>
      <Grid item xs={12} marginTop="20px">
        <Typography variant="h6">
          {i18n.formatMessage({ id: "user_login_subtitle" })}
        </Typography>
      </Grid>
      <Grid container>
        <CustomForm
          onSubmit={(e) => UserViewModel.onLogin(e, user, getLoggedIn)}
        >
          <FormControl fullWidth>
            {(
              Object.keys(UserLoginField) as Array<keyof typeof UserLoginField>
            ).map((value) => {
              const index = ("user_login_label_" +
                UserLoginField[value]) as keyof typeof frMessages;
              return (
                <TextField
                  margin="normal"
                  fullWidth
                  key={UserLoginField[value]}
                  label={i18n.formatMessage({ id: index as string })}
                  variant="outlined"
                  required
                  type={
                    UserLoginField[value] === UserLoginField.PASSWORD
                      ? "password"
                      : UserLoginField[value] === UserLoginField.EMAIL
                      ? "email"
                      : "text"
                  }
                  value={user[UserLoginField[value]]}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      [UserLoginField[value]]: e.target.value,
                    })
                  }
                />
              );
            })}
            <Link href="/forgotten-password">
              <Typography>
                {i18n.formatMessage({ id: "user_login_forgotten_password" })}
              </Typography>
            </Link>

            <Box marginTop={2}>
              <GoogleLogin
                width="100%"
                onSuccess={handleGoogleLoginSuccess}
                onError={CommonToastError}
                useOneTap
              />
            </Box>

            <Button
              sx={{ marginTop: "16px" }}
              variant="contained"
              size="large"
              type="submit"
            >
              {i18n.formatMessage({ id: "user_login_label_confirm_login" })}
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <Typography>
                {i18n.formatMessage({ id: "user_login_no_account" })}&nbsp;
              </Typography>
              <Link href="/register">
                <Typography>
                  {i18n.formatMessage({ id: "user_login_register_button" })}
                </Typography>
              </Link>
            </Box>
          </FormControl>
        </CustomForm>
      </Grid>
    </Grid>
  );
}

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
