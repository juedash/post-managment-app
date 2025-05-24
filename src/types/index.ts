export interface PostItem {
  id: number
  userId: number
  title: string
  body: string
}

export interface UserItem {
  id: number
  name: string
  username: string
  email: string
  address: Address
}

interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: {
    lat: string
    lng: string
  }
}

export interface CommentItem {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface AddEdit {
  title?: string | null
  body?: string | null
  userId?: number | null
}
