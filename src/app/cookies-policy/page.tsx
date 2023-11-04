"use client";
import GoBackButton from "@/components/GoBackButton/GoBackButton";
import { Routes } from "@/utils/routes";
import { Grid, Typography } from "@mui/material";
import { useIntl } from "react-intl";

export default function CookiesPage() {
  const i18n = useIntl();
  const contentTranslations: Array<{ type: string; id: string }> = [
    { type: "title", id: "cookies_title" },
    { type: "content", id: "cookies_intro" },
    { type: "subtitle", id: "cookies_subtitle_1" },
    { type: "content", id: "cookies_paragraph_1" },
    { type: "subtitle", id: "cookies_subtitle_2" },
    { type: "content", id: "cookies_paragraph_3" },
    { type: "subtitle", id: "cookies_subtitle_4" },
    { type: "content", id: "cookies_paragraph_4" },
    { type: "subtitle", id: "cookies_subtitle_5" },
    { type: "content", id: "cookies_paragraph_5" },
  ];

  return (
    <Grid container padding={{ xs: "22px", lg: "20px 29%" }}>
      <Grid item xs={12} marginBottom={3}>
        <GoBackButton url={Routes.Index} />
      </Grid>
      {contentTranslations.map((translation, index) => (
        <Grid item key={index} xs={12} marginBottom={2}>
          <Typography
            variant={
              translation.type === "title"
                ? "h5"
                : translation.type === "subtitle"
                ? "h6"
                : "body1"
            }
          >
            {i18n.formatMessage({ id: translation.id })}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
