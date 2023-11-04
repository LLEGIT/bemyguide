"use client";
import Grid from "@mui/material/Grid";
import Footer from "../components/Footer/footer";
import NavBar from "../components/Navbar/navbar";
import { AuthProvider } from "@/context/AuthContext";
import { IntlProvider } from "react-intl";
import { defaultLocale, languages } from "@/middleware/localisation";
import { frMessages } from "@/Locales/fr/frMessages";
import Header from "@/components/Header/Header";
import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";
import { ToastContainer } from "react-toastify";
import RedirectRoutes from "@/components/RedirectRoutes";
import { Routes } from "@/utils/routes";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const redirectRoutes = [Routes.Login, Routes.Register];
  const protectedRoutes = [Routes.Administration];
  const loggedInRoutes = [Routes.Profile, Routes.Trip_Index];
  return (
    <html>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
      >
        <AuthProvider>
          <IntlProvider
            locale={languages[0]}
            defaultLocale={defaultLocale}
            messages={frMessages}
          >
            <Header />
            <body>
              <ToastContainer />
              <Grid
                container
                sx={{
                  minHeight: "100vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Grid item xs={12} sx={{ minHeight: "87px" }}>
                  <NavBar />
                </Grid>
                <div style={{ flex: 1, maxWidth: "100%" }}>
                  <RedirectRoutes
                    redirectRoutes={redirectRoutes}
                    protectedRoutes={protectedRoutes}
                    loggedInRoutes={loggedInRoutes}
                  >
                    {children}
                  </RedirectRoutes>
                </div>
                <Grid item xs={12} sx={{ minHeight: "70px" }}>
                  <Footer />
                </Grid>
              </Grid>
            </body>
          </IntlProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </html>
  );
}
