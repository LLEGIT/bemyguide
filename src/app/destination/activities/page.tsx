"use client";
import {
  Destination,
  DestinationActivity,
} from "@/Models/Destination/DestinationModel";
import DestinationActivitiesMap from "@/components/DestinationActivitiesMap/destinationActivitiesMap";
import DestinationTabs from "@/components/DestinationTabs/destinationtabs";
import fetchDestinationActivities from "@/utils/fetchDestinationActivities";
import { Box, Grid, Skeleton } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import DestinationHeader from "@/components/DestinationHeader";
import { ModificationSuggestionForm } from "@/components/ModificationSuggestionForm/ModificationSuggestionForm";
import { AuthContext } from "@/context/AuthContext";

export default function DestinationActivities() {
  const [destinationActivities, setDestinationActivities] =
    useState<[Destination, DestinationActivity[]]>();
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const { userContext } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const id: string = searchParams.get("id") ?? "";

  useEffect(() => {
    if (id && !destinationActivities) {
      fetchDestinationActivities(id, setDestinationActivities);
    }
  }, [destinationActivities]);

  return (
    <>
      {destinationActivities?.[0] && userContext?.id && (
        <ModificationSuggestionForm
          open={suggestionModalOpen}
          handleClose={() => setSuggestionModalOpen(false)}
          destination={destinationActivities?.[0]}
        />
      )}
      <Grid container padding={{ xs: "22px", lg: "20px 15%" }}>
        <>
          <DestinationHeader
            destinationDetails={destinationActivities?.[0]}
            setSuggestionModalOpen={setSuggestionModalOpen}
            userContext={userContext}
          />
          <Box sx={{ width: "100%" }} marginBottom="20px">
            <DestinationTabs selectedTab={3} destinationId={id} />
          </Box>
        </>

        {(destinationActivities && (
          <Grid item xs={12}>
            <DestinationActivitiesMap activities={destinationActivities} />
          </Grid>
        )) || (
          <Grid item xs={12}>
            <Skeleton variant="rectangular" width="100%" height={600} />
          </Grid>
        )}
      </Grid>
    </>
  );
}
