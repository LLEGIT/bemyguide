"use client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import { useIntl } from "react-intl";
import { useSearchParams } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { useEffectAsync } from "@/hooks/useEffectAsync";
import NotFound from "@/app/not-found";
import { Routes } from "@/utils/routes";
import { InvitationModel, TripModel } from "@/Models/Trip/TripModel";
import { CommonToastSuccessWithTitle } from "@/utils/toast";
import { TripViewModel } from "@/ViewModel/Trip/TripViewModel";
import styled from "@emotion/styled";
import {
  ApproveButton,
  RejectButton,
  SubmitButton,
} from "@/components/Buttons/Buttons";

export default function TripDetails() {
  const i18n = useIntl();
  const { userContext } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const searchParams = useSearchParams();
  const tripId: string | null = searchParams.get("id");

  const [tripDetails, setTripDetails] = useState<TripModel>();

  useEffectAsync(async () => {
    if (tripId) {
      setTripDetails(await TripViewModel.onFetchMinimumInformations(tripId));
      setLoading(false);
    }
  }, [tripId, userContext?.id]);

  const handleRefuse = async () => {
    if (tripId) {
      const body: InvitationModel = {
        userId: userContext?.id as string,
        accepted: false,
      };
      await TripViewModel.onHandleInvitation(tripId, body);
      CommonToastSuccessWithTitle("trip_invitation_invited_refused");
      router.push(Routes.Index);
    }
  };

  const handleAccept = async () => {
    if (tripId) {
      const body: InvitationModel = {
        userId: userContext?.id as string,
        accepted: true,
      };
      await TripViewModel.onHandleInvitation(tripId, body);
      CommonToastSuccessWithTitle("trip_invitation_invited_success");
      router.push(Routes.Trip_Details(tripId as string));
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
      ) : tripDetails?.invitedUsers && userContext ? (
        <>
          {tripDetails.invitedUsers.length > 0 && (
            <Box width="100%" marginTop={2}>
              {tripDetails.invitedUsers.includes(userContext.email) && (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <CustomTypography variant="h1">
                    {i18n.formatMessage({
                      id: "trip_invitation_invited_intro",
                    })}
                  </CustomTypography>
                  <Box
                    display="flex"
                    flexDirection={{ xs: "column", lg: "row" }}
                    gap={2}
                    padding="0 22px"
                  >
                    <ApproveButton
                      label={i18n.formatMessage({
                        id: "trip_invitation_invited_accept",
                      })}
                      onClick={handleAccept}
                    />
                    <RejectButton
                      label={i18n.formatMessage({
                        id: "trip_invitation_invited_refuse",
                      })}
                      onClick={handleRefuse}
                    />
                  </Box>
                </Box>
              )}
              {(tripDetails.users as string[]).includes(userContext.id) && (
                <>
                  <CustomTypography variant="h1">
                    {i18n.formatMessage({
                      id: "trip_invitation_invited_already_exist",
                    })}
                  </CustomTypography>
                  <SubmitButton
                    label={i18n.formatMessage({
                      id: "trip_invitation_invited_already_exist_button",
                    })}
                    onClick={() =>
                      router.push(Routes.Trip_Details(tripId as string))
                    }
                  />
                </>
              )}
              {!tripDetails.invitedUsers.includes(userContext.email) &&
                !(tripDetails.users as string[]).includes(userContext.id) && (
                  <CustomTypography variant="h1">
                    {i18n.formatMessage({
                      id: "trip_invitation_not_invited",
                    })}
                  </CustomTypography>
                )}
            </Box>
          )}
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
