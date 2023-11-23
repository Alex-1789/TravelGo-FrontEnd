import {User} from "./user";

export interface SingleTripCard {
  id: number;
  date: Date;
  gatheringPlace: string;
  tripName: string;
  rate: number;
  numberOfRates: number;
  achived: boolean;
  participants: Array<User>;
  tripGuides: Array<number>;
  rated: boolean;
}

export interface Documents {
  id: number;
  filename: string;
  title: string;
  tripId: number;
  username: string;
}
