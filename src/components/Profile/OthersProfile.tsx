import { Avatar, CircularProgress, Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { apiUrl, ApiUrls } from "@/Configs/ApiConfigs";
import { AuthContext } from "@/context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AccessTime, Email, Phone } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { CommonApiResponse, commonFetcher, Method } from "@/utils/fetcher";
import { useEffectAsync } from "@/hooks/useEffectAsync";
import { OtherUser } from "@/Models/User/UserModel";
import { useSearchParams } from "next/navigation";
import { useIntl } from "react-intl";

export default function PersonalProfile() {
  const { userContext } = useContext(AuthContext);
  const [userDatas, setUserDatas] = useState<OtherUser>();
  const searchParams = useSearchParams();
  const username: string | null = searchParams.get("username");
  const i18n = useIntl();

  useEffectAsync(async () => {
    if (!userDatas && userContext && username) {
      const response: CommonApiResponse<OtherUser> = await commonFetcher({
        url: apiUrl(ApiUrls.USER_DETAILS_BY_USERNAME(username)),
        method: Method.GET,
        withCredentials: true,
      });
      setUserDatas(response.data);
    }
  }, [userDatas]);

  return (
    <Grid
      container
      padding={{ xs: "22px", lg: 0 }}
      margin={{ xs: 0, lg: "22px 15%" }}
    >
      {!userDatas ? (
        <Grid
          display="flex"
          alignItems="center"
          sx={{ mx: "auto", width: 100 }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12} marginBottom={2}>
            <Typography
              fontWeight="bold"
              sx={{ textDecoration: "underline" }}
              variant="body1"
            >
              {i18n.formatMessage({ id: "other_user_profile_title" })}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            gap={2}
            marginBottom={2}
          >
            {userDatas.avatar ? (
              <Avatar
                alt={userDatas.username + `'s avatar`}
                src={
                  "data:image/png;base64," +
                  (typeof userDatas.avatar !== "string"
                    ? Buffer.from(userDatas.avatar).toString("base64")
                    : userDatas.avatar)
                }
              />
            ) : (
              <AccountCircleIcon sx={{ color: blue[300], fontSize: 40 }} />
            )}
            <Typography variant="body1">
              {userDatas.firstname +
                " " +
                userDatas.lastname +
                " (" +
                userDatas.username +
                ")"}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            gap={2}
            marginBottom={2}
          >
            <Email sx={{ color: blue[300], fontSize: 40 }} />
            <Typography variant="body1">{userDatas.email ?? i18n.formatMessage({ id: "other_user_profile_unshared_information"})}</Typography>
          </Grid>

          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            gap={2}
            marginBottom={2}
          >
            <Phone sx={{ color: blue[300], fontSize: 40 }} />
            <Typography variant="body1">{userDatas.phone_nb ?? i18n.formatMessage({ id: "other_user_profile_unshared_information"})}</Typography>
          </Grid>

          <Grid item xs={12} display="flex" alignItems="center" gap={2}>
            <AccessTime sx={{ color: blue[300], fontSize: 40 }} />
            <Typography variant="body1">
              {new Date(userDatas.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
