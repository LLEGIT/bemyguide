"use client";
import DestinationCard from "@/components/DestinationCard/destinationcard";
import SearchBar from "@/components/Searchbar/searchbar";
import useDebounce from "@/hooks/useDebounce";
import { useEffectAsync } from "@/hooks/useEffectAsync";
import { Destination } from "@/Models/Destination/DestinationModel";
import { DestinationViewModel } from "@/ViewModel/Destination/DestinationViewModel";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useIntl } from "react-intl";

export default function Home() {
  const i18n = useIntl();
  const [searchVal, setSearchVal] = useState("");
  const [searched, setSearched] = useState(false);
  const debouncedSearch = useDebounce(searchVal, 500);
  const [destinations, setDestinations] = useState<Array<Destination>>([]);
  const [originalDestinations, setOriginalDestinations] = useState<
    Array<Destination>
  >([]);

  useEffectAsync(async () => {
    setOriginalDestinations(await DestinationViewModel.getSuggestions());
  }, []);

  return (
    <Grid container>
      <Grid
        container
        padding={{ xs: "22px", lg: 0 }}
        margin={{ xs: 0, lg: "22px 15%" }}
      >
        <Grid item xs={12} marginTop="12px">
          <Typography
            fontWeight="700"
            variant="h1"
            fontSize={{ xs: "20px" }}
            textAlign="center"
          >
            {i18n.formatMessage({ id: "homepage_searchbar_title" })}
          </Typography>
        </Grid>
        <Grid item xs={12} marginTop="34px">
          <SearchBar
            searchVal={searchVal}
            setSearchVal={setSearchVal}
            debouncedSearch={debouncedSearch}
            setDestinations={setDestinations}
            setSearched={setSearched}
          />
        </Grid>
      </Grid>
      <Grid
        container
        padding={{ xs: "22px", lg: 0 }}
        paddingBottom={{ xs: 0, lg: 0 }}
        margin={{ xs: 0, lg: "22px 15%" }}
        display={{xs: "block", lg: "flex"}}
        flexWrap="wrap"
        justifyContent="space-between"
      >
        {searchVal !== "" && debouncedSearch !== "" && destinations ? (
          <>
            {destinations.length > 0 ? (
              destinations.map((destination) => (
                <DestinationCard
                  destination={destination}
                  key={destination._id}
                />
              ))
            ) : (
              <LoaderWrapper>
                {searched ? (
                  i18n.formatMessage({ id: "destination_searchbar_no_result" })
                ) : (
                  <CircularProgress />
                )}
              </LoaderWrapper>
            )}
          </>
        ) : (
          <>
            {originalDestinations.length > 0 ? (
              originalDestinations.map((destination) => (
                <DestinationCard
                  destination={destination}
                  key={destination._id}
                />
              ))
            ) : (
              <LoaderWrapper>
                <CircularProgress />
              </LoaderWrapper>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
}

const LoaderWrapper = styled("div")`
  display: flex;
  margin: auto;
`;
