export interface PostCard {
  id: number
  title: string
  content: string
  username: string
  userID: number
  about: string
  createdAt: Date
  updatedAt: Date
  imagesDir: string
  status: number
  likes: number
  liked: boolean
  numberOfComments: number
}

export interface OfferCard {
  id: number;
  title: string;
  content: string;
  username: string;
  userID: number;
  about: string;
  createdAt: Date;
  status: null;
  likes: number;
  liked: boolean;
}
