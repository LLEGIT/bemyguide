"use client";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { DestinationViewModel } from "@/ViewModel/Destination/DestinationViewModel";
import { Destination } from "@/Models/Destination/DestinationModel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ProductsTable from "@/components/Table/productstable";
import Box from "@mui/material/Box";
import React from "react";
import { useIntl } from "react-intl";
import DestinationTabs from "@/components/DestinationTabs/destinationtabs";
import DestinationHeader from "@/components/DestinationHeader";
import { AuthContext } from "@/context/AuthContext";
import { ModificationSuggestionForm } from "@/components/ModificationSuggestionForm/ModificationSuggestionForm";
import { LinearProgress } from "@mui/material";

export default function DestinationPagePrices() {
  const i18n = useIntl();
  const searchParams = useSearchParams();
  const [destinationDetails, setDestinationDetails] = useState<Destination>();
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const id: any = searchParams.get("id");
  const { userContext } = useContext(AuthContext);

  useEffect(() => {
    DestinationViewModel.onRead(id, setDestinationDetails);
  }, []);

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
            <DestinationTabs selectedTab={1} destinationId={id} />
          </Box>

          {destinationDetails ? (
            destinationDetails.informations?.products ? (
              <ProductsTable
                products={destinationDetails.informations.products}
              />
            ) : (
              <Typography fontSize="16px">
                {i18n.formatMessage({ id: "destinationDetails_error" })}
              </Typography>
            )
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
