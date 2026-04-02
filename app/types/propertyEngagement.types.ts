export type ListingComment = {
  id: string
  author: string
  body: string
  createdAt: string
}

export type PropertyChatMessage = {
  role: 'user' | 'owner'
  text: string
  createdAt: string
}
