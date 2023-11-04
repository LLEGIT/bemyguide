import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import { CircularProgress, useMediaQuery } from "@mui/material";
import { useIntl } from "react-intl";
import { AdministrationComponent } from "@/Models/Administration/AdministrationModel";
import { useState } from "react";

interface AdministrationCardProps {
  component: AdministrationComponent;
}

export default function AdministrationCard({
  component,
}: AdministrationCardProps) {
  const i18n = useIntl();
  const matches = useMediaQuery("(min-width:1200px)");
  const title = i18n.formatMessage({ id: component.title });

  const [image, setImage] = useState("");

  import(`../../assets/${component.image}`).then((module) => {
    setImage(module.default.src);
  });

  return (
    <Grid
      item
      xs={12}
      margin="auto"
      maxWidth={{ xs: 345, lg: 450 }}
      padding={{ xs: "0 22px 22px" }}
    >
      <Card>
        <CardActionArea href={component.route}>
          {image ? (
            <CardMedia
              component="img"
              height={matches ? 250 : 140}
              image={image}
              alt={title}
            />
          ) : (
            <CircularProgress />
          )}
          <CardContent>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
