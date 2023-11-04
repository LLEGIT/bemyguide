"use client";
import {
  UserInitialViewState,
  UserRegisterField,
} from "@/Models/User/UserModel";
import { frMessages } from "@/Locales/fr/frMessages";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Hiking from "@mui/icons-material/Hiking";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import { UserViewModel } from "@/ViewModel/User/UserViewModel";
import { useRouter } from "next/navigation";
import { useIntl } from "react-intl";
import UploadAvatar from "@/components/Register/UploadAvatar";
import { Routes } from "@/utils/routes";
import { CommonToastErrorWithTitle } from "@/utils/toast";

export default function Register() {
  const i18n = useIntl();
  const router = useRouter();
  const [user, setUser] = useState(UserInitialViewState);
  const googleUser: string | null =
    sessionStorage.getItem("googleUser") ?? null;

  useEffect(() => {
    if (googleUser && user === UserInitialViewState) {
      setUser(JSON.parse(googleUser));
      sessionStorage.removeItem("googleUser");
    }
  }, [user]);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleClick = async () => {
    if (!passwordRegex.test(user.password)) {
      CommonToastErrorWithTitle("user_register_password_not_fit");
      setIsPasswordValid(false);
      return;
    }

    setIsPasswordValid(true);
    const saveUser = await UserViewModel.onSave(user);

    if (saveUser === "success") {
      router.push(Routes.Login);
    }
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  return (
    <Grid container padding={{ xs: "22px", lg: "20px 29%" }}>
      <Grid item xs={12} display="flex" alignItems="center">
        <Hiking sx={{ fontSize: "40px" }} />
        <Typography marginLeft="8px" variant="h5" fontWeight="bold">
          {i18n.formatMessage({ id: "user_register_title" })}
        </Typography>
      </Grid>
      <Grid item xs={12} marginTop="20px">
        <Typography variant="h6">
          {i18n.formatMessage({ id: "user_register_subtitle" })}
        </Typography>
      </Grid>
      <Grid container>
        <FormControl fullWidth>
          {(
            Object.keys(UserRegisterField) as Array<
              keyof typeof UserRegisterField
            >
          ).map((value) => {
            const index = ("user_register_label_" +
              UserRegisterField[value]) as keyof typeof frMessages;

            if (UserRegisterField[value] === UserRegisterField.AVATAR) {
              return (
                <UploadAvatar
                  key={index}
                  user={user}
                  userRegisterFieldValue={UserRegisterField[value]}
                  setUser={setUser}
                  index={index}
                />
              );
            } else if (
              UserRegisterField[value] === UserRegisterField.PASSWORD
            ) {
              return (
                <TextField
                  margin="normal"
                  fullWidth
                  key={UserRegisterField[value]}
                  label={i18n.formatMessage({
                    id: index as string,
                  })}
                  variant="outlined"
                  required
                  type="password"
                  value={user[UserRegisterField[value]]}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      [UserRegisterField[value]]: e.target.value,
                    })
                  }
                  error={!isPasswordValid}
                  helperText={
                    !isPasswordValid &&
                    i18n.formatMessage({
                      id: "user_register_password_restrictions",
                    })
                  }
                />
              );
            } else {
              return (
                <TextField
                  margin="normal"
                  fullWidth
                  key={UserRegisterField[value]}
                  label={i18n.formatMessage({ id: index as string })}
                  variant="outlined"
                  required
                  type={
                    UserRegisterField[value] === UserRegisterField.PASSWORD ||
                    UserRegisterField[value] ===
                      UserRegisterField.CONFIRMPASSWORD
                      ? "password"
                      : UserRegisterField[value] === UserRegisterField.PHONENB
                      ? "tel"
                      : UserRegisterField[value] === UserRegisterField.EMAIL
                      ? "email"
                      : "text"
                  }
                  value={user[UserRegisterField[value]]}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      [UserRegisterField[value]]: e.target.value,
                    })
                  }
                />
              );
            }
          })}
          <Button
            sx={{ marginTop: "16px" }}
            variant="contained"
            size="large"
            onClick={handleClick}
          >
            {i18n.formatMessage({
              id: "user_register_label_confirm_registration",
            })}
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
              {i18n.formatMessage({
                id: "user_register_already_have_an_account",
              })}
              &nbsp;
            </Typography>
            <Link href="/login">
              <Typography>
                {i18n.formatMessage({ id: "user_register_login_button" })}
              </Typography>
            </Link>
          </Box>
        </FormControl>
      </Grid>
    </Grid>
  );
}
