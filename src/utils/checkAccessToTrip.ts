import { TripModel } from "@/Models/Trip/TripModel";
import { TripViewModel } from "@/ViewModel/Trip/TripViewModel";

export default async function checkAccessToTrip(tripId: string, userId: string): Promise<boolean> {
  const trip: TripModel = await TripViewModel.onFetchMinimumInformations(tripId);
  if (!trip) return false;
  if ((trip.users as string[])?.includes(userId)) return true;
  return false;
}