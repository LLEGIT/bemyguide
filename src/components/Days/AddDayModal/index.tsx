import {
  AddTripDay,
  AddTripPlanningModel,
  TripDay,
  TripModel,
} from "@/Models/Trip/TripModel";
import { UserContext } from "@/Models/User/UserModel";
import { TripViewModel } from "@/ViewModel/Trip/TripViewModel";
import { SubmitButton } from "@/components/Buttons/Buttons";
import DatePicker from "@/components/DatePicker";
import { ModalHeader } from "@/components/ModificationSuggestionForm/ModificationSuggestionForm";
import { CommonToastErrorWithTitle } from "@/utils/toast";
import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import { Box, Input, InputLabel, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IntlShape } from "react-intl";

interface AddDayModalProps {
  open: boolean;
  handleClose: () => void;
  i18n: IntlShape;
  tripDetails: TripModel;
  setTripDetails: React.Dispatch<React.SetStateAction<TripModel | undefined>>;
  openedDay?: TripDay;
  updateDayModalOpen: boolean;
  userContext?: UserContext;
}

export default function AddDayModal(props: AddDayModalProps) {
  const [day, setDay] = useState<AddTripDay>({
    title: "",
    day: new Date(),
  });

  useEffect(() => {
    if (props.updateDayModalOpen) {
      setDay({
        title: props.openedDay?.title || "",
        day: props.openedDay?.day || new Date(),
      });
    }
  }, [props.updateDayModalOpen]);

  const handleAddDate = (date: Date) => {
    setDay({
      ...day,
      day: date,
    });
  };

  const handleModalClose = () => {
    setDay({
      title: "",
      day: new Date(),
    });
    props.handleClose();
  };

  const handleSubmit = async () => {
    let sameDay =
      new Date(day.day).toDateString() ===
      new Date(props.openedDay?.day ?? new Date()).toDateString();
    if (!day.title) {
      CommonToastErrorWithTitle("trip_add_day_title_error");
      return;
    }
    if (!day.day) {
      CommonToastErrorWithTitle("trip_add_day_date_error");
      return;
    }
    if (
      !sameDay &&
      props.tripDetails.planning.days.some(
        (d) =>
          new Date(d.day).toDateString() === new Date(day.day).toDateString()
      )
    ) {
      CommonToastErrorWithTitle("trip_add_day_date_already_exist_error");
      return;
    }

    if (props.updateDayModalOpen) {
      props.setTripDetails({
        ...props.tripDetails,
        planning: {
          ...props.tripDetails.planning,
          days: await Promise.all(
            props.tripDetails.planning.days.map(async (d) =>
              d._id === props.openedDay?._id
                ? await TripViewModel.onDayUpdate(props.openedDay?._id, day)
                : d
            )
          ),
        },
      });
    } else if (!props.tripDetails.planning) {
      const body: AddTripPlanningModel = {
        days: day,
        updatedBy: props.userContext?.id as string,
      };
      props.setTripDetails(
        await TripViewModel.onAddPlanning(props.tripDetails._id, body)
      );
    } else {
      props.setTripDetails({
        ...props.tripDetails,
        planning: await TripViewModel.onAddDay(
          props.tripDetails.planning._id,
          day
        ),
      });
    }

    handleModalClose();
  };

  return (
    <Modal open={props.open} onClose={handleModalClose}>
      <Box sx={modalStyle}>
        <ModalHeader>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.i18n.formatMessage({
              id: "trip_add_day_modal_title",
            })}
          </Typography>
          <Close
            onClick={() => props.handleClose()}
            sx={{ cursor: "pointer" }}
          />
        </ModalHeader>
        <ModalContent>
          <InputWrapper>
            <InputLabel id="suggestion-form-category-selection">
              {props.i18n.formatMessage({ id: "trip_add_day_title" })}
            </InputLabel>
            <Input
              fullWidth
              placeholder={props.i18n.formatMessage({
                id: "trip_add_day_title_placeholder",
              })}
              required
              value={day.title}
              onChange={(e) =>
                setDay({
                  ...day,
                  title: e.target.value,
                })
              }
            />
          </InputWrapper>
          <DatePickerContainer>
            <DatePicker
              handleAction={handleAddDate}
              customLabel="trip_add_day_date"
              handleOnChange={handleAddDate}
              value={day.day}
            />
          </DatePickerContainer>
          <SubmitButton
            label={props.i18n.formatMessage({ id: "common_save" })}
            onClick={handleSubmit}
          />
        </ModalContent>
      </Box>
    </Modal>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "15px 25px",
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  height: 65vh;
  overflow-y: auto;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 20px auto;
`;

const DatePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0 0;
`;
