import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TripDay, TripModel, TripStep } from "@/Models/Trip/TripModel";
import { useIntl } from "react-intl";
import {
  AddButton,
  DeleteButton,
  EditButton,
} from "@/components/Buttons/Buttons";
import StepsTable from "@/components/Steps/StepsTable";
import styled from "@emotion/styled";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import { TripViewModel } from "@/ViewModel/Trip/TripViewModel";

interface DaysAccordionProps {
  expanded: string | false;
  handleChange: (
    day: TripDay
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  day: TripDay;
  setAddStepModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateDayModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<TripStep | undefined>>;
  tripDetails: TripModel;
  setTripDetails: React.Dispatch<React.SetStateAction<TripModel | undefined>>;
}

export const DaysAccordion = ({
  expanded,
  handleChange,
  day,
  setAddStepModalOpen,
  setUpdateDayModalOpen,
  setCurrentStep,
  tripDetails,
  setTripDetails,
}: DaysAccordionProps) => {
  const i18n = useIntl();

  const handleDeletion = async () => {
    await TripViewModel.onDayDelete(day._id);
    setTripDetails({
      ...tripDetails,
      planning: {
        ...tripDetails.planning,
        days: tripDetails.planning.days.filter((d) => d._id !== day._id),
      },
    });
  };

  return (
    <>
      <Accordion
        expanded={expanded === day._id}
        onChange={handleChange(day)}
        sx={{ width: "100%" }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            {day.title ??
              i18n.formatMessage({ id: "trip_details_day_without_title" })}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {new Date(day.day).toDateString()}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <HeaderContainer>
            <EditButtonWrapper>
              <EditButton
                label={i18n.formatMessage({ id: "trip_day_edit_button_title" })}
                onClick={() => setUpdateDayModalOpen(true)}
              />
              <ConfirmationModal
                title="trip_day_deletion_confirmation_modal_title"
                content="trip_day_deletion_confirmation_modal_content"
                customButton={
                  <DeleteButton
                    label={i18n.formatMessage({
                      id: "trip_day_deletion_button_title",
                    })}
                    style={{ height: "100%" }}
                  />
                }
                innerButton="common_delete"
                callback={handleDeletion}
              />
            </EditButtonWrapper>
            <AddButton
              label={i18n.formatMessage({ id: "trip_steps_add_step" })}
              onClick={() => setAddStepModalOpen(true)}
            />
          </HeaderContainer>
          <StepsTable
            day={day}
            setAddStepModalOpen={setAddStepModalOpen}
            setCurrentStep={setCurrentStep}
            tripDetails={tripDetails}
            setTripDetails={setTripDetails}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const EditButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 370px;
`;
