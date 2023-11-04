"use client";
import { ApiUrls, apiUrl } from "@/Configs/ApiConfigs";
import { Method, commonFetcher } from "@/utils/fetcher";
import { CustomToastSuccess } from "@/utils/toast";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
  const i18n = useIntl();
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const searchParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (!searchParams.get("token")) {
      window.location.href = "/";
    }
  }, []);

  const handlePasswordChange = (e: any): void => {
    setError(false);
    setPassword(e.target.value);
  };

  const handlePasswordConfChange = (e: any): void => {
    setError(false);
    setPasswordConf(e.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    if (password !== "" && passwordConf !== "" && password === passwordConf) {
      await commonFetcher({
        url: apiUrl(ApiUrls.RESET_PASSWORD_SUBMIT),
        method: Method.POST,
        postBody: {
          password: password,
          token: searchParams.get("token"),
        },
      });
      CustomToastSuccess({
        title: "toast_success_title",
        subtitle: "user_resetpwd_toast_success",
        autoclose: false,
        onClose: () => {
          window.location.href = "/";
        },
      });
    } else {
      setError(true);
    }
  };

  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      alignContent="center"
      gap={2}
    >
      <Grid item xs={12} lg={5}>
        <ToastContainer position="top-center" />
      </Grid>
      <Grid item xs={12} lg={5}>
        <Typography variant="body1">
          {i18n.formatMessage({ id: "user_resetpwd_title" })}
        </Typography>
      </Grid>
      <Grid item xs={12} lg={5} width={{ xs: "260px", lg: "400px" }}>
        <TextField
          error={error}
          value={password}
          fullWidth
          onChange={handlePasswordChange}
          label={i18n.formatMessage({ id: "user_resetpwd_label1" })}
          type="password"
        />
      </Grid>
      <Grid item xs={12} lg={5} width={{ xs: "260px", lg: "400px" }}>
        <TextField
          error={error}
          helperText={
            error && password !== passwordConf
              ? i18n.formatMessage({ id: "user_resetpwd_helperTxt1" })
              : error
              ? i18n.formatMessage({ id: "user_resetpwd_helperTxt2" })
              : ""
          }
          value={passwordConf}
          fullWidth
          onChange={handlePasswordConfChange}
          label={i18n.formatMessage({ id: "user_resetpwd_label2" })}
          type="password"
        />
      </Grid>
      <Grid item xs={12} lg={5} display="flex" justifyContent="flex-end">
        <Button onClick={handleSubmit} type="submit" variant="outlined">
          {i18n.formatMessage({ id: "user_forgottenpwd_submit" })}
        </Button>
      </Grid>
    </Grid>
  );
}
