import { ReverseAuction, UserStake } from './types'

const AUCTION_DURATION_HOURS = 10
const PRICE_UPDATE_INTERVAL = 60000 // Actualizar precio cada minuto

export const reverseAuctionService = {
  /**
   * Crear una subasta inversa en localStorage
   */
  createAuction(eventId: string, title: string, startPrice: number, endPrice: number): ReverseAuction {
    const now = Date.now()
    const endTime = now + AUCTION_DURATION_HOURS * 60 * 60 * 1000

    const auction: ReverseAuction = {
      id: `auction_${eventId}_${Date.now()}`,
      eventId,
      title,
      startPrice,
      endPrice,
      startTime: now,
      endTime,
      duration: AUCTION_DURATION_HOURS,
      currentPrice: startPrice,
      status: 'active',
      totalBids: 0,
    }

    // Guardar en localStorage
    const auctions = this.getAllAuctions()
    auctions.push(auction)
    localStorage.setItem('reverse_auctions', JSON.stringify(auctions))

    return auction
  },

  /**
   * Obtener una subasta por ID
   */
  getAuction(auctionId: string): ReverseAuction | null {
    const auctions = this.getAllAuctions()
    return auctions.find(a => a.id === auctionId) || null
  },

  /**
   * Obtener todas las subastas
   */
  getAllAuctions(): ReverseAuction[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem('reverse_auctions')
    return stored ? JSON.parse(stored) : []
  },

  /**
   * Calcular precio actual de la subasta (Dutch auction)
   * El precio disminuye linealmente desde startPrice a endPrice
   */
  calculateCurrentPrice(auction: ReverseAuction): number {
    if (auction.status !== 'active') {
      return auction.endPrice
    }

    const now = Date.now()
    
    // Si ya pasó el tiempo
    if (now >= auction.endTime) {
      this.endAuction(auction.id)
      return auction.endPrice
    }

    // Calcular tiempo transcurrido
    const elapsedTime = now - auction.startTime
    const totalTime = auction.endTime - auction.startTime
    const progress = elapsedTime / totalTime

    // Precio disminuye linealmente
    const priceRange = auction.startPrice - auction.endPrice
    const currentPrice = auction.startPrice - priceRange * progress

    return Math.max(currentPrice, auction.endPrice)
  },

  /**
   * Hacer staking en una subasta
   */
  stakeInAuction(auctionId: string, userWallet: string, stakedAmount: number): UserStake {
    const auction = this.getAuction(auctionId)
    if (!auction) {
      throw new Error('Subasta no encontrada')
    }

    const currentPrice = this.calculateCurrentPrice(auction)
    
    if (stakedAmount < currentPrice) {
      throw new Error(`Debes stakear al menos $${currentPrice.toFixed(2)}`)
    }

    const stake: UserStake = {
      id: `stake_${auctionId}_${userWallet}_${Date.now()}`,
      auctionId,
      userWallet,
      stakedAmount,
      stakingTime: Date.now(),
      status: 'active',
      isWinner: false,
    }

    // Guardar stake en localStorage
    const stakes = this.getUserStakes(userWallet)
    stakes.push(stake)
    localStorage.setItem(`user_stakes_${userWallet}`, JSON.stringify(stakes))

    // Incrementar total de bids
    const auctions = this.getAllAuctions()
    const auctionIndex = auctions.findIndex(a => a.id === auctionId)
    if (auctionIndex !== -1) {
      auctions[auctionIndex].totalBids += 1
      localStorage.setItem('reverse_auctions', JSON.stringify(auctions))
    }

    return stake
  },

  /**
   * Obtener stakes de un usuario
   */
  getUserStakes(userWallet: string): UserStake[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(`user_stakes_${userWallet}`)
    return stored ? JSON.parse(stored) : []
  },

  /**
   * Obtener stake activo del usuario en una subasta específica
   */
  getUserStakeInAuction(auctionId: string, userWallet: string): UserStake | null {
    const stakes = this.getUserStakes(userWallet)
    return stakes.find(s => s.auctionId === auctionId && s.status === 'active') || null
  },

  /**
   * Terminar una subasta
   */
  endAuction(auctionId: string): void {
    const auctions = this.getAllAuctions()
    const auctionIndex = auctions.findIndex(a => a.id === auctionId)
    
    if (auctionIndex !== -1) {
      auctions[auctionIndex].status = 'ended'
      localStorage.setItem('reverse_auctions', JSON.stringify(auctions))
    }
  },

  /**
   * Obtener tiempo restante en milisegundos
   */
  getTimeRemaining(auction: ReverseAuction): number {
    const remaining = auction.endTime - Date.now()
    return Math.max(remaining, 0)
  },

  /**
   * Convertir milisegundos a formato legible (HH:MM:SS)
   */
  formatTimeRemaining(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  },

  /**
   * Limpiar localStorage (para testing)
   */
  clearAll(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem('reverse_auctions')
    // Limpiar todos los stakes de usuarios
    const keys = Object.keys(localStorage).filter(k => k.startsWith('user_stakes_'))
    keys.forEach(key => localStorage.removeItem(key))
  },
}
