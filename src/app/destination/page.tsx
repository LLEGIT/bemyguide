"use client";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { DestinationViewModel } from "@/ViewModel/Destination/DestinationViewModel";
import { Destination, Image } from "@/Models/Destination/DestinationModel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DestinationImageGalery from "@/components/DestinationImageGalery/destinationimagegalery";
import Box from "@mui/material/Box";
import React from "react";
import { AuthContext } from "@/context/AuthContext";
import DestinationMap from "@/components/DestinationMap/destinationMap";
import { useIntl } from "react-intl";
import DestinationTabs from "@/components/DestinationTabs/destinationtabs";
import { ModificationSuggestionForm } from "@/components/ModificationSuggestionForm/ModificationSuggestionForm";
import DestinationHeader from "@/components/DestinationHeader";
import { LinearProgress } from "@mui/material";

export default function DestinationPageDetails() {
  const i18n = useIntl();
  const searchParams = useSearchParams();
  const [destinationDetails, setDestinationDetails] = useState<Destination>();
  const [destinationImages, setDestinationImages] = useState<Image[]>();
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const { userContext } = useContext(AuthContext);
  const id = searchParams.get("id") as string;
  useEffect(() => {
    DestinationViewModel.onRead(
      id,
      setDestinationDetails,
      setDestinationImages
    );
  }, [id]);

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
        <>
          <DestinationHeader
            destinationDetails={destinationDetails}
            setSuggestionModalOpen={setSuggestionModalOpen}
            userContext={userContext}
          />

          <Box sx={{ width: "100%" }} marginBottom="20px">
            <DestinationTabs selectedTab={0} destinationId={id} />
          </Box>

          {destinationDetails ? (
            <>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
                marginBottom="20px"
              >
                <DestinationMap
                  latitude={destinationDetails.coordinates.lat}
                  longitude={destinationDetails.coordinates.long}
                />
              </Box>
              <Box sx={{ width: "100%" }} marginBottom="20px">
                <Typography variant="h2" fontSize="24px" marginBottom="20px">
                  {destinationDetails.name &&
                    i18n.formatMessage({ id: destinationDetails.name })}
                </Typography>
                {destinationImages && (
                  <DestinationImageGalery images={destinationImages} />
                )}
              </Box>
            </>
          ) : (
            <Box width="100%" padding={{ xs: 10, lg: 20 }}>
              <LinearProgress />
            </Box>
          )}
        </>
      </Grid>
    </>
  );
}
