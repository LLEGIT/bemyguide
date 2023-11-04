"use client";
import { useIntl } from "react-intl";

export default function Header() {
  const i18n = useIntl();
  return (
    <head>
      <title>{i18n.formatMessage({ id: "app_head_title" })}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content={i18n.formatMessage({ id: "app_head_description" })}
      />
      <link rel="icon" href="/favicon.svg" />
    </head>
  );
}
