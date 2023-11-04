import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { apiUrl, ApiUrls } from "@/Configs/ApiConfigs";
import { AuthContext } from "@/context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditPersonalProfile from "./EditPersonalProfile";
import { Email, Phone } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { useIntl } from "react-intl";
import { CommonApiResponse, commonFetcher, Method } from "@/utils/fetcher";
import { useEffectAsync } from "@/hooks/useEffectAsync";
import { UserProfile } from "@/Models/User/UserModel";

export default function PersonalProfile() {
  const [userDatas, setUserDatas] = useState<UserProfile>();
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const { userContext } = useContext(AuthContext);
  const i18n = useIntl();

  useEffectAsync(async () => {
    if (!userDatas && userContext) {
      const response: CommonApiResponse<{ user: UserProfile }> =
        await commonFetcher({
          url: apiUrl(ApiUrls.USER_PROFILE),
          method: Method.GET,
          withCredentials: true,
        });

      setUserDatas(response.data?.user);
    }
  }, [userDatas, isEditing]);

  const handleClick = () => {
    setIsEditing(isEditing ? false : true);
  };

  const handleChange = useCallback(
    (userDatas: UserProfile) => {
      setIsEditing(isEditing ? false : true);
    },
    [isEditing]
  );

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
      ) : isEditing ? (
        <EditPersonalProfile
          callback={() => handleChange(userDatas)}
          userDatas={userDatas}
        />
      ) : (
        <Grid container>
          <Grid item xs={12} marginBottom={2}>
            <Typography
              fontWeight="bold"
              sx={{ textDecoration: "underline" }}
              variant="body1"
            >
              {i18n.formatMessage({ id: "user_profile_title" })}
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
            <Typography variant="body1">{userDatas.email}</Typography>
          </Grid>

          <Grid item xs={12} display="flex" alignItems="center" gap={2}>
            <Phone sx={{ color: blue[300], fontSize: 40 }} />
            <Typography variant="body1">{userDatas.phone_nb}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Button
              sx={{
                display: "block",
                width: "100%",
                alignSelf: "center",
                marginTop: 5,
              }}
              onClick={handleClick}
              variant="outlined"
            >
              {i18n.formatMessage({ id: "user_profile_edit_btn" })}
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
