"use client";
import { Grid, Link, Typography } from "@mui/material";
import { useIntl } from "react-intl";

export default function Success() {
    const i18n = useIntl();
    return (
        <Grid container padding={3} gap={3}>
            <Grid item xs={12}>
                <Typography variant="body1" textAlign="justify">
                    {i18n.formatMessage({ id: "user_forgottenpwd_success" })}
                </Typography>
            </Grid>
            <Link href="/">
                <Typography>
                    {i18n.formatMessage({ id: "user_forgottenpwd_homepage_return" })}
                </Typography>
            </Link>
        </Grid>
    )
}