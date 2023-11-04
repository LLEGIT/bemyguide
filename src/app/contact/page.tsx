"use client";
import GoBackButton from "@/components/GoBackButton/GoBackButton";
import { Routes } from "@/utils/routes";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useIntl } from "react-intl";
import Img from "./../../assets/undraw_contact.png";

export default function ContactPage() {
  const i18n = useIntl();

  return (
    <Grid container padding={{ xs: "22px", lg: "20px 29%" }}>
      <Grid item xs={12} marginBottom={3}>
        <GoBackButton url={Routes.Index} />
      </Grid>
      <Grid item xs={12} marginBottom={3}>
        <Typography variant="h5">
          {i18n.formatMessage({ id: "contact_title" })}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" lineHeight={2}>
          {i18n.formatMessage({ id: "contact_content" })}
        </Typography>
      </Grid>
      <Grid container width="100%" height="38vh">
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Image src={Img} alt="Contact image" width="400" height="300" />
        </Grid>
      </Grid>
    </Grid>
  );
}
