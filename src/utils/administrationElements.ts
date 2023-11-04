import { AdministrationComponent } from "@/Models/Administration/AdministrationModel";
import { Routes } from "./routes";

export const AdministrationElements: AdministrationComponent[] = [
  {
    id: 1,
    route: Routes.Administration_Destinations,
    title: "destination_title",
    image: "placeholder_destination.png",
  },
  {
    id: 2,
    route: Routes.Administration_Suggestions,
    title: "administration_suggestions_title",
    image: "placeholder_suggestion.png",
  },
];
