import {
  Destination,
  DestinationActivity,
} from "@/Models/Destination/DestinationModel";
import { Box, Typography } from "@mui/material";
import {
  GoogleMap,
  InfoWindowF,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";
import { useIntl } from "react-intl";

export default function DestinationActivitiesMap({
  activities,
}: {
  activities: [Destination, DestinationActivity[]];
}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "default",
  });

  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const center = useMemo(
    () => ({
      lat: activities[0]?.coordinates?.lat,
      lng: activities[0]?.coordinates?.long,
    }),
    []
  );
  const containerStyle = {
    width: "100%",
    height: "600px",
  };
  const i18n = useIntl();

  return (
    <>
      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          {activities[1] &&
            activities[1].map(
              (destinationActivity: DestinationActivity, index: number) => (
                <Marker
                  key={index}
                  position={{
                    lat: destinationActivity?.geoCode.latitude,
                    lng: destinationActivity?.geoCode?.longitude,
                  }}
                  onClick={() => setSelectedMarker(index)}
                >
                  {selectedMarker === index && (
                    <InfoWindowF
                      key={index}
                      onCloseClick={() => setSelectedMarker(null)}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", lg: "row" },
                          alignItems: "flex-start",
                          gap: 2,
                          maxWidth: "fit-content",
                        }}
                      >
                        {destinationActivity?.pictures &&
                          destinationActivity.pictures.length > 0 && (
                            <img
                              style={{ maxWidth: 150, height: "auto" }}
                              src={destinationActivity.pictures[0]}
                              alt={destinationActivity.name}
                            />
                          )}
                        <Box>
                          <Typography variant="body1" fontSize={11}>
                            {destinationActivity?.name}
                          </Typography>
                          {destinationActivity?.shortDescription && (
                            <Typography variant="body2" fontSize={11}>
                              {destinationActivity.shortDescription.substring(
                                0,
                                150
                              )}
                              ...
                            </Typography>
                          )}
                          {destinationActivity?.bookingLink && (
                            <a href={destinationActivity.bookingLink} target="_blank">
                              {i18n.formatMessage({
                                id: "destination_activities_see_more",
                              })}
                            </a>
                          )}
                          {destinationActivity?.rating && (
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              fontSize={11}
                            >
                              {destinationActivity.rating}/5
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </InfoWindowF>
                  )}
                </Marker>
              )
            )}
        </GoogleMap>
      )}
    </>
  );
}
