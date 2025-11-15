# Integración Arkiv - Almacenamiento de Entradas y Pujas

## Descripción

Este proyecto integra **Arkiv** para almacenar de forma inmutable todas las transacciones relacionadas con:
- **Entradas compradas** por usuarios
- **Pujas realizadas** en subastas
- **Ganadores** de subastas
- **Historial completo** de todas las actividades

## Servicios Disponibles

### 1. Arkiv Service (`lib/arkiv-service.ts`)

Contiene todas las llamadas directas a la API de Arkiv:

#### Gestión de Entradas (Tickets)

```typescript
// Crear una nueva entrada
arkivService.createTicketEntry({
  eventId: 'event123',
  eventTitle: 'Festival de Música',
  buyerId: 'buyer123',
  buyerWallet: '0x...',
  ticketType: 'winner', // 'regular' | 'winner' | 'bidder'
  quantity: 2,
  totalPrice: 100,
  purchaseDate: new Date().toISOString(),
  status: 'pending',
  metadata: { section: 'VIP', row: 5 }
})

// Obtener todas las entradas de un evento
arkivService.getEventTickets('event123')

// Obtener todas las entradas de un comprador
arkivService.getBuyerTickets('0xWalletAddress')

// Actualizar estado de una entrada
arkivService.updateTicketStatus('ticket123', 'confirmed', 'txHash')
```

#### Gestión de Pujas

```typescript
// Crear una nueva puja
arkivService.createBidEntry({
  auctionId: 'auction123',
  bidderWallet: '0x...',
  bidAmount: 5000,
  bidTimestamp: new Date().toISOString(),
  isWinner: false,
  entryHash: 'optional-blockchain-hash'
})

// Obtener todas las pujas de una subasta
arkivService.getAuctionBids('auction123')

// Obtener todas las pujas de un pujador
arkivService.getBidderBids('0xWalletAddress')
```

#### Estadísticas

```typescript
// Estadísticas de un evento
arkivService.getEventStats('event123')
// Retorna: { totalTicketsSold, totalRevenue, uniqueBuyers, lastUpdate }

// Estadísticas de una subasta
arkivService.getAuctionStats('auction123')
// Retorna: { totalBids, highestBid, uniqueBidders, winner, endTime }
```

### 2. Server Actions (`lib/arkiv-actions.ts`)

Acciones del servidor que se pueden usar directamente en componentes Client:

```typescript
'use client'

import { createTicketEntryAction, createBidEntryAction } from '@/lib/arkiv-actions'

export default function CheckoutComponent() {
  const handlePurchase = async () => {
    const result = await createTicketEntryAction({
      eventId: 'event123',
      eventTitle: 'Mi Evento',
      buyerId: 'buyer123',
      buyerWallet: userWallet,
      ticketType: 'regular',
      quantity: 1,
      totalPrice: 50,
      purchaseDate: new Date().toISOString(),
      status: 'pending'
    })

    if (result.success) {
      console.log('Entrada creada:', result.data)
    }
  }

  return <button onClick={handlePurchase}>Comprar</button>
}
```

### 3. Componentes UI

#### BuyerTickets

Muestra todas las entradas compradas por un usuario:

```tsx
import BuyerTickets from '@/components/buyer-tickets'

export default function MyTicketsPage() {
  return <BuyerTickets walletAddress="0x..." />
}
```

Características:
- Muestra estado de cada entrada (pendiente, confirmada, usada, revocada)
- Información del evento, cantidad y precio
- Hash de transacción (si aplica)
- Iconos visuales de estado

#### BidderBids

Muestra todas las pujas realizadas por un usuario:

```tsx
import BidderBids from '@/components/bidder-bids'

export default function MyBidsPage() {
  return <BidderBids walletAddress="0x..." />
}
```

Características:
- Separa pujas ganadoras de pujas activas
- Muestra monto de puja y fecha
- Opción para reclamar premio (si ganó)
- Información de hash de la entrada

## Casos de Uso

### 1. Cuando un usuario compra una entrada

```typescript
// En el componente de checkout
const handleTicketPurchase = async (eventId, quantity, price) => {
  const result = await createTicketEntryAction({
    eventId,
    eventTitle: event.title,
    buyerId: user.id,
    buyerWallet: user.walletAddress,
    ticketType: 'regular',
    quantity,
    totalPrice: price,
    purchaseDate: new Date().toISOString(),
    status: 'pending',
    metadata: { paymentMethod: 'credit_card' }
  })

  if (result.success) {
    // Actualizar estado de pago
    // Mostrar confirmación
  }
}
```

