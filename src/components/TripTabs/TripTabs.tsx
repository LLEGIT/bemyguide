import { Button, Grid, Link, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { useSearchParams } from "next/navigation";
import { Routes } from "@/utils/routes";

export default function TripTabs(selectedTab: any) {
  const i18n = useIntl();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const searchParams = useSearchParams();
  const id: string | null = searchParams.get("id");

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = ["details", "steps", "companions"];

  return (
    <>
      {/* MOBILE */}
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          marginBottom: "20px",
        }}
      >
        <Button
          sx={{ padding: 0, display: { xs: "flex", md: "none" } }}
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          endIcon={open ? <ExpandLess /> : <ExpandMoreIcon />}
        >
          {i18n.formatMessage({ id: "params" })}
        </Button>
        <Menu
          sx={{
            padding: 0,
            display: { xs: "flex", md: "none" },
          }}
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 52 * 4.5,
              width: "20ch",
            },
          }}
        >
          {options.map((option, key) => (
            <Link
              key={key}
              href={Routes.Trip_Dynamic_Path(option, id as string)}
              underline="none"
            >
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
                {i18n.formatMessage({ id: "trips_list_" + option })}
              </MenuItem>
            </Link>
          ))}
        </Menu>

        {/* WEB */}
        <Tabs
          value={selectedTab.value}
          aria-label="Tabs where selection follows focus"
          selectionFollowsFocus
          sx={{ padding: 0, display: { xs: "none", md: "block" } }}
        >
          {options.map((option, key) => (
            <Link key={key} href={`${`/trip/${option}?id=${id}`}`}>
              <Tab
                id={(key - 1).toString()}
                label={i18n.formatMessage({ id: "trips_list_" + option })}
              />
            </Link>
          ))}
        </Tabs>
      </Grid>
    </>
  );
}
