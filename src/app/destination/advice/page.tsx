"use client";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { DestinationViewModel } from "@/ViewModel/Destination/DestinationViewModel";
import { Advice, Destination } from "@/Models/Destination/DestinationModel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import { useIntl } from "react-intl";
import DestinationTabs from "@/components/DestinationTabs/destinationtabs";
import { Chip, Skeleton } from "@mui/material";
import { Lightbulb, SentimentDissatisfiedTwoTone } from "@mui/icons-material";
import { AuthContext } from "@/context/AuthContext";
import { ModificationSuggestionForm } from "@/components/ModificationSuggestionForm/ModificationSuggestionForm";
import DestinationHeader from "@/components/DestinationHeader";

export default function TripPageAdvice() {
  const i18n = useIntl();
  const searchParams = useSearchParams();
  const [destinationAdvices, setDestinationAdvices] = useState<Array<Advice>>();
  const [destinationDetails, setDestinationDetails] = useState<Destination>();
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const { userContext } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const id: string = searchParams.get("id") ?? "";

  useEffect(() => {
    if (!destinationAdvices) {
      DestinationViewModel.getAdvice(id, setDestinationAdvices, setLoading);
    }
    if (!destinationDetails) {
      DestinationViewModel.onRead(id, setDestinationDetails);
    }
  }, [destinationAdvices, id, destinationDetails]);

  return (
    <>
      {destinationDetails && userContext?.id && (
        <ModificationSuggestionForm
          open={suggestionModalOpen}
          handleClose={() => setSuggestionModalOpen(false)}
          destination={destinationDetails}
        />
      )}
      <Grid container padding={{ xs: "22px", lg: "20px 15%" }}>
        <Grid item xs={12}>
          <DestinationHeader
            destinationDetails={destinationDetails}
            setSuggestionModalOpen={setSuggestionModalOpen}
            userContext={userContext}
          />
          <Box sx={{ width: "100%" }} marginBottom="20px">
            <DestinationTabs selectedTab={4} destinationId={id} />
          </Box>
        </Grid>
        <Grid item xs={12} marginBottom={5}>
          <Chip
            sx={{ fontSize: 16, fontWeight: "bold" }}
            color="info"
            label={i18n.formatMessage({ id: "destination_advice_title" })}
            icon={<Lightbulb />}
          />
        </Grid>

        {(loading && (
          <Grid item xs={12} display="flex" flexDirection="column" gap={5}>
            <Skeleton
              variant="rectangular"
              width="100%"
              sx={{ height: { xs: 250, lg: 125 } }}
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              sx={{ height: { xs: 250, lg: 125 } }}
            />
          </Grid>
        )) ||
          (destinationAdvices && (
            <Grid
              marginBottom={destinationAdvices ? 50 : 0}
              item
              xs={12}
              display="flex"
              flexDirection="column"
              gap={5}
            >
              {destinationAdvices.map((advice) => (
                <Box
                  padding={3}
                  width="100%"
                  sx={{ backgroundColor: "#F1F1F1" }}
                  border="2px solid #BBBBBB"
                >
                  <Typography textAlign="justify" variant="body1">
                    {advice.rawText}
                  </Typography>
                </Box>
              ))}
            </Grid>
          )) || (
            <Chip
              icon={<SentimentDissatisfiedTwoTone />}
              label={i18n.formatMessage({ id: "destination_advice_empty" })}
              color="warning"
            />
          )}
      </Grid>
    </>
  );
}
