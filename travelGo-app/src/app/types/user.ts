export interface User {
  accountNonExpired: boolean
  accountNonLocked: boolean
  createdAt: Date
  credentialsNonExpired: boolean
  id: number
  name: String
  surname: String
  username: String
}
