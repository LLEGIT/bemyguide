import { frAdministration } from "./frAdministration";
import { frApp } from "./frApp";
import { frCurrencies } from "./frCurrencies";
import { frDestinations } from "./frDestinations";
import { frProducts } from "./frProducts";
import { frToasts } from "./frToasts";
import { frTrips } from "./frTrips";
import { frUsers } from "./frUsers";
import { frTermsAndConditions } from "./frTermsAndConditions";

export const frMessages = {
  lang: "fr",
  ...frApp,
  ...frDestinations,
  ...frProducts,
  ...frToasts,
  ...frTrips,
  ...frUsers,
  ...frAdministration,
  ...frCurrencies,
  ...frTermsAndConditions
};
