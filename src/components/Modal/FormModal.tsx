"use client";
import { apiUrl, ApiUrls } from "@/Configs/ApiConfigs";
import { TripModel, UpdateTripUsersModel } from "@/Models/Trip/TripModel";
import { User, UserIdAndEmail } from "@/Models/User/UserModel";
import { AuthContext } from "@/context/AuthContext";
import { CommonApiResponse, commonFetcher, Method } from "@/utils/fetcher";
import {
  CommonToastErrorWithTitle,
  CommonToastSuccessWithTitle,
} from "@/utils/toast";
import { Box, Button, Modal, TextField, Typography, Chip } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const buttonStyle = {
  display: "block",
  alignSelf: "center",
  color: red[400],
  width: "100%",
};

interface FormProps {
  tripDetails: TripModel;
  setTripDetails: React.Dispatch<React.SetStateAction<TripModel | undefined>>;
  button?: string;
  customButton?: JSX.Element;
  title?: string;
  formLabel?: string;
  content?: string;
  innerButton?: string;
}

export default function FormModal({
  tripDetails,
  setTripDetails,
  button,
  customButton,
  title,
  formLabel,
  content,
  innerButton,
}: FormProps) {
  const i18n = useIntl();
  const { userContext } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [companions, setCompanions] = useState<UserIdAndEmail[]>([]);
  const [newElement, setNewElement] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    if (tripDetails) {
      setCompanions(
        tripDetails.users.map((user) => ({
          _id: (user as User)._id,
          email: (user as User).email,
        }))
      );
    }
  }, [tripDetails]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseOnCancel = () => {
    setCompanions([]);
    setNewElement("");
    setIsEmailValid(true);
    setOpen(false);
  };

  const handleAddElement = async () => {
    const newElementLowerCase = newElement.toLowerCase();
    if (isEmailValid && tripDetails._id) {
      if (!companions.some((e) => e.email === newElementLowerCase)) {
        setCompanions([
          ...companions,
          {
            email: newElementLowerCase,
          },
        ]);
        setNewElement("");
      } else {
        CommonToastErrorWithTitle(
          "toast_error_user_email_already_in_list",
          true
        );
      }
    }
  };

  const handleTextFieldKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Enter" && isEmailValid) {
      handleAddElement();
    }
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const email = event.target.value;
    setNewElement(email);
    setIsEmailValid(isValidEmailFormat(email));
  };

  const isValidEmailFormat = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const saveUpdates = async () => {
    if (isEmailValid && tripDetails._id) {
      const updatedTripDetails: UpdateTripUsersModel = {
        _id: tripDetails._id,
        users: [
          ...companions,
          {
            email: newElement,
          },
        ],
        inviteFrom: userContext?.firstname ?? "",
      };

      try {
        const response: CommonApiResponse<TripModel> = await commonFetcher({
          url: apiUrl(ApiUrls.TRIP_USERS(tripDetails._id)),
          method: Method.PUT,
          withCredentials: true,
          postBody: updatedTripDetails,
        });

        setCompanions(response.data.users as User[]);
        setTripDetails(response.data);
        setNewElement("");
        setIsEmailValid(true);
        setOpen(false);
      } catch (error) {
        CommonToastErrorWithTitle("toast_error_companion_add");
      }
    }
  };

  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      CommonToastSuccessWithTitle("toast_success_copy_to_clipboard");
    });
  };

  return (
    <>
      {customButton ? (
        <div onClick={handleOpen}>{customButton}</div>
      ) : (
        <Button onClick={handleOpen} sx={buttonStyle}>
          {i18n.formatMessage({
            id: button,
          })}
        </Button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {title && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {i18n.formatMessage({
                id: title,
              })}
            </Typography>
          )}
          {content && (
            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 4 }}>
              {i18n.formatMessage({
                id: content,
              })}
            </Typography>
          )}

          {/* Form */}
          <TextField
            label={i18n.formatMessage({
              id: formLabel || "common_add",
            })}
            placeholder="hermanvonumsprung@mail.com"
            variant="outlined"
            fullWidth
            value={newElement}
            onChange={handleTextFieldChange}
            onKeyDown={handleTextFieldKeyDown}
            type="email"
            error={!isEmailValid}
            helperText={
              !isEmailValid
                ? i18n.formatMessage({
                    id: "common_invalid",
                  })
                : ""
            }
          />

          <Box sx={{ mt: 2, mb: 4 }}>
            {companions?.map((companion, index) => (
              <Chip
                key={index}
                label={companion.email}
                disabled={index == 0}
                onDelete={() => {
                  if (index != 0) {
                    const updated = [...companions];
                    updated.splice(index, 1);
                    setCompanions(updated);
                  }
                }}
                onClick={() => handleCopyToClipboard(companion.email)}
                color="primary"
                sx={{ margin: "4px" }}
              />
            ))}
          </Box>

          <Button
            onClick={saveUpdates}
            sx={{
              display: "block",
              alignSelf: "center",
              color: blue[400],
              width: "100%",
              marginTop: "10px",
            }}
          >
            {i18n.formatMessage({
              id: innerButton || "common_save",
            })}
          </Button>

          <Button
            onClick={handleCloseOnCancel}
            sx={{
              display: "block",
              alignSelf: "center",
              width: "100%",
              marginTop: "10px",
              color: red[400],
            }}
          >
            {i18n.formatMessage({
              id: "modal_button_go_back",
            })}
          </Button>
        </Box>
      </Modal>
    </>
  );
}
