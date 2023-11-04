"use client";
import Grid from "@mui/material/Grid";
import TripCollapse from "@/components/TripCollapse/tripcollapse";
import Typography from "@mui/material/Typography";
import Filter from "@/components/Filter/Filter";
import { useContext, useState } from "react";
import { ApiUrls, apiUrl } from "@/Configs/ApiConfigs";
import { AuthContext } from "@/context/AuthContext";
import { useIntl } from "react-intl";
import { TripModel, UserTrips } from "@/Models/Trip/TripModel";
import { Method, commonFetcher, CommonApiResponse } from "@/utils/fetcher";
import { useEffectAsync } from "@/hooks/useEffectAsync";

export default function Trip() {
  const i18n = useIntl();
  const [trips, setTrips] = useState<Array<TripModel> | null>();

  const [selectedFilter, setSelectedFilter] = useState<TripModel | null>(null);
  const { userContext } = useContext(AuthContext);

  useEffectAsync(async () => {
    if (!trips && userContext?.id) {
      const response: CommonApiResponse<UserTrips> = await commonFetcher({
        url: apiUrl(ApiUrls.USER_TRIPS(userContext?.id)),
        method: Method.GET,
      });

      setTrips(response?.data?.trip);
    }
  }, [trips, userContext?.id]);

  const filteredTrips = selectedFilter
    ? trips?.filter((trip) =>
        trip.destination?.name.startsWith(selectedFilter.destination?.name)
      )
    : trips;

  return (
    <Grid container>
      <Grid
        container
        padding={{ xs: "22px", lg: 0 }}
        paddingBottom={{ xs: 0, lg: 0 }}
        margin={{ xs: 0, lg: "22px 15%" }}
      >
        <Grid item xs={12} marginTop="12px" marginBottom="24px">
          <Typography
            fontWeight="700"
            variant="h1"
            fontSize={{ xs: "20px" }}
            textAlign="center"
          >
            {i18n.formatMessage({ id: "navbar_trips_label" })}
          </Typography>
        </Grid>
        {trips && (
          <Filter
            options={trips}
            onSelect={(value) => setSelectedFilter(value)}
          />
        )}
        {filteredTrips &&
          filteredTrips.map((trip: TripModel) => (
            <TripCollapse
              key={trip._id}
              tripName={trip?.name || trip?.destination?.name}
              tripId={trip?._id}
            />
          ))}
        {trips?.length === 0 && (
          <Typography
            fontWeight="700"
            variant="h1"
            fontSize={{ xs: "20px" }}
            textAlign="center"
            style={{ marginTop: "20px" }}
          >
            {i18n.formatMessage({ id: "trips_list_empty" })}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
