export interface Artist {
  id: string
  name: string
  avatar: string
  category: string
  description: string
  activeAuction: number
}

export interface Bid {
  id: number
  rank: number
  bidder: string
  amount: number
  isWinner: boolean
}
