"use client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import GoBackButton from "../../../components/GoBackButton/GoBackButton";
import React, { useContext, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import TripTabs from "../../../components/TripTabs/TripTabs";
import { useIntl } from "react-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { apiUrl, ApiUrls } from "@/Configs/ApiConfigs";
import { CommonApiResponse, commonFetcher, Method } from "@/utils/fetcher";
import { useEffectAsync } from "@/hooks/useEffectAsync";
import { AuthContext } from "@/context/AuthContext";
import NotFound from "@/app/not-found";
import { User } from "@/Models/User/UserModel";
import { Routes } from "@/utils/routes";
import { AddInCircleButton } from "@/components/Buttons/Buttons";
import FormModal from "@/components/Modal/FormModal";
import { TripModel } from "@/Models/Trip/TripModel";
import CompanionAvatar from "@/components/CompanionAvatar";
import { TripViewModel } from "@/ViewModel/Trip/TripViewModel";
import checkAccessToTrip from "@/utils/checkAccessToTrip";

export default function TripCompanions() {
  const i18n = useIntl();
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const tripId: string | null = searchParams.get("id");
  const router = useRouter();
  const { userContext } = useContext(AuthContext);
  const [tripDetails, setTripDetails] = useState<TripModel>();

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
      const response: CommonApiResponse<TripModel> = await commonFetcher({
        url: apiUrl(ApiUrls.TRIP_USERS(tripId)),
        method: Method.GET,
      });
      setLoading(false);
      setTripDetails(response?.data);
    }
  }, [tripId, userContext?.id]);

  const handleCompanionDelete = async (companion: User) => {
    if (tripId && companion._id) {
      setTripDetails(
        await TripViewModel.onRemoveCompanion(tripId, companion._id)
      );
    }
  };

  return (
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
        margin={{ xs: 0, lg: "22px 15%" }}
      >
        <TripTabs value={2} />
      </Box>

      {tripDetails ? (
        <Grid
          container
          margin={3}
          style={{ overflowY: "auto", height: "100%" }}
        >
          <Grid container sx={{ mx: "auto", width: 600 }}>
            <Grid container>
              <FormModal
                title={i18n.formatMessage({ id: "trip_add_companion_title" })}
                content={i18n.formatMessage({
                  id: "trip_add_companion_content",
                })}
                customButton={<AddInCircleButton />}
                innerButton="common_add"
                formLabel={i18n.formatMessage({
                  id: "trip_add_companion_form_label",
                })}
                tripDetails={tripDetails}
                setTripDetails={setTripDetails}
              />
              {tripDetails.users.map(
                (companion: User | string, index: number) => {
                  if (typeof companion === "string") {
                    return null;
                  }
                  return (
                    <CompanionAvatar
                      companion={companion}
                      handleCompanionDelete={handleCompanionDelete}
                      isAdmin={index === 0}
                    />
                  );
                }
              )}
            </Grid>
          </Grid>
        </Grid>
      ) : loading ? (
        <Grid
          display="flex"
          alignItems="center"
          sx={{ mx: "auto", width: 100 }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <NotFound />
      )}
    </Grid>
  );
}
