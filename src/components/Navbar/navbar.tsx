"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Toolbar from "@mui/material/Toolbar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LocalAirport from "@mui/icons-material/LocalAirport";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Settings from "@mui/icons-material/Settings";
import Image from "next/image";
import logoClassic from "./../../assets/logo-classic.svg";
import logoResponsive from "./../../assets/logo-responsive.svg";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import React from "react";
import { useIntl } from "react-intl";
import { Avatar } from "@mui/material";
import { UserRole } from "@/Models/User/UserModel";
import { Routes } from "@/utils/routes";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [width, setWidth] = useState<null | number>(null);
  const { loggedIn, userContext, logout } = useContext(AuthContext);
  const open = Boolean(anchorEl);
  const i18n = useIntl();
  const router = useRouter();

  useEffect(() => {
    if (window) setWidth(window?.outerWidth);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (event: any) => {
    router.push(event?.currentTarget?.getAttribute("data-attr-url"));
  };

  const signOut = () => {
    logout?.();
  };

  const navbarLabel = (): string => {
    if (loggedIn) {
      return i18n.formatMessage(
        { id: "navbar_authenticated_user" },
        {
          username: userContext?.username,
        }
      );
    } else {
      return i18n.formatMessage({ id: "navbar_auth_label" });
    }
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{ borderBottom: "1px solid #919294" }}
    >
      <Toolbar disableGutters sx={{ padding: "15px 22px" }}>
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link href="/">
            <Image
              src={width && width > 640 ? logoClassic : logoResponsive}
              alt="Logo responsive"
            />
          </Link>
          <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            color="inherit"
            sx={{ padding: 0, display: { xs: "block", md: "none" } }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Box>

        {/* MOBILE */}
        {loggedIn ? (
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {userContext?.role === UserRole.ADMIN && (
              <MenuItem
                data-attr-url="/administration"
                onClick={handleNavigation}
              >
                <ListItemIcon>
                  <Settings color="success" />
                </ListItemIcon>
                <ListItemText>Administration</ListItemText>
              </MenuItem>
            )}
            <MenuItem
              data-attr-url={
                loggedIn
                  ? Routes.User_Profile(userContext?.username as string)
                  : "/login"
              }
              onClick={handleNavigation}
            >
              <ListItemIcon>
                {(userContext?.avatar && (
                  <Avatar
                    sx={{ width: 24, height: 24 }}
                    alt={userContext?.username + `'s avatar`}
                    src={
                      "data:image/png;base64," +
                      Buffer.from(userContext?.avatar as Buffer).toString("base64")
                    }
                  />
                )) || <AccountCircle color="info" />}
              </ListItemIcon>
              <ListItemText>{navbarLabel()}</ListItemText>
            </MenuItem>
            <MenuItem
              data-attr-url={Routes.Trip_Index}
              onClick={handleNavigation}
            >
              <ListItemIcon>
                <LocalAirport color="secondary" />
              </ListItemIcon>
              <ListItemText>
                {i18n.formatMessage({ id: "navbar_trips_label" })}
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={signOut}>
              <ListItemIcon>
                <Logout color="error" />
              </ListItemIcon>
              <ListItemText>
                {i18n.formatMessage({ id: "navbar_logout_label" })}
              </ListItemText>
            </MenuItem>
          </Menu>
        ) : (
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              data-attr-url={loggedIn ? "/" + userContext?.username : "/login"}
              onClick={handleNavigation}
            >
              <ListItemIcon>
                <AccountCircle color="info" />
              </ListItemIcon>
              <ListItemText>{navbarLabel()}</ListItemText>
            </MenuItem>
          </Menu>
        )}
        {/* WEB */}
        {loggedIn ? (
          <MenuList sx={{ display: { xs: "none", md: "flex" } }}>
            {userContext?.role === UserRole.ADMIN && (
              <MenuItem
                data-attr-url="/administration"
                onClick={handleNavigation}
              >
                <ListItemIcon>
                  <Settings color="success" />
                </ListItemIcon>
                <ListItemText>Administration</ListItemText>
              </MenuItem>
            )}

            <MenuItem
              data-attr-url={
                loggedIn
                  ? Routes.User_Profile(userContext?.username as string)
                  : "/login"
              }
              onClick={handleNavigation}
            >
              <ListItemIcon>
                {(userContext?.avatar && (
                  <Avatar
                    sx={{ width: 30, height: 30 }}
                    alt={userContext?.username + `'s avatar`}
                    src={
                      "data:image/png;base64," +
                      Buffer.from(userContext?.avatar as Buffer).toString("base64")
                    }
                  />
                )) || <AccountCircle color="info" />}
              </ListItemIcon>
              <ListItemText>{navbarLabel()}</ListItemText>
            </MenuItem>
            <MenuItem
              data-attr-url={Routes.Trip_Index}
              onClick={handleNavigation}
            >
              <ListItemIcon>
                <LocalAirport color="secondary" />
              </ListItemIcon>
              <ListItemText>
                {i18n.formatMessage({ id: "navbar_trips_label" })}
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={signOut}>
              <ListItemIcon>
                <Logout fontSize="medium" color="error" />
              </ListItemIcon>
              <ListItemText>
                {i18n.formatMessage({ id: "navbar_logout_label" })}
              </ListItemText>
            </MenuItem>
          </MenuList>
        ) : (
          <MenuList sx={{ display: { xs: "none", md: "flex" } }}>
            <MenuItem
              data-attr-url={
                loggedIn
                  ? Routes.User_Profile(userContext?.username as string)
                  : "/login"
              }
              onClick={handleNavigation}
            >
              <ListItemIcon>
                <AccountCircle color="info" />
              </ListItemIcon>
              <ListItemText>{navbarLabel()}</ListItemText>
            </MenuItem>
          </MenuList>
        )}
      </Toolbar>
    </AppBar>
  );
}
