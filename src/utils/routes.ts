export const Routes = {
  Index: "/",

  // Auth
  Login: "/login",
  Register: "/register",
  Profile: "/profile",

  // Admin
  Administration: "/administration",
  Administration_Edit: (pathname: string, id: string) =>
    `${pathname}/${id}/edit`,
  Administration_Photos: (pathname: string, id: string) =>
    `${pathname}/${id}/photos`,
  Administration_Products: (pathname: string, id: string) =>
    `${pathname}/${id}/products`,
  Administration_Informations: (pathname: string, id: string) =>
    `${pathname}/${id}/informations`,
  Administration_Create: (pathname: string) => `${pathname}/create`,
  Administration_Destinations: "/administration/destinations",
  Administration_Suggestions: "/administration/suggestions",
  Administration_Suggestion_Informations: (suggestionId: string) =>
    `/administration/suggestions/${suggestionId}/informations`,
  Administration_Users: "/administration/users",

  // Destination
  Destination_Details: (destinationId: string) =>
    `/destination/?id=${destinationId}`,
  Destination_Prices: (destinationId: string) =>
    `/destination/prices/?id=${destinationId}`,
  Destination_Articles: (destinationId: string) =>
    `/destination/articles/?id=${destinationId}`,
  Destination_Activities: (destinationId: string) =>
    `/destination/activities/?id=${destinationId}`,
  Destination_Advice: (destinationId: string) =>
    `/destination/advice/?id=${destinationId}`,
  Destination_Comments: (destinationId: string) =>
    `/destination/comments/?id=${destinationId}`,

  // Trips
  Trip_Index: "/trip",
  Trip_Details: (trip_id: string) => `/trip/details?id=${trip_id}`,
  Trip_Advice: (trip_id: string) => `/trip/advice?id=${trip_id}`,
  Trip_Steps: (trip_id: string) => `/trip/steps?id=${trip_id}`,
  Trip_Companions: (trip_id: string) => `/trip/companions?id=${trip_id}`,
  Trip_Add_Companions: (trip_id: string) =>
    `/trip/add/companions?id=${trip_id}`,
  Trip_Dynamic_Path: (option: string, trip_id: string) =>
    `/trip/${option}?id=${trip_id}`,

  // Users
  User_Profile: (username: string) => `/profile?username=${username}`,

  // Error
  Error: "/error",
};
