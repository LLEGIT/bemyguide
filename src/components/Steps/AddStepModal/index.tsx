import {
  AddTripStep,
  TripDay,
  TripModel,
  TripStep,
} from "@/Models/Trip/TripModel";
import { TripViewModel } from "@/ViewModel/Trip/TripViewModel";
import { SubmitButton } from "@/components/Buttons/Buttons";
import { ModalHeader } from "@/components/ModificationSuggestionForm/ModificationSuggestionForm";
import { CommonToastErrorWithTitle } from "@/utils/toast";
import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import { Box, Input, InputLabel, Modal, Typography } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { IntlShape } from "react-intl";

interface AddStepModalProps {
  open: boolean;
  handleClose: () => void;
  i18n: IntlShape;
  tripDetails: TripModel;
  setTripDetails: React.Dispatch<React.SetStateAction<TripModel | undefined>>;
  openedDay: TripDay;
  setCurrentStep?: React.Dispatch<React.SetStateAction<TripStep | undefined>>;
  currentStep?: TripStep;
}

export default function AddStepModal(props: AddStepModalProps) {
  const [step, setStep] = useState<AddTripStep>({
    title: "",
    description: "",
    location: "",
    datetime: undefined,
  });

  const handleAddDate = (date: Date) => {
    if (date.toString() === "Invalid Date") {
      return;
    }
    const day = new Date(props.openedDay.day);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    day.setHours(hours, minutes);
    setStep({
      ...step,
      datetime: day,
    });
  };

  const handleModalClose = () => {
    setStep({
      title: "",
      description: "",
      location: "",
      datetime: undefined,
    });
    props.setCurrentStep?.(undefined);
    props.handleClose();
  };

  useEffect(() => {
    if (props.currentStep) {
      setStep({
        title: props.currentStep.title,
        description: props.currentStep.description,
        location: props.currentStep.location,
        datetime: props.currentStep.datetime,
      });
    }
  }, [props.currentStep]);

  const handleSubmit = async () => {
    if (!step.title) {
      CommonToastErrorWithTitle("trip_steps_add_step_title_error");
      return;
    }
    if (!step.description) {
      CommonToastErrorWithTitle("trip_steps_add_step_description_error");
      return;
    }
    if (!step.location) {
      CommonToastErrorWithTitle("trip_steps_add_step_location_error");
      return;
    }
    if (!step.datetime) {
      CommonToastErrorWithTitle("trip_steps_add_step_date_error");
      return;
    }
    props.setTripDetails({
      ...props.tripDetails,
      planning: {
        ...props.tripDetails.planning,
        days: (await Promise.all(
          props.tripDetails.planning.days.map(async (day) => {
            if (day._id === props.openedDay._id) {
              if (props.currentStep) {
                await TripViewModel.onStepUpdate(props.currentStep._id, step);
                return {
                  ...day,
                  steps: day.steps.map((s) =>
                    s._id === props.currentStep?._id ? step : s
                  ),
                };
              }
              return await TripViewModel.onAddStep(day._id, step);
            }
            return day;
          })
        )) as TripDay[],
      },
    });
    handleModalClose();
  };

  return (
    <Modal open={props.open} onClose={handleModalClose}>
      <Box sx={modalStyle}>
        <ModalHeader>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.i18n.formatMessage({
              id: "trip_steps_add_step_modal_title",
            })}
          </Typography>
          <Close
            onClick={() => props.handleClose()}
            sx={{ cursor: "pointer" }}
          />
        </ModalHeader>
        <ModalContent>
          <InputWrapper>
            <InputLabel id="step-form-title">
              {props.i18n.formatMessage({ id: "trip_steps_add_step_title" })}
            </InputLabel>
            <Input
              fullWidth
              placeholder={props.i18n.formatMessage({
                id: "trip_steps_add_step_title_placeholder",
              })}
              required
              value={step.title}
              onChange={(e) =>
                setStep({
                  ...step,
                  title: e.target.value,
                })
              }
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel id="step-form-title">
              {props.i18n.formatMessage({
                id: "trip_steps_add_step_description",
              })}
            </InputLabel>
            <Input
              fullWidth
              placeholder={props.i18n.formatMessage({
                id: "trip_steps_add_step_description_placeholder",
              })}
              required
              value={step.description}
              onChange={(e) =>
                setStep({
                  ...step,
                  description: e.target.value,
                })
              }
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel id="step-form-title">
              {props.i18n.formatMessage({ id: "trip_steps_add_step_location" })}
            </InputLabel>
            <Input
              fullWidth
              placeholder={props.i18n.formatMessage({
                id: "trip_steps_add_step_location_placeholder",
              })}
              value={step.location}
              onChange={(e) =>
                setStep({
                  ...step,
                  location: e.target.value,
                })
              }
            />
          </InputWrapper>
          <DatePickerContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <InputWrapper>
                <InputLabel id="step-form-title">
                  {props.i18n.formatMessage({
                    id: "trip_steps_add_step_date",
                  })}
                </InputLabel>
                <TimePicker
                  value={step.datetime ? dayjs(step.datetime) : undefined}
                  onChange={(date: Dayjs | null) =>
                    handleAddDate(date?.toDate() as Date)
                  }
                />
              </InputWrapper>
            </LocalizationProvider>
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
`;
