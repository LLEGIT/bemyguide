"use client";
import { ArrowCircleLeft } from "@mui/icons-material";
import { Chip, Link } from "@mui/material";
import { useState } from "react";
import { useIntl } from "react-intl";

export default function GoBackButton(data?: any) {
  const i18n = useIntl();
  const [hoverElement, setHoverElement] = useState<boolean>(false);

  return (
    <Link
      href={data?.url ?? "/"}
      underline="none"
      color="black"
      fontFamily="sans-serif"
      fontSize="14px"
      onMouseEnter={() => setHoverElement(true)}
      onMouseLeave={() => setHoverElement(false)}
    >
      <Chip color={hoverElement ? "primary" : "default"} icon={<ArrowCircleLeft />} sx={{cursor: "pointer"}} label={i18n.formatMessage({ id: "go_back" })} />
    </Link>
  );
}
