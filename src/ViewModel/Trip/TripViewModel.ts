import { apiUrl, ApiUrls } from "@/Configs/ApiConfigs";
import {
  AddTripDay,
  AddTripModel,
  AddTripPlanningModel,
  AddTripStep,
  InvitationModel,
  TripDay,
  TripModel,
  TripPlanning,
  TripStep,
  UpdateTripUsersModel,
} from "@/Models/Trip/TripModel";
import { CommonApiResponse, commonFetcher, Method } from "@/utils/fetcher";

export class TripViewModel {
  static async onCreate(body: AddTripModel) {
    const response: CommonApiResponse<TripModel> = await commonFetcher({
      url: apiUrl(ApiUrls.TRIPS),
        method: Method.POST,
        postBody: body,
      });
      return response.data;
  }
  static async onFetch(id: string) {
    const response: CommonApiResponse<TripModel> = await commonFetcher({
      url: apiUrl(ApiUrls.TRIP_DETAILS(id)),
      method: Method.GET,
      withCredentials: true,
    });
    return response.data;
  }
  static async onFetchDays(id: string) {
    const response: CommonApiResponse<TripModel> = await commonFetcher({
      url: apiUrl(ApiUrls.TRIP_STEPS(id)),
      method: Method.GET,
      withCredentials: true,
    });
    return response.data;
  }
  static async onFetchMinimumInformations(id: string) {
    const response: CommonApiResponse<TripModel> = await commonFetcher({
      url: apiUrl(ApiUrls.TRIP_MINIMUM_INFORMATIONS(id)),
      method: Method.GET,
      withCredentials: true,
    });
    return response.data;
  }
  static async onUpdate(id: string, body: UpdateTripUsersModel) {
    const response: CommonApiResponse<any> = await commonFetcher({
      url: apiUrl(ApiUrls.TRIP_DETAILS(id)),
      method: Method.PUT,
      postBody: body,
      withCredentials: true,
    });
    return response.data;
  }
  static async onDelete(id: string) {
    const response: CommonApiResponse<any> = await commonFetcher({
      url: apiUrl(ApiUrls.TRIP_DETAILS(id)),
      method: Method.DELETE,
      withCredentials: true,
    });
    return response.data;
  }
  static async onRemoveCompanion(id: string, userId: string) {
    const response: CommonApiResponse<TripModel> = await commonFetcher({
      url: apiUrl(ApiUrls.TRIP_USER_ID(id, userId)),
      method: Method.DELETE,
      withCredentials: true,
    });
    return response.data;
  }

  static async onAddPlanning(id: string, body: AddTripPlanningModel) {
    const response: CommonApiResponse<TripModel> = await commonFetcher({
      url: apiUrl(ApiUrls.TRIP_PLANNING(id)),
      method: Method.POST,
      postBody: body,
      withCredentials: true,
    });
    return response.data;
  }

  static async onAddDay(id: string, body: AddTripDay) {
    const response: CommonApiResponse<TripPlanning> = await commonFetcher({
      url: apiUrl(ApiUrls.TRIP_DAY_ID(id)),
      method: Method.POST,
      postBody: body,
      withCredentials: true,
    });
    return response.data;
  }

  static async onDayUpdate(id: string, body: AddTripDay) {
    const response: CommonApiResponse<TripDay> = await commonFetcher({
      url: apiUrl(ApiUrls.TRIP_DAY_ID(id)),
      method: Method.PUT,
      postBody: body,
      withCredentials: true,
    });
    return response.data;
  }

  static async onDayDelete(id: string) {
    const response: CommonApiResponse<TripDay> = await commonFetcher({
      url: apiUrl(ApiUrls.TRIP_DAY_ID(id)),
      method: Method.DELETE,
      withCredentials: true,
    });
    return response.data;
  }

  static async onAddStep(id: string, body: AddTripStep) {
    const response: CommonApiResponse<TripDay> = await commonFetcher({
      url: apiUrl(ApiUrls.TRIP_STEP_ID(id)),
      method: Method.POST,
      postBody: body,
      withCredentials: true,
    });
    return response.data;
  }

  static async onStepUpdate(id: string, body: AddTripStep) {
    const response: CommonApiResponse<TripStep> = await commonFetcher({
      url: apiUrl(ApiUrls.TRIP_STEP_ID(id)),
      method: Method.PUT,
      postBody: body,
      withCredentials: true,
    });
    return response.data;
  }

  static async onStepDelete(id: string) {
    const response: CommonApiResponse<TripStep> = await commonFetcher({
      url: apiUrl(ApiUrls.TRIP_STEP_ID(id)),
      method: Method.DELETE,
      withCredentials: true,
    });
    return response.data;
  }
  
  static async onHandleInvitation(id: string, body: InvitationModel) {
    const response: CommonApiResponse<TripModel> = await commonFetcher({
      url: apiUrl(ApiUrls.TRIP_HANDLE_INVITATION(id)),
      method: Method.PUT,
      postBody: body,
      withCredentials: true,
    });
    return response.data;
  }
}
