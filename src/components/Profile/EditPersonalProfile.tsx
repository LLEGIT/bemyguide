import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ApiUrls, apiUrl } from "@/Configs/ApiConfigs";
import { Method, commonFetcher, transformToFormData } from "@/utils/fetcher";

import { useIntl } from "react-intl";
import {
  CommonToastErrorWithTitle,
  CommonToastSuccessWithTitle,
} from "@/utils/toast";
import { UserProfile } from "@/Models/User/UserModel";
import AvatarInput from "./AvatarInput";
import ConfirmationModal from "../Modal/ConfirmationModal";

export const profile_edition_required_fields = [
  "firstname",
  "username",
  "lastname",
  "old_password",
  "email",
  "phone_nb",
];

export default function EditPersonalProfile({
  callback,
  userDatas,
}: {
  callback: () => void;
  userDatas: UserProfile;
}) {
  const i18n = useIntl();
  const [state, setState] = useState<UserProfile>();
  const [newAvatar, setNewAvatar] = useState<
    string | Buffer | File | null | undefined
  >(userDatas?.avatar);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  useEffect(() => {
    userDatas["initial_password"] = userDatas.password;
    userDatas["old_password"] = "";
    setState(userDatas);
  }, [userDatas]);

  useEffect(() => {
    if (
      newAvatar &&
      newAvatar !== userDatas["avatar"] &&
      typeof newAvatar !== "string"
    ) {
      userDatas["avatar"] = newAvatar as string | Buffer | null | undefined;
      setState(userDatas);

      if (newAvatar instanceof File || newAvatar instanceof Blob) {
        const reader = new FileReader();

        reader.onloadend = () => {
          if (reader.result && typeof reader.result === "string") {
            const base64String = reader.result.split(",")[1];

            setNewAvatar(base64String);
            setIsLoading(false);
          }
        };

        reader.readAsDataURL(newAvatar as Blob);
      } else if (typeof newAvatar === "string") {
        setIsLoading(false);
      }
    }
  }, [newAvatar]);

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setState((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const checkFields = () => {
    return new Promise((resolve, reject) => {
      if (state) {
        // Check if there are any changes
        if (state === userDatas) {
          reject("user_profile_edition_no_updates_found");
        }

        // Check if all required fields are filled
        let isValid = true;
        let formFields = Object.entries(state);

        for (const field of formFields) {
          if (profile_edition_required_fields.includes(field[0])) {
            if (
              !field[1] ||
              field[1].length === 0 ||
              field[1] === null ||
              field[1] === undefined
            ) {
              isValid = false;
            }
          }
        }

        // Resolve the promise
        if (isValid) {
          resolve(true);
        } else {
          reject("user_profile_edition_required_fields_missing");
        }
      }
    });
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  const handleEdition = () => {
    if (state?.new_password && !passwordRegex.test(state.new_password)) {
      CommonToastErrorWithTitle("user_register_password_not_fit");
      setIsPasswordValid(false);
      return;
    }
    setIsPasswordValid(true);

    checkFields()
      .then(() => {
        saveEdition();
      })
      .catch((error: string) => {
        CommonToastErrorWithTitle(error);
      });
  };

  const saveEdition = async () => {
    await commonFetcher({
      url: apiUrl(ApiUrls.USER_ID(userDatas._id)),
      method: Method.PUT,
      postBody: transformToFormData(state),
      withCredentials: true,
    });

    CommonToastSuccessWithTitle("user_profile_edition_success");
    window.location.reload();
  };

  const handleDeleteAccount = useCallback(() => {
    deleteAccount();
  }, []);

  const deleteAccount = async () => {
    await commonFetcher({
      url: apiUrl(ApiUrls.USER_ID(userDatas._id)),
      method: Method.DELETE,
      postBody: state,
      withCredentials: true,
    });

    CommonToastSuccessWithTitle("user_profile_deletion_success");
    logoutAndRedirect();
  };

  const logoutAndRedirect = async () => {
    await commonFetcher({
      url: apiUrl(ApiUrls.LOGOUT),
      method: Method.GET,
      withCredentials: true,
    });

    window.location.href = "/login";
  };

  return (
    <Grid sx={{ mx: "auto", width: "100%", display: "block" }}>
      {!userDatas ? (
        <Grid
          display="flex"
          alignItems="center"
          sx={{ mx: "auto", width: 100 }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <AvatarInput
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            newAvatar={newAvatar}
            setNewAvatar={setNewAvatar}
            userDatas={userDatas}
          />
          <TextField
            margin="normal"
            fullWidth
            key={userDatas._id + "_username"}
            variant="outlined"
            disabled
            type="text"
            value={userDatas.username}
            name="Unique username"
          />
          <Typography>
            {i18n.formatMessage({
              id: "user_profile_edition_username_field_subtext",
            })}
          </Typography>
          <TextField
            onChange={onChange}
            margin="normal"
            fullWidth
            defaultValue={userDatas.firstname}
            key={userDatas._id + "_firstname"}
            label={i18n.formatMessage({
              id: "user_profile_edition_firstname_field",
            })}
            variant="outlined"
            required
            type="text"
            name="firstname"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            onChange={onChange}
            margin="normal"
            fullWidth
            defaultValue={userDatas.lastname}
            key={userDatas._id + "_lastname"}
            label={i18n.formatMessage({
              id: "user_profile_edition_lastname_field",
            })}
            variant="outlined"
            required
            type="text"
            name="lastname"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            onChange={onChange}
            margin="normal"
            fullWidth
            defaultValue={userDatas.email}
            key={userDatas._id + "_email"}
            label={i18n.formatMessage({
              id: "user_profile_edition_email_field",
            })}
            variant="outlined"
            required
            type="email"
            name="email"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            onChange={onChange}
            margin="normal"
            fullWidth
            defaultValue={userDatas.phone_nb}
            key={userDatas._id + "_phone_nb"}
            label={i18n.formatMessage({
              id: "user_profile_edition_phone_field",
            })}
            variant="outlined"
            required
            type="phone"
            name="phone_nb"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            onChange={onChange}
            margin="normal"
            fullWidth
            key={userDatas._id + "_old_password"}
            label={i18n.formatMessage({
              id: "user_profile_edition_old_password_field",
            })}
            variant="outlined"
            required
            type="password"
            name="old_password"
          />
          <TextField
            onChange={onChange}
            margin="normal"
            fullWidth
            key={userDatas._id + "_password"}
            label={i18n.formatMessage({
              id: "user_profile_edition_new_password_field",
            })}
            variant="outlined"
            type="password"
            name="new_password"
            error={!isPasswordValid}
            helperText={
              !isPasswordValid &&
              i18n.formatMessage({
                id: "user_register_password_restrictions",
              })
            }
          />
          <>
            <Grid sx={{ display: "flex", width: "100%", margin: 5 }}>
              <Button
                sx={{
                  display: "block",
                  alignSelf: "center",
                  marginRight: 1,
                }}
                onClick={callback}
                variant="outlined"
              >
                {i18n.formatMessage({
                  id: "user_profile_back_btn",
                })}
              </Button>
              <Button
                sx={{
                  display: "block",
                  alignSelf: "center",
                  marginLeft: 1,
                }}
                onClick={handleEdition}
                variant="outlined"
              >
                {i18n.formatMessage({
                  id: "user_profile_edition_save_btn",
                })}
              </Button>
            </Grid>
          </>
          <ConfirmationModal
            title="user_profile_deletion_confirmation_modal_title"
            content="user_profile_deletion_confirmation_modal_content"
            button="user_profile_deletion_confirmation_modal_button"
            innerButton="user_profile_deletion_confirmation_modal_button"
            callback={handleDeleteAccount}
          />
        </>
      )}
    </Grid>
  );
}