### 2. Cuando se gana una subasta

```typescript
// En el componente de subasta
const handleAuctionWinner = async (auctionId, winnerWallet, winningBid) => {
  // Crear entrada de puja como ganador
  await createBidEntryAction({
    auctionId,
    bidderWallet: winnerWallet,
    bidAmount: winningBid,
    bidTimestamp: new Date().toISOString(),
    isWinner: true,
    entryHash: blockchainTransactionHash
  })

  // También crear entrada de ticket para el ganador
  await createTicketEntryAction({
    eventId: auction.eventId,
    eventTitle: auction.eventTitle,
    buyerId: winnerProfile.id,
    buyerWallet: winnerWallet,
    ticketType: 'winner',
    quantity: 1,
    totalPrice: winningBid,
    purchaseDate: new Date().toISOString(),
    status: 'pending',
    metadata: { auctionId }
  })
}
```

### 3. Cuando se realiza una puja

```typescript
// En el componente de puja
const handleBid = async (auctionId, bidAmount) => {
  const result = await createBidEntryAction({
    auctionId,
    bidderWallet: userWallet,
    bidAmount,
    bidTimestamp: new Date().toISOString(),
    isWinner: false
  })

  if (result.success) {
    // Actualizar UI
    // Mostrar confirmación
  }
}
```

### 4. Obtener historial de un usuario

```typescript
// Obtener todas las entradas compradas
const tickets = await getBuyerTicketsAction(userWallet)

// Obtener todas las pujas realizadas
const bids = await getBidderBidsAction(userWallet)

// Combinar para un perfil completo del usuario
const userHistory = {
  tickets: tickets.data,
  bids: bids.data,
  totalSpent: tickets.data?.reduce((sum, t) => sum + t.totalPrice, 0),
  totalBids: bids.data?.length
}
```

## Tipos de Datos

### TicketEntry
```typescript
{
  id: string              // UUID generado por Arkiv
  eventId: string         // ID del evento
  eventTitle: string      // Nombre del evento
  buyerId: string         // ID del comprador
  buyerWallet: string     // Dirección wallet del comprador
  ticketType: 'regular' | 'winner' | 'bidder' // Tipo de entrada
  quantity: number        // Cantidad de entradas
  totalPrice: number      // Precio total
  purchaseDate: string    // ISO date
  status: 'pending' | 'confirmed' | 'used' | 'revoked'
  transactionHash?: string // Hash de blockchain (opcional)
  metadata?: {}           // Datos adicionales (sección, fila, etc)
}
```

### AuctionBidEntry
```typescript
{
  id: string              // UUID generado por Arkiv
  auctionId: string       // ID de la subasta
  bidderWallet: string    // Dirección wallet del pujador
  bidAmount: number       // Monto de la puja
  bidTimestamp: string    // ISO date
  isWinner: boolean       // ¿Es la puja ganadora?
  entryHash?: string      // Hash de entrada en blockchain
}
```

## API de Arkiv

**Base URL:** `https://arkacdn.cloudycoding.com/api`

### Endpoints Disponibles

- `GET /health` - Health check
- `POST /tickets` - Crear entrada
- `GET /tickets?eventId=...` - Obtener entradas por evento
- `GET /tickets?buyer=...` - Obtener entradas por comprador
- `PATCH /tickets/{id}` - Actualizar estado
- `POST /bids` - Crear puja
- `GET /bids?auctionId=...` - Obtener pujas por subasta
- `GET /bids?bidder=...` - Obtener pujas por pujador
- `GET /events/{id}/stats` - Estadísticas de evento
- `GET /auctions/{id}/stats` - Estadísticas de subasta

## Próximos Pasos

1. **Integrar con wallet** - Conectar con Polkadot.js o similar
2. **Agregar transacciones blockchain** - Guardar hashes de transacciones
3. **Dashboard de estadísticas** - Mostrar análisis de ventas
4. **Sistema de verificación** - Verificar tickets en entrada
5. **Exportar reportes** - Generar reportes de ventas

## Troubleshooting

Si tienes problemas con Arkiv:

1. Verificar health check: `arkivService.healthCheck()`
2. Revisar consola del navegador para errores
3. Asegurar que la wallet está conectada
4. Verificar que los datos cumplan con el formato esperado

Para más información, consulta la [documentación oficial de Arkiv](https://arkacdn.cloudycoding.com/api-docs)
