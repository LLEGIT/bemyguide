"use client";
import AdministrationDestinationDetails from "../[destinationId]/edit/page";

export default function AdministrationDestinationCreate() {
  return AdministrationDestinationDetails({ params: { destinationId: "create" } });
}
