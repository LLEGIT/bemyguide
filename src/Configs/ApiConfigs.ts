export const apiUrl = (url: string) => ApiConfigs.API_URL + url;

export const ApiConfigs = {
  API_URL: "http://localhost:5555",
};

export const ApiUrls = {
  //* USER
  USER: "/user",
  USER_ID: (userId: string) => `/user/${userId}`,
  USER_PROFILE: `/user/me`,
  USER_DETAILS_BY_USERNAME: (username: string) => `/user/profile/${username}`,
  LOGIN: `/user/login`,
  LOGGED_IN: "/user/loggedIn",
  LOGOUT: "/user/logout",
  RESET_PASSWORD_MAIL: "/user/password/email",
  RESET_PASSWORD_SUBMIT: "/user/reset-password",

  //* DESTINATION
  DESTINATION_DETAILS: `/destination/`,
  DESTINATION_SUGGESTION: "/destination/suggestions",
  DESTINATION_SEARCH: "/destination/search",
  DESTINATION_PAGINATED: "/destination/paginated",
  DESTINATION_INFORMATIONS: (destinationId: string) =>
    `/destination/${destinationId}/informations`,
  DESTINATION_INFORMATION_ID: (id: string) =>
    `/destination/${id}/informations/`,
  DESTINATION_ARTICLES: (destinationName: string) =>
    `/destination/${destinationName}/articles`,
  DESTINATION_ACTIVITIES: (id: string) => `/destination/${id}/activities/`,

  //* TRIPS
  TRIPS: "/trip",
  TRIP_PLANNING: (tripId: string) => `/trip/${tripId}/planning`,
  TRIP_DAY_ID: (planningId: string) => `/trip/${planningId}/planning/day`,
  TRIP_STEP_ID: (dayId: string) => `/trip/${dayId}/day/step`,
  USER_TRIPS: (userId: string) => `/trip/user/${userId}`,
  TRIP_DETAILS: (tripId: string) => `/trip/${tripId}`,
  TRIP_USERS: (tripId: string) => `/trip/${tripId}/users`,
  TRIP_MINIMUM_INFORMATIONS: (tripId: string) => `/trip/${tripId}/information`,
  TRIP_HANDLE_INVITATION: (tripId: string) => `/trip/${tripId}/invitation`,
  TRIP_USER_ID: (tripId: string, userId: string) => `/trip/${tripId}/users/${userId}`,
  TRIP_STEPS: (tripId: string) => `/trip/steps/${tripId}`,
  TRIP_ADVICE: (tripId: string) => `/trip/advice/${tripId}`,

  //* PRODUCT
  PRODUCT: "/product",

  //* ADMINISTRATION
  ///* DESTINATION
  ADMINISTRATION_DESTINATION: "/administration/destination",
  ADMINISTRATION_DESTINATION_ID: (destinationId: string) =>
    `/administration/destination/${destinationId}`,
  ADMINISTRATION_DESTINATION_PRODUCT_ID: (productId: string) =>
    `/administration/destination/${productId}/product/`,
  ADMINISTRATION_DESTINATION_SUGGESTIONS_PAGINATED:
    "/administration/destination/suggestions",
  ADMINISTRATION_DESTINATION_SUGGESTIONS_ID: (suggestionId: string) =>
    `/administration/destination/suggestions/${suggestionId}`,
};
