"use client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import GoBackButton from "@/components/GoBackButton/GoBackButton";
import React from "react";
import { Box, CircularProgress } from "@mui/material";
import TripTabs from "../../../components/TripTabs/TripTabs";
import { useIntl } from "react-intl";
import { Routes } from "@/utils/routes";

export default function TripTips() {
  const i18n = useIntl();

  return (
    <Grid container>
      <Grid
        container
        padding={{ xs: "22px", lg: 0 }}
        paddingBottom={{ xs: 0, lg: 0 }}
        margin={{ xs: 0, lg: "22px 15%" }}
      >
        <GoBackButton url={Routes.Trip_Index} />
        <Grid item xs={12} marginTop="12px" marginBottom="12px">
          <Typography
            fontWeight="700"
            variant="h1"
            fontSize={{ xs: "20px" }}
            textAlign="center"
          >
            {i18n.formatMessage({ id: "trip_tips_title" })}
          </Typography>
        </Grid>
      </Grid>

      <>
        <Box
          sx={{ width: "100%" }}
          padding={{ xs: "22px", lg: 0 }}
          paddingBottom={{ xs: 0, lg: 0 }}
          margin={{ xs: 0, lg: "22px 15%" }}
        >
          <TripTabs value={1} />
        </Box>

        <Grid
          display="flex"
          alignItems="center"
          sx={{ mx: "auto", width: 100 }}
        >
          <CircularProgress />
        </Grid>
      </>
    </Grid>
  );
}
