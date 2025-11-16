# Sistema de Subasta Inversa (Dutch Auction)

## 📋 Descripción General

Este sistema implementa una **subasta inversa (Dutch Auction)** con las siguientes características:

- **🔄 Precio Decreciente**: El precio comienza alto y disminuye linealmente durante 10 horas
- **🔒 Pujas Privadas**: Cada usuario solo ve su propio historial de pujas
- **💰 Sistema de Staking**: Los usuarios deben "stakear" (reservar) dinero para hacer una puja
- **📱 Frontend Only**: Todo el sistema funciona en el navegador sin blockchain
- **💾 Persistencia**: Los datos se guardan en localStorage y se sincronizaban con Arkiv

## 🏗️ Arquitectura

### Servicios

#### `lib/reverse-auction-service.ts`
Servicio principal para gestionar subastas inversas:

```typescript
// Crear una nueva subasta
const auction = reverseAuctionService.createAuction(
  eventId,
  title,
  startPrice,  // 250
  endPrice     // 50
)

// Calcular el precio actual (Dutch auction)
const currentPrice = reverseAuctionService.calculateCurrentPrice(auction)

// Hacer staking en una subasta
const stake = reverseAuctionService.stakeInAuction(
  auctionId,
  userWallet,
  stakedAmount  // Debe ser >= currentPrice
)

// Obtener stakes del usuario
const userStakes = reverseAuctionService.getUserStakes(userWallet)

// Obtener stake activo en una subasta específica
const activeStake = reverseAuctionService.getUserStakeInAuction(auctionId, userWallet)
```

### Componentes UI

#### `components/auction-timer.tsx`
Temporizador de 10 horas que muestra el tiempo restante:
- Actualiza cada segundo
- Muestra formato HH:MM:SS
- Cambia de color cuando la subasta termina

#### `components/reverse-auction-form.tsx`
Formulario para hacer staking en la subasta:
- Muestra el precio actual (Dutch auction decreciente)
- Input para ingresar cantidad a stakear
- Valida que la cantidad sea >= precio actual
- Integración con Arkiv para almacenamiento inmutable
- Mensajes de éxito/error

#### `components/user-stake-display.tsx`
Muestra la información del staking del usuario:
- Solo visible si el usuario tiene un stake activo
- Muestra cantidad staqueada
- Muestra timestamp del staking
- Información privada solo para el propietario

## 💡 Cómo Funciona

### Flujo de Subasta Inversa

```
1. CREACIÓN
   └─ Se crea una subasta con:
      • Precio inicial: $250
      • Precio final: $50
      • Duración: 10 horas

2. TIEMPO 0
   └─ Precio = $250 (máximo)

3. TIEMPO 5 HORAS
   └─ Precio = $150 (a mitad de camino)
   └─ Los usuarios pueden stakear $150 para hacer una puja

4. TIEMPO 9 HORAS
   └─ Precio = $70 (casi al final)
   └─ Los usuarios pueden stakear $70

5. TIEMPO 10 HORAS
   └─ Precio = $50 (mínimo)
   └─ Subasta finaliza
   └─ El usuario que haya staqueado gana
```

### Fórmula de Cálculo de Precio

```
precio_actual = startPrice - (startPrice - endPrice) × (tiempo_transcurrido / tiempo_total)
```

Donde:
- `startPrice` = Precio inicial (ej: $250)
- `endPrice` = Precio final (ej: $50)
- `tiempo_transcurrido` = Tiempo desde el inicio (ms)
- `tiempo_total` = 10 horas en ms (36,000,000 ms)

## 🔐 Privacidad de Pujas

### Característica Clave: Pujas Privadas

**¿Por qué?** En una subasta inversa real, el vendedor no quiere que los compradores sepan qué otros compradores han pujado. Esto evita que bajen artificialmente sus pujas.

**Implementación:**
1. Cada usuario tiene su propio localStorage: `user_stakes_${walletAddress}`
2. Cuando un usuario consulta pujas de la subasta, solo ve las suyas
3. Los datos se filtran por `userWallet` antes de mostrar

```typescript
// Solo ve sus propias pujas
const userStakes = reverseAuctionService.getUserStakes(userWallet)

// Filtra automáticamente por wallet
const activeStake = reverseAuctionService.getUserStakeInAuction(auctionId, userWallet)
```

## 💾 Almacenamiento

### LocalStorage
Estructura de datos:

```
localStorage = {
  reverse_auctions: [
    {
      id: "auction_123_1701234567890",
      eventId: "123",
      title: "Event Name",
      startPrice: 250,
      endPrice: 50,
      startTime: 1701234567890,
      endTime: 1701270567890,
      duration: 10,
      currentPrice: 175.5,
      status: "active",
      totalBids: 42
    }
  ],
  user_stakes_0x1234...5678: [
    {
      id: "stake_auction_123_0x1234...5678_1701234600000",
      auctionId: "auction_123_1701234567890",
      userWallet: "0x1234...5678",
      stakedAmount: 150,
      stakingTime: 1701234600000,
      status: "active",
      isWinner: false
    }
  ]
}
```

### Arkiv (Inmutable Storage)
También se sincroniza con Arkiv para garantizar:
- Transparencia
- Inmutabilidad
- Auditoría

