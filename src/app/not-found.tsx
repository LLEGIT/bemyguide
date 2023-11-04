"use client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { useIntl } from "react-intl";
import { Routes } from "@/utils/routes";
import NotFoundImg from "./../assets/undraw_not_found.svg";
import Image from "next/image";

export default function NotFound() {
  const i18n = useIntl();
  return (
    <Grid container width="100%" height="98vh">
      <Grid
        item
        xs={12}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={3}
      >
        <Image
          src={NotFoundImg}
          alt="404 Not found image"
          width="400"
          height="300"
        />
        <Typography
          fontWeight="bold"
          variant="h6"
          fontSize={{ xs: 20, lg: 30 }}
        >
          {i18n.formatMessage({ id: "toast_error_common" })}
        </Typography>
        <Link href={Routes.Index}>
          <Typography
            fontWeight="bold"
            variant="body2"
            fontSize={{ xs: 20, lg: 30 }}
          >
            {i18n.formatMessage({ id: "errorpage_404_link" })}
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
}
