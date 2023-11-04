"use client";
import { ApiUrls, apiUrl } from "@/Configs/ApiConfigs";
import { Method, commonFetcher } from "@/utils/fetcher";
import { CommonToastErrorWithTitle, CustomToastInfo } from "@/utils/toast";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useIntl } from "react-intl";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function forgottenPassword() {
  const i18n = useIntl();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: any) => {
    if (e.charCode === 13) {
      handleSubmit();
    }
    setError(false);
    setEmail(e?.target?.value);
  };

  const handleSubmit = async () => {
    if (email === "") {
      CustomToastInfo({ title: "user_forgottenpwd_email_empty" });
    } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      await commonFetcher({
        url: apiUrl(ApiUrls.RESET_PASSWORD_MAIL),
        method: Method.POST,
        postBody: {
          email: email,
        },
      });
      window.location.href = window.location.href + "/success";
    } else {
      CommonToastErrorWithTitle("user_forgottenpwd_error_msg");
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
      width="100%"
    >
      <Grid item xs={12} lg={5}>
        <ToastContainer position="top-center" />
      </Grid>
      <Grid item xs={12} lg={5}>
        <Typography variant="body1">
          {i18n.formatMessage({ id: "user_forgottenpwd_header" })}
        </Typography>
      </Grid>
      <Grid item xs={12} lg={5} width={{ xs: "260px", lg: "400px" }}>
        <TextField
          error={error}
          type="email"
          fullWidth
          label={i18n.formatMessage({ id: "user_forgottenpwd_label_email" })}
          onChange={handleChange}
          onKeyDown={handleChange}
          value={email}
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
