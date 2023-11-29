export interface Post {
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

export interface UpdatePostRequest {
  title: string;
  about: string;
  content: string;
}

export interface Offer {
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
