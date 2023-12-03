import {User} from "./user"

export interface Trip {
  id: number
  date: Date
  gatheringPlace: string
  tripName: string
  rate: number
  numberOfRates: number
  achived: boolean
  participants: Array<User>
  tripGuides: Array<User>
  rated: boolean
  description: string
}

export interface Document {
  id: number
  fileName: string
  title: string
  tripId: number
  username: string
}

export interface Rate {
  userId: number;
  rate: number;
}
