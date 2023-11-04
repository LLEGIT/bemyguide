"use client";
import GoBackButton from "@/components/GoBackButton/GoBackButton";
import { Routes } from "@/utils/routes";
import { Grid, Typography } from "@mui/material";
import { useIntl } from "react-intl";

export default function TermsOfServicePage() {
  const i18n = useIntl();
  const contentTranslations: Array<{ type: string; id: string }> = [
    { type: "title", id: "tos_title" },
    { type: "content", id: "tos_intro" },
    { type: "subtitle", id: "tos_subtitle_1" },
    { type: "content", id: "tos_paragraph_1" },
    { type: "subtitle", id: "tos_subtitle_2" },
    { type: "content", id: "tos_paragraph_3" },
    { type: "subtitle", id: "tos_subtitle_4" },
    { type: "content", id: "tos_paragraph_4" },
    { type: "subtitle", id: "tos_subtitle_5" },
    { type: "content", id: "tos_paragraph_5" },
    { type: "subtitle", id: "tos_subtitle_6" },
    { type: "content", id: "tos_paragraph_6" },
    { type: "subtitle", id: "tos_subtitle_7" },
    { type: "content", id: "tos_paragraph_7" },
    { type: "subtitle", id: "tos_subtitle_8" },
    { type: "content", id: "tos_paragraph_8" },
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
