import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useIntl } from "react-intl";
import StepsRows from "./StepsRows";
import { TripDay, TripModel, TripStep } from "@/Models/Trip/TripModel";

interface StepsTableProps {
  day: TripDay;
  setAddStepModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<TripStep | undefined>>;
  tripDetails: TripModel;
  setTripDetails: React.Dispatch<React.SetStateAction<TripModel | undefined>>;
}

export default function StepsTable({
  day,
  setAddStepModalOpen,
  setCurrentStep,
  tripDetails,
  setTripDetails,
}: StepsTableProps) {
  const i18n = useIntl();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>
              {i18n.formatMessage({ id: "trip_steps_table_header_title" })}
            </TableCell>
            <TableCell align="right">
              {i18n.formatMessage({
                id: "trip_steps_table_header_description",
              })}
            </TableCell>
            <TableCell align="right">
              {i18n.formatMessage({ id: "trip_steps_table_header_location" })}
            </TableCell>
            <TableCell align="right">
              {i18n.formatMessage({ id: "trip_steps_table_header_date" })}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {day.steps.length === 0 && (
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              <TableCell component="th" scope="row">
                {i18n.formatMessage({ id: "trip_steps_table_no_steps" })}
              </TableCell>
            </TableRow>
          )}
          {day.steps.length > 0 &&
            day.steps.map((step) => (
              <StepsRows
                key={step._id}
                step={step}
                setAddStepModalOpen={setAddStepModalOpen}
                setCurrentStep={setCurrentStep}
                tripDetails={tripDetails}
                setTripDetails={setTripDetails}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
