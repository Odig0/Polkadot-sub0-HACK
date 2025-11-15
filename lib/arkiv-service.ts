import { TicketEntry, AuctionBidEntry, ArkivResponse } from './types'

const ARKIV_API_BASE = 'https://arkacdn.cloudycoding.com/api'

export const arkivService = {
  /**
   * Health check para verificar que Arkiv está disponible
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${ARKIV_API_BASE}/health`)
      return response.ok
    } catch (error) {
      console.error('Arkiv health check failed:', error)
      return false
    }
  },

  /**
   * Crear una entrada de ticket (entrada comprada)
   */
  async createTicketEntry(ticketData: Omit<TicketEntry, 'id'>): Promise<ArkivResponse<TicketEntry>> {
    try {
      const response = await fetch(`${ARKIV_API_BASE}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      })

      if (!response.ok) {
        throw new Error(`Arkiv API error: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('Error creating ticket entry:', errorMessage)
      return { success: false, error: errorMessage }
    }
  },

  /**
   * Obtener todas las entradas de tickets para un evento
   */
  async getEventTickets(eventId: string): Promise<ArkivResponse<TicketEntry[]>> {
    try {
      const response = await fetch(`${ARKIV_API_BASE}/tickets?eventId=${eventId}`)

      if (!response.ok) {
        throw new Error(`Arkiv API error: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('Error fetching event tickets:', errorMessage)
      return { success: false, error: errorMessage }
    }
  },

  /**
   * Obtener tickets de un comprador específico
   */
  async getBuyerTickets(buyerWallet: string): Promise<ArkivResponse<TicketEntry[]>> {
    try {
      const response = await fetch(`${ARKIV_API_BASE}/tickets?buyer=${buyerWallet}`)

      if (!response.ok) {
        throw new Error(`Arkiv API error: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('Error fetching buyer tickets:', errorMessage)
      return { success: false, error: errorMessage }
    }
  },

  /**
   * Crear una entrada de puja en subasta
   */
  async createBidEntry(bidData: Omit<AuctionBidEntry, 'id'>): Promise<ArkivResponse<AuctionBidEntry>> {
    try {
      const response = await fetch(`${ARKIV_API_BASE}/bids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bidData),
      })

      if (!response.ok) {
        throw new Error(`Arkiv API error: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('Error creating bid entry:', errorMessage)
      return { success: false, error: errorMessage }
    }
  },

  /**
   * Obtener todas las pujas de una subasta
   */
  async getAuctionBids(auctionId: string): Promise<ArkivResponse<AuctionBidEntry[]>> {
    try {
      const response = await fetch(`${ARKIV_API_BASE}/bids?auctionId=${auctionId}`)

      if (!response.ok) {
        throw new Error(`Arkiv API error: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('Error fetching auction bids:', errorMessage)
      return { success: false, error: errorMessage }
    }
  },

  /**
   * Obtener pujas de un pujador específico
   */
  async getBidderBids(bidderWallet: string): Promise<ArkivResponse<AuctionBidEntry[]>> {
    try {
      const response = await fetch(`${ARKIV_API_BASE}/bids?bidder=${bidderWallet}`)

      if (!response.ok) {
        throw new Error(`Arkiv API error: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('Error fetching bidder bids:', errorMessage)
      return { success: false, error: errorMessage }
    }
  },

  /**
   * Actualizar estado de un ticket (ej: usado, revocado)
   */
  async updateTicketStatus(
    ticketId: string,
    status: 'pending' | 'confirmed' | 'used' | 'revoked',
    transactionHash?: string
  ): Promise<ArkivResponse<TicketEntry>> {
    try {
      const response = await fetch(`${ARKIV_API_BASE}/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          transactionHash,
          updatedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error(`Arkiv API error: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('Error updating ticket status:', errorMessage)
      return { success: false, error: errorMessage }
    }
  },

  /**
   * Obtener estadísticas de un evento
   */
  async getEventStats(eventId: string): Promise<
    ArkivResponse<{
      totalTicketsSold: number
      totalRevenue: number
      uniqueBuyers: number
      lastUpdate: string
    }>
  > {
    try {
      const response = await fetch(`${ARKIV_API_BASE}/events/${eventId}/stats`)

      if (!response.ok) {
        throw new Error(`Arkiv API error: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('Error fetching event stats:', errorMessage)
      return { success: false, error: errorMessage }
    }
  },

  /**
   * Obtener estadísticas de una subasta
   */
  async getAuctionStats(auctionId: string): Promise<
    ArkivResponse<{
      totalBids: number
      highestBid: number
      uniqueBidders: number
      winner?: string
      endTime?: string
    }>
  > {
    try {
      const response = await fetch(`${ARKIV_API_BASE}/auctions/${auctionId}/stats`)

      if (!response.ok) {
        throw new Error(`Arkiv API error: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('Error fetching auction stats:', errorMessage)
      return { success: false, error: errorMessage }
    }
  },
}
