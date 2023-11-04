"use client";
import GoBackButton from "@/components/GoBackButton/GoBackButton";
import { Routes } from "@/utils/routes";
import { Grid, Typography } from "@mui/material";
import { useIntl } from "react-intl";

export default function AboutPage() {
  const i18n = useIntl();

  return (
    <Grid container padding={{ xs: "22px", lg: "20px 29%" }}>
      <Grid item xs={12} marginBottom={3}>
        <GoBackButton url={Routes.Index} />
      </Grid>
      <Grid item xs={12} marginBottom={3}>
        <Typography variant="h5">
          {i18n.formatMessage({ id: "about_title" })}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" lineHeight={2}>
          {i18n.formatMessage({ id: "about_content" })}
        </Typography>
      </Grid>
    </Grid>
  );
}
