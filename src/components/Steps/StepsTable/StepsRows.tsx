import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { TripModel, TripStep } from "@/Models/Trip/TripModel";
import { DeleteButton, EditButton } from "@/components/Buttons/Buttons";
import styled from "@emotion/styled";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import { TripViewModel } from "@/ViewModel/Trip/TripViewModel";

interface StepsRowsProps {
  step: TripStep;
  setAddStepModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<TripStep | undefined>>;
  tripDetails: TripModel;
  setTripDetails: React.Dispatch<React.SetStateAction<TripModel | undefined>>;
}

export default function StepsRows({
  step,
  setAddStepModalOpen,
  setCurrentStep,
  tripDetails,
  setTripDetails,
}: StepsRowsProps) {
  const handleDeletion = async () => {
    await TripViewModel.onStepDelete(step._id);
    setTripDetails({
      ...tripDetails,
      planning: {
        ...tripDetails.planning,
        days: tripDetails.planning.days.map((day) => {
          return {
            ...day,
            steps: day.steps.filter((s) => s._id !== step._id),
          };
        }),
      },
    });
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {step.title}
        </TableCell>
        <TableCell align="right">{step.description}</TableCell>
        <TableCell align="right">{step.location}</TableCell>
        <TableCell align="right">
          {new Date(step.datetime).toLocaleTimeString()}
        </TableCell>
        <TableCell align="right" style={{ width: 170 }}>
          <ButtonsContainer>
            <EditButton
              onClick={() => {
                setAddStepModalOpen(true);
                setCurrentStep(step);
              }}
            />
            <ConfirmationModal
              title="trip_step_deletion_confirmation_modal_title"
              content="trip_step_deletion_confirmation_modal_content"
              customButton={<DeleteButton />}
              innerButton="common_delete"
              callback={handleDeletion}
            />
          </ButtonsContainer>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
