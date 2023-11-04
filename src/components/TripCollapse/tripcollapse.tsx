import { useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Explore,
  LocalActivity,
  People,
  TipsAndUpdates,
} from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import Link from "next/link";
import React from "react";
import { useIntl } from "react-intl";
import { Routes } from "@/utils/routes";

interface UserTripCollapseProps {
  tripName: string;
  tripId: string;
}

export default function TripCollapse({
  tripName,
  tripId,
}: UserTripCollapseProps) {
  const i18n = useIntl();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Grid item xs={12}>
        <List
          sx={{ width: "100%" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <Explore sx={{ color: blue[400] }} />
            </ListItemIcon>
            <ListItemText primary={i18n.formatMessage({ id: tripName })} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Link href={Routes.Trip_Details(tripId)}>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <TipsAndUpdates sx={{ color: blue[300] }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={i18n.formatMessage({ id: "trips_list_details" })}
                  />
                </ListItemButton>
              </List>
            </Link>
            <Link href={Routes.Trip_Steps(tripId)}>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <LocalActivity sx={{ color: blue[300] }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={i18n.formatMessage({ id: "trips_list_steps" })}
                  />
                </ListItemButton>
              </List>
            </Link>
            <Link href={Routes.Trip_Companions(tripId)}>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <People sx={{ color: blue[300] }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={i18n.formatMessage({
                      id: "trips_list_companions",
                    })}
                  />
                </ListItemButton>
              </List>
            </Link>
            {/* <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <GetApp sx={{ color: blue[300] }} />
                </ListItemIcon>
                <ListItemText
                  primary={i18n.formatMessage({ id: "trips_list_export" })}
                />
              </ListItemButton>
            </List> */}
          </Collapse>
        </List>
      </Grid>
    </>
  );
}
