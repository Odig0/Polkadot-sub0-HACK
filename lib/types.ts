export interface Artist {
  id: string
  name: string
  avatar: string
  category: string
  description: string
  activeAuction: number
}

export interface Event {
  id: string
  title: string
  city: string
  event_name: string
  starts_at: string
  ends_at: string
  is_free: boolean
  capacity: number
  cover_url: string
  cover_image_url: string
  event_location_name: string
  event_location_url: string
  event_location_address: string
  base_ticket_price: number
  is_single_price: boolean
  created_at: string
  description: string
  organizer_id: string
  tickets_sold: number
  points_revenue: number
  categories: Array<{
    id: number
    name: string
  }>
}

export interface Bid {
  id: number
  rank: number
  bidder: string
  amount: number
  isWinner: boolean
}

// Arkiv Ticket Entry Types
export interface TicketEntry {
  id: string
  eventId: string
  eventTitle: string
  buyerId: string
  buyerWallet: string
  ticketType: 'regular' | 'winner' | 'bidder'
  quantity: number
  totalPrice: number
  purchaseDate: string
  status: 'pending' | 'confirmed' | 'used' | 'revoked'
  transactionHash?: string
  metadata?: Record<string, any>
}

export interface AuctionBidEntry {
  id: string
  auctionId: string
  bidderWallet: string
  bidAmount: number
  bidTimestamp: string
  isWinner: boolean
  entryHash?: string
}

export interface ArkivResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
