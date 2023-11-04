"use client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import GoBackButton from "../../../components/GoBackButton/GoBackButton";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TripTabs from "../../../components/TripTabs/TripTabs";
import { useIntl } from "react-intl";
import { useSearchParams } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { useEffectAsync } from "@/hooks/useEffectAsync";
import dayjs from "dayjs";
import NotFound from "@/app/not-found";
import { Routes } from "@/utils/routes";
import {
  AddTripPlanningModel,
  TripModel,
  UpdateTripUsersModel,
} from "@/Models/Trip/TripModel";
import { CommonToastSuccessWithTitle } from "@/utils/toast";
import { TripViewModel } from "@/ViewModel/Trip/TripViewModel";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import { Destination } from "@/Models/Destination/DestinationModel";
import { DestinationViewModel } from "@/ViewModel/Destination/DestinationViewModel";
import DatePicker from "@/components/DatePicker";
import styled from "@emotion/styled";
import checkAccessToTrip from "@/utils/checkAccessToTrip";

export default function TripDetails() {
  const i18n = useIntl();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const searchParams = useSearchParams();
  const { userContext } = useContext(AuthContext);
  const tripId: string | null = searchParams.get("id");

  const [tripDetails, setTripDetails] = useState<TripModel>();
  const [destinations, setDestinations] = useState<Destination[] | undefined>();

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
      const response = await TripViewModel.onFetch(tripId);
      setTripDetails(response);
      setLoading(false);
    }
    setDestinations(await DestinationViewModel.getAll());
  }, [tripId, userContext?.id]);

  const handleDelete = async () => {
    if (tripId) {
      await TripViewModel.onDelete(tripId);
      CommonToastSuccessWithTitle("toast_success_trip_deleted");
      router.push(Routes.Trip_Index);
    }
  };

  const handleChange = (value: any) => {
    const selectedDestination = destinations?.find(
      (destination) => destination._id === value
    );

    setTripDetails((prevTripDetails: any) => ({
      ...prevTripDetails,
      destination: {
        ...selectedDestination,
      },
    }));
  };

  const saveEdition = async () => {
    if (tripId && tripDetails) {
      await TripViewModel.onUpdate(tripId, tripDetails as UpdateTripUsersModel);
      CommonToastSuccessWithTitle("trip_details_edition_success");
    }
  };

  const handleSetPlanning = async (date: Date) => {
    if (tripId) {
      const body: AddTripPlanningModel = {
        days: {
          day: date,
        },
        updatedBy: userContext?.id as string,
      };
      setTripDetails(await TripViewModel.onAddPlanning(tripId, body));
      CommonToastSuccessWithTitle("toast_success_trip_planning");
    }
  };

  return (
    <Grid container>
      {loading ? (
        <Grid
          display="flex"
          alignItems={"center"}
          sx={{ m: "auto" }}
          height="calc(100vh - 159px)"
        >
          <CircularProgress />
        </Grid>
      ) : tripDetails ? (
        <>
          <Grid
            container
            padding={{ xs: "22px", lg: 0 }}
            paddingBottom={{ xs: 0, lg: 0 }}
            margin={{ xs: 0, lg: "22px 15%" }}
          >
            <GoBackButton url={Routes.Trip_Index} />
            {tripDetails && (
              <Grid item xs={12} marginTop="12px" marginBottom="12px">
                <Typography
                  fontWeight="700"
                  variant="h1"
                  fontSize={{ xs: "20px" }}
                  textAlign="center"
                >
                  {i18n.formatMessage({ id: "trip_details_title" })}{" "}
                  {i18n.formatMessage({ id: "common_to" })}{" "}
                  {i18n.formatMessage({
                    id: tripDetails?.destination?.name,
                  })}
                </Typography>
              </Grid>
            )}

            <Box sx={{ width: "100%" }}>
              <TripTabs value={0} id={tripId} />
            </Box>
            <FormControl sx={{ mx: "auto", width: 500, marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-standard-label">
                {i18n.formatMessage({
                  id: "trip_details_name",
                })}
              </InputLabel>

              <Select
                fullWidth
                label={i18n.formatMessage({
                  id: "trip_details_name",
                })}
                variant="outlined"
                value={tripDetails?.destination._id}
                onChange={(e) => handleChange(e.target.value)}
                sx={{
                  marginBottom: "20px",
                }}
              >
                {destinations?.map((destination: Destination) => (
                  <MenuItem key={destination._id} value={destination._id}>
                    {i18n.formatMessage({
                      id: destination?.name,
                    })}
                  </MenuItem>
                ))}
              </Select>
              {!tripDetails.planning && (
                <DatePicker handleAction={handleSetPlanning} />
              )}
              {tripDetails.planning && (
                <>
                  {tripDetails.planning.days.length > 0 && (
                    <CustomTypography>
                      {i18n.formatMessage({
                        id: "trip_details_first_day",
                      })}{" "}
                      :{" "}
                      {tripDetails.planning.days.length > 0 &&
                        dayjs(tripDetails.planning.days[0].day).format(
                          "DD/MM/YYYY"
                        )}
                    </CustomTypography>
                  )}
                  {tripDetails.planning.days.length > 1 && (
                    <CustomTypography>
                      {i18n.formatMessage({
                        id: "trip_details_last_day",
                      })}{" "}
                      :{" "}
                      {tripDetails.planning.days.length > 1 &&
                        dayjs(
                          tripDetails.planning.days[
                            tripDetails.planning.days.length - 1
                          ].day
                        ).format("DD/MM/YYYY")}
                    </CustomTypography>
                  )}
                </>
              )}
              <>
                <Button
                  sx={{ marginTop: "16px" }}
                  variant="contained"
                  size="large"
                  onClick={saveEdition}
                >
                  {i18n.formatMessage({ id: "save_edition" })}
                </Button>
                {/* <Button
                  sx={{ marginTop: "16px", marginBottom: 1 }}
                  variant="outlined"
                  size="large"
                >
                  {i18n.formatMessage({ id: "trips_list_export" })}
                </Button> */}
                <ConfirmationModal
                  title="trip_deletion_confirmation_modal_title"
                  content="trip_deletion_confirmation_modal_content"
                  button="trip_deletion_confirmation_modal_button"
                  innerButton="trip_deletion_confirmation_modal_button"
                  callback={handleDelete}
                />
              </>
            </FormControl>
          </Grid>
        </>
      ) : (
        <NotFound />
      )}
    </Grid>
  );
}

const CustomTypography = styled(Typography)`
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
  variant="h1"
`;
