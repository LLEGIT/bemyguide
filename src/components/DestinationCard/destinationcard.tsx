import { Destination } from "@/Models/Destination/DestinationModel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "@mui/material";
import { useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { handleNoTranslation } from "@/utils/noTranslation";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const i18n = useIntl();
  const matches = useMediaQuery("(min-width:1200px)");
  const [translatedDestinationName, setTranslatedDestinationName] = useState(
    i18n.formatMessage({ id: destination.name })
  );

  useEffect(() => {
    if (destination.name.includes("_")) {
      const defaultTranslation = handleNoTranslation(
        translatedDestinationName,
        "destination_name"
      );
      setTranslatedDestinationName(defaultTranslation);
    }
  }, [translatedDestinationName]);

  return (
    <Grid
      item
      xs={12}
      maxWidth={{ xs: "100%", lg: "32%" }}
      marginBottom="34px"
    >
      <Card>
        <CardActionArea href={"/destination/?id=" + destination._id}>
          <CardMedia
            component="img"
            height={matches ? 250 : 140}
            image={
              destination.images &&
              destination.images.length > 0 &&
              destination.images[0].url !== ""
                ? destination.images[0].url
                : "https://via.placeholder.com/500x250"
            }
            alt={
              destination.images &&
              destination.images.length > 0 &&
              destination.images[0].alt !== ""
                ? destination.images[0].alt
                : "placeholder"
            }
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {translatedDestinationName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
