"use client";
import AdministrationCard from "@/components/AdministrationCard/AdministrationCard";
import { AdministrationElements } from "@/utils/administrationElements";
import { Grid } from "@mui/material";

export default function administration() {
  return (
    <Grid container>
      <Grid container margin={{ xs: "22px 0", lg: "22px 12%" }}>
        {AdministrationElements.map((element) => (
          <AdministrationCard component={element} key={element.id} />
        ))}
      </Grid>
    </Grid>
  );
}
