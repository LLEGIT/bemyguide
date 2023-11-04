"use client";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import PersonalProfile from "@/components/Profile/PersonalProfile";
import OthersProfile from "@/components/Profile/OthersProfile";
import { CircularProgress, Grid } from "@mui/material";

export default function UserProfile() {
  const { userContext } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const username: string | null = searchParams.get("username");

  return (
    <Grid container padding={{ xs: "22px", lg: "20px 29%" }}>
      {!userContext || !username ? (
        <Grid
          display="flex"
          alignItems="center"
          sx={{ mx: "auto", width: 100 }}
        >
          <CircularProgress />
        </Grid>
      ) : userContext?.username === username ? (
        // User's personal datas editable
        <PersonalProfile />
      ) : (
        // User's public datas
        <OthersProfile />
      )}
    </Grid>
  );
}