```typescript
await arkivService.createBidEntry({
  auctionId: auction.id,
  bidder: userWallet,
  amount: stakedAmount,
  timestamp: Date.now(),
  bidType: 'reverse_auction_stake'
})
```

## 🔗 Integración con Wallet

### Contexto de Wallet
Se usa `useWallet()` de `/lib/wallet-context.tsx` para:
- Obtener dirección de wallet conectada
- Asociar stakes a la dirección del usuario
- Mostrar información solo al propietario

```typescript
const { account } = useWallet()
if (account) {
  const stake = reverseAuctionService.getUserStakeInAuction(
    auctionId,
    account.address
  )
}
```

## 🎨 UI/UX

### Página de Subasta (`/auction/[id]`)

**Sección Superior:**
- Avatar y descripción del artista/evento
- Estadísticas (unidades disponibles, total de pujas, tiempo restante)

**Formulario de Subasta Inversa:**
1. Muestra precio actual (Dutch auction)
2. Explica que es una puja inversa
3. Input para cantidad a stakear
4. Botón "Stakear y Pujar"
5. Validación: cantidad >= precio actual

**Información Privada:**
1. Muestra solo si el usuario tiene un stake
2. Cantidad staqueada
3. Timestamp
4. Estado (ganador/no ganador)

**Aviso de Privacidad:**
- Explica que las pujas son privadas
- Tranquiliza al usuario

## 🔄 Ciclo de Vida

### Estados

```
1. ACTIVE (Activa)
   └─ Está en progreso
   └─ Se puede stakear

2. ENDED (Finalizada)
   └─ Pasaron 10 horas
   └─ No se pueden hacer más stakes
   └─ Se determina ganador
```

### Determinación de Ganador

En una subasta inversa real, el ganador sería quien haya pujado **primero** al precio más bajo aceptable. Para este MVP:

```
// El ganador es quien hizo un stake activo
// (puede implementarse lógica más compleja)
const winner = stakes.find(s => s.status === 'active' && s.isWinner === true)
```

## 📊 Estadísticas

### Por Subasta
```typescript
auction.totalBids      // Número total de pujas
auction.currentPrice   // Precio actual
reverseAuctionService.getTimeRemaining(auction)  // Tiempo restante
```

### Por Usuario
```typescript
reverseAuctionService.getUserStakes(wallet)      // Todas sus pujas
reverseAuctionService.getUserStakeInAuction(...) // Puja en subasta específica
```

## 🚀 Ejemplo Completo

```typescript
import { reverseAuctionService } from '@/lib/reverse-auction-service'
import { useWallet } from '@/lib/wallet-context'

export default function AuctionExample() {
  const { account } = useWallet()

  // 1. Crear subasta
  const auction = reverseAuctionService.createAuction(
    'event_123',
    'NFT Auction',
    250,  // Precio inicio: $250
    50    // Precio fin: $50
  )

  // 2. Obtener precio actual
  const currentPrice = reverseAuctionService.calculateCurrentPrice(auction)
  console.log(`Precio actual: $${currentPrice.toFixed(2)}`)

  // 3. Usuario hace staking
  if (account) {
    const stake = reverseAuctionService.stakeInAuction(
      auction.id,
      account.address,
      currentPrice + 10  // Stakea un poco más que el precio actual
    )
    console.log(`Puja registrada: $${stake.stakedAmount}`)
  }

  // 4. Ver puja del usuario
  const userStake = reverseAuctionService.getUserStakeInAuction(
    auction.id,
    account?.address || ''
  )
  console.log('Tu puja privada:', userStake)

  // 5. Ver tiempo restante
  const timeRemaining = reverseAuctionService.getTimeRemaining(auction)
  const formatted = reverseAuctionService.formatTimeRemaining(timeRemaining)
  console.log(`Tiempo restante: ${formatted}`)
}
```

## ⚠️ Limitaciones y Notas

1. **Frontend Only**: Este MVP está completamente en el navegador
   - Sin blockchain
   - Sin persistencia permanente
   - Se pierde si se limpia localStorage

2. **No hay Lógica de Ganador Real**: 
   - El MVP no implementa cómo se determina el ganador
   - Necesitaría lógica adicional (primer pujador, mayor cantidad, etc.)

3. **Sin Confirmaciones**:
   - Los stakes no requieren confirmación
   - Se registran instantáneamente en localStorage

4. **Datos Simulados**:
   - Los datos de Arkiv son simulados (fallback a localStorage)
   - En producción, se usaría Arkiv real

## 🔄 Próximos Pasos

1. **Blockchain Real**:
   - Integrar con smart contracts en Polkadot
   - Usar transacciones reales para stakes

2. **Determinar Ganador**:
   - Implementar lógica real de ganador
   - Posiblemente usar fecha de puja como tiebreaker

3. **Notificaciones**:
   - Notificar cuando la subasta está por terminar
   - Alertas cuando el precio alcanza cierto nivel

4. **Historial**:
   - Guardar subastas completadas
   - Mostrar historial de pujas del usuario

5. **UI Mejorada**:
   - Gráfico de precio vs tiempo
   - Historial de precios
   - Predicciones de precio
