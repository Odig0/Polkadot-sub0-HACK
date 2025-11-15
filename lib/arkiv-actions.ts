'use server'

import { arkivService } from '@/lib/arkiv-service'
import { TicketEntry, AuctionBidEntry } from '@/lib/types'

/**
 * Crear una entrada de ticket en Arkiv
 */
export async function createTicketEntryAction(ticketData: Omit<TicketEntry, 'id'>) {
  try {
    const result = await arkivService.createTicketEntry(ticketData)

    if (!result.success) {
      throw new Error(result.error || 'Failed to create ticket entry')
    }

    return { success: true, data: result.data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Server action error:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

/**
 * Crear una entrada de puja en Arkiv
 */
export async function createBidEntryAction(bidData: Omit<AuctionBidEntry, 'id'>) {
  try {
    const result = await arkivService.createBidEntry(bidData)

    if (!result.success) {
      throw new Error(result.error || 'Failed to create bid entry')
    }

    return { success: true, data: result.data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Server action error:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

/**
 * Obtener todas las entradas de un comprador
 */
export async function getBuyerTicketsAction(buyerWallet: string) {
  try {
    const result = await arkivService.getBuyerTickets(buyerWallet)

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch buyer tickets')
    }

    return { success: true, data: result.data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Server action error:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

/**
 * Obtener todas las pujas de un pujador
 */
export async function getBidderBidsAction(bidderWallet: string) {
  try {
    const result = await arkivService.getBidderBids(bidderWallet)

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch bidder bids')
    }

    return { success: true, data: result.data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Server action error:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

/**
 * Obtener todas las entradas de un evento
 */
export async function getEventTicketsAction(eventId: string) {
  try {
    const result = await arkivService.getEventTickets(eventId)

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch event tickets')
    }

    return { success: true, data: result.data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Server action error:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

/**
 * Obtener todas las pujas de una subasta
 */
export async function getAuctionBidsAction(auctionId: string) {
  try {
    const result = await arkivService.getAuctionBids(auctionId)

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch auction bids')
    }

    return { success: true, data: result.data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Server action error:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

/**
 * Actualizar estado de un ticket
 */
export async function updateTicketStatusAction(
  ticketId: string,
  status: 'pending' | 'confirmed' | 'used' | 'revoked',
  transactionHash?: string
) {
  try {
    const result = await arkivService.updateTicketStatus(ticketId, status, transactionHash)

    if (!result.success) {
      throw new Error(result.error || 'Failed to update ticket status')
    }

    return { success: true, data: result.data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Server action error:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

/**
 * Obtener estadísticas de un evento
 */
export async function getEventStatsAction(eventId: string) {
  try {
    const result = await arkivService.getEventStats(eventId)

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch event stats')
    }

    return { success: true, data: result.data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Server action error:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

/**
 * Obtener estadísticas de una subasta
 */
export async function getAuctionStatsAction(auctionId: string) {
  try {
    const result = await arkivService.getAuctionStats(auctionId)

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch auction stats')
    }

    return { success: true, data: result.data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Server action error:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

/**
 * Verificar salud de Arkiv
 */
export async function checkArkivHealthAction() {
  try {
    const isHealthy = await arkivService.healthCheck()
    return { success: isHealthy, status: isHealthy ? 'healthy' : 'unavailable' }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Server action error:', errorMessage)
    return { success: false, error: errorMessage }
  }
}
