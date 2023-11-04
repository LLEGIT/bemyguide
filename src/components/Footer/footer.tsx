"use client";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useIntl } from "react-intl";

export default function Footer() {
    const i18n = useIntl();
    return(
        <Grid container maxWidth="100%" width="100%" paddingTop="25px" paddingBottom="25px" sx={{backgroundColor: "black", position: "sticky", bottom: 0, left: 0}}>
            <Grid item xs={12} display="flex" flexDirection={{xs: "column", lg: "row"}} justifyContent="center" alignItems="center">
                <Link paddingRight={{lg: "20px"}} lineHeight="20px" underline="none" color="white" href="/about">
                    <Typography variant="body2">{i18n.formatMessage({ id: "footer_about_label" })}</Typography>
                </Link>
                <Link paddingRight={{lg: "20px"}} lineHeight="20px"  underline="none" color="white" href="/cookies-policy">
                    <Typography variant="body2">{i18n.formatMessage({ id: "footer_cookies_label" })}</Typography>
                </Link>
                <Link paddingRight={{lg: "20px"}} lineHeight="20px"  underline="none" color="white" href="/terms-of-service">
                    <Typography variant="body2">{i18n.formatMessage({ id: "footer_tos_label" })}</Typography>
                </Link>
                <Link paddingRight={{lg: "20px"}} lineHeight="20px"  underline="none" color="white" href="/contact">
                    <Typography variant="body2">{i18n.formatMessage({ id: "footer_contact_label" })}</Typography>
                </Link>
                <Typography variant="body2" color="white">BeMyCorporation™</Typography>
            </Grid>
        </Grid>
    )
}