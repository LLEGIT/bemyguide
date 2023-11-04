import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useIntl } from "react-intl";
import Link from "next/link";
import { Routes } from "@/utils/routes";

interface DestinationTabsProps {
  selectedTab: number;
  destinationId: string;
}

interface LinkTab {
  url: string;
  label: string;
}

export default function DestinationTabs({
  selectedTab,
  destinationId,
}: DestinationTabsProps) {
  const i18n = useIntl();
  const linkTabs: Array<LinkTab> = [
    {url: Routes.Destination_Details(destinationId), label: i18n.formatMessage({id: "destination_tab_label_details"})},
    {url: Routes.Destination_Prices(destinationId), label: i18n.formatMessage({id: "destination_tab_label_comparison"})},
    {url: Routes.Destination_Articles(destinationId), label: i18n.formatMessage({id: "destination_tab_label_articles"})},
    {url: Routes.Destination_Activities(destinationId), label: i18n.formatMessage({id: "destination_tab_label_activities"})},
    {url: Routes.Destination_Advice(destinationId), label: i18n.formatMessage({id: "destination_tab_label_advice"})},
    {url: Routes.Destination_Comments(destinationId), label: i18n.formatMessage({id: "destination_tab_label_comments"})}
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        variant="scrollable"
        value={selectedTab}
        aria-label="Tabs where selection follows focus"
        selectionFollowsFocus
      >
        {linkTabs.map((tab: LinkTab, index: number) => (
          <Link key={index} href={tab.url}>
            <Tab
              id={index.toString()}
              label={tab.label}
            />
          </Link>
        ))}
      </Tabs>
    </Box>
  );
}
