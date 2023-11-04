import { ApiUrls, apiUrl } from "@/Configs/ApiConfigs";
import { CommonApiResponse, Method, commonFetcher } from "./fetcher";
import {
  Destination,
  DestinationActivity,
} from "@/Models/Destination/DestinationModel";

export default async function fetchDestinationActivities(
  destinationId: string,
  setDestinationActivities: (
    result: [Destination, DestinationActivity[]]
  ) => void
): Promise<[Destination, DestinationActivity[]]> {
  const response: CommonApiResponse<[Destination, DestinationActivity[]]> =
    await commonFetcher({
      url: apiUrl(ApiUrls.DESTINATION_ACTIVITIES(destinationId)),
      method: Method.GET,
      withCredentials: true,
    });

  setDestinationActivities(response?.data);

  return response?.data;
}
