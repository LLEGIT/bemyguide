"use client";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Image404 from "./../../assets/undraw_404.svg";

export default function Error404() {
  return (
    <Grid
      container
      maxWidth="100%"
      width="100%"
      paddingTop="25px"
      paddingBottom="25px"
      sx={{ backgroundColor: "black", position: "sticky", bottom: 0, left: 0 }}
    >
      <Image alt="404 image" src={Image404} width="400" height="300" />
    </Grid>
  );
}
