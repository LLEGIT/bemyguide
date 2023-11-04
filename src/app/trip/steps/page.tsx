"use client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import GoBackButton from "../../../components/GoBackButton/GoBackButton";
import React, { useContext, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import TripTabs from "../../../components/TripTabs/TripTabs";
import { useIntl } from "react-intl";
import { Routes } from "@/utils/routes";
import { useEffectAsync } from "@/hooks/useEffectAsync";
import { TripDay, TripModel, TripStep } from "@/Models/Trip/TripModel";
import { AuthContext } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { TripViewModel } from "@/ViewModel/Trip/TripViewModel";
import { DaysAccordion } from "@/components/Days/DaysAccordion";
import styled from "@emotion/styled";
import { AddButton } from "@/components/Buttons/Buttons";
import AddDayModal from "@/components/Days/AddDayModal";
import AddStepModal from "@/components/Steps/AddStepModal";
import checkAccessToTrip from "@/utils/checkAccessToTrip";
import NotFound from "@/app/not-found";

export default function TripSteps() {
  const i18n = useIntl();
  const searchParams = useSearchParams();
  const { userContext } = useContext(AuthContext);
  const tripId: string | null = searchParams.get("id");
  const [tripDetails, setTripDetails] = useState<TripModel>();
  const [loading, setLoading] = useState<boolean>(true);
  const [addDayModalOpen, setAddDayModalOpen] = useState(false);
  const [updateDayModalOpen, setUpdateDayModalOpen] = useState(false);
  const [addStepModalOpen, setAddStepModalOpen] = useState(false);
  const [openedDay, setOpenedDay] = useState<TripDay>();
  const [currentStep, setCurrentStep] = useState<TripStep>();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const router = useRouter();

  const handleChange =
    (day: TripDay) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setOpenedDay(day);
      setExpanded(isExpanded ? day._id : false);
    };

  useEffectAsync(async () => {
    if (tripId) {
      const hasAccess = await checkAccessToTrip(
        tripId as string,
        userContext?.id as string
      );
      if (!hasAccess) {
        router.push(Routes.Index);
        return <NotFound />;
      }
      setTripDetails(await TripViewModel.onFetchDays(tripId));
      setLoading(false);
    }
  }, [tripId, userContext?.id]);

  return (
    <>
      {tripDetails && (
        <>
          <AddDayModal
            open={addDayModalOpen || updateDayModalOpen}
            handleClose={() => {
              setAddDayModalOpen(false);
              setUpdateDayModalOpen(false);
            }}
            i18n={i18n}
            tripDetails={tripDetails}
            setTripDetails={setTripDetails}
            openedDay={openedDay}
            updateDayModalOpen={updateDayModalOpen}
            userContext={userContext}
          />
          {openedDay && (
            <AddStepModal
              open={addStepModalOpen}
              handleClose={() => setAddStepModalOpen(false)}
              i18n={i18n}
              tripDetails={tripDetails}
              setTripDetails={setTripDetails}
              openedDay={openedDay}
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
            />
          )}
        </>
      )}

      <Grid container>
        <Grid
          container
          padding={{ xs: "22px", lg: 0 }}
          paddingBottom={{ xs: 0, lg: 0 }}
          margin={{ xs: 0, lg: "22px 15%" }}
        >
          <GoBackButton url={Routes.Trip_Index} />
          <Grid item xs={12} marginTop="12px" marginBottom="12px">
            <Typography
              fontWeight="700"
              variant="h1"
              fontSize={{ xs: "20px" }}
              textAlign="center"
            >
              {i18n.formatMessage({ id: "trips_list_title_example" })}
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{ width: "100%" }}
          padding={{ xs: "22px", lg: 0 }}
          paddingBottom={{ xs: 0, lg: 0 }}
          margin={{ xs: 0, lg: "22px 15% 0" }}
        >
          <TripTabs value={1} />
        </Box>
        <DaysDetailsWrapper>
          <AddButtonWrapper>
            <AddButton
              label={i18n.formatMessage({ id: "trip_details_add_day" })}
              onClick={() => setAddDayModalOpen(true)}
            />
          </AddButtonWrapper>
          {loading && (
            <Grid
              display="flex"
              alignItems={"center"}
              sx={{ m: "auto" }}
              height="calc(100vh - 159px)"
            >
              <CircularProgress />
            </Grid>
          )}
          <Grid
            display="flex"
            alignItems="center"
            sx={{ mx: "auto", width: "80vw" }}
          >
            {!loading && tripDetails?.planning && tripDetails.planning.days.length > 0 ? (
              <DaysContainer>
                {tripDetails.planning.days.map((day) => (
                  <DaysAccordion
                    expanded={expanded}
                    handleChange={handleChange}
                    day={day}
                    key={day._id}
                    setAddStepModalOpen={setAddStepModalOpen}
                    setUpdateDayModalOpen={setUpdateDayModalOpen}
                    setCurrentStep={setCurrentStep}
                    tripDetails={tripDetails}
                    setTripDetails={setTripDetails}
                  />
                ))}
              </DaysContainer>
            ) : (
              <DaysContainer>
                <Typography>
                  {i18n.formatMessage({ id: "trip_details_no_days" })}
                </Typography>
              </DaysContainer>
            )}
          </Grid>
        </DaysDetailsWrapper>
      </Grid>
    </>
  );
}

const DaysDetailsWrapper = styled.div`
  width: 80vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const AddButtonWrapper = styled.div`
  width: 80vw;
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
`;

const DaysContainer = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
