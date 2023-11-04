"use client";
import { Box, Button, Modal, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useState } from "react";
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

interface ConfirmationModalProps {
  button?: string;
  customButton?: JSX.Element;
  title?: string;
  content?: string;
  innerButton?: string;
  callback?: () => void;
  onClick?: (e: any) => void;
}

export default function ConfirmationModal({
  button,
  customButton,
  title,
  content,
  innerButton,
  callback,
  onClick,
}: ConfirmationModalProps) {
  const i18n = useIntl();
  const [open, setOpen] = useState(false);

  const handleOpen = (e: any) => {
    setOpen(true);
    onClick?.(e);
  };
  
  const handleClose = () => {
    setOpen(false);
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {i18n.formatMessage({
                id: content,
              })}
            </Typography>
          )}
          {innerButton && (
            <Button
              onClick={callback}
              sx={{
                display: "block",
                alignSelf: "center",
                color: red[400],
                width: "100%",
                marginTop: "10px",
              }}
            >
              {i18n.formatMessage({
                id: innerButton,
              })}
            </Button>
          )}
          <Button
            onClick={handleClose}
            sx={{
              display: "block",
              alignSelf: "center",
              width: "100%",
              marginTop: "10px",
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
