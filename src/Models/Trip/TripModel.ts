import { Destination } from "../Destination/DestinationModel";
import { User, UserIdAndEmail } from "../User/UserModel";

export interface TripModel {
  _id: string;
  name: string;
  users: User[] | string[];
  destination: Destination;
  planning: TripPlanning;
  invitedUsers?: string[];
}

export interface AddTripModel {
  destination: string;
  users: string[];
}

export interface UpdateTripUsersModel {
  _id: string;
  users: UserIdAndEmail[];
  inviteFrom?: string;
}

export interface TripDay {
  _id: string;
  title: string;
  day: Date;
  steps: TripStep[];
}
export interface AddTripDay {
  title?: string;
  day: Date;
}
export interface TripPlanning {
  _id: string;
  days: TripDay[];
  createdAt: Date;
  updatedAt: Date;
  updatedBy: User;
}

export interface AddTripPlanningModel {
  days: AddTripDay;
  updatedBy: string;
}

export interface TripStep {
  _id: string;
  title: string;
  description: string;
  location: string;
  datetime: Date;
}

export interface AddTripStep {
  title: string;
  description: string;
  location: string;
  datetime?: Date;
}

export interface UserTrips {
  trip: TripModel[];
}

export interface InvitationModel {
  userId: string;
  accepted: boolean;
}