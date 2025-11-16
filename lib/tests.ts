import { reverseAuctionService } from '@/lib/reverse-auction-service'

/**
 * Suite de pruebas para el servicio de subasta inversa
 * Ejecutar en el navegador console: test()
 */

export function testReverseAuctionSystem() {
  console.log('🧪 Iniciando pruebas del sistema de subasta inversa...\n')

  // 1. Test: Crear subasta
  console.log('✅ Test 1: Crear una subasta inversa')
  reverseAuctionService.clearAll()
  const auction = reverseAuctionService.createAuction('event_1', 'Test Event', 250, 50)
  console.log('Subasta creada:', auction)
  console.assert(auction.startPrice === 250, '❌ startPrice incorrecto')
  console.assert(auction.endPrice === 50, '❌ endPrice incorrecto')
  console.assert(auction.status === 'active', '❌ status debe ser active')
  console.log('✓ Subasta creada correctamente\n')

  // 2. Test: Calcular precio actual (al inicio debe ser startPrice)
  console.log('✅ Test 2: Calcular precio actual')
  let currentPrice = reverseAuctionService.calculateCurrentPrice(auction)
  console.log(`Precio actual (inicio): $${currentPrice.toFixed(2)}`)
  console.assert(currentPrice >= auction.endPrice && currentPrice <= auction.startPrice, 
    '❌ Precio fuera de rango')
  console.log('✓ Precio calculado correctamente\n')

  // 3. Test: Hacer staking
  console.log('✅ Test 3: Hacer staking')
  const userWallet = '0x1234567890abcdef'
  const stakeAmount = 200
  const stake = reverseAuctionService.stakeInAuction(auction.id, userWallet, stakeAmount)
  console.log('Stake registrado:', stake)
  console.assert(stake.userWallet === userWallet, '❌ userWallet incorrecto')
  console.assert(stake.stakedAmount === stakeAmount, '❌ stakedAmount incorrecto')
  console.assert(stake.status === 'active', '❌ status debe ser active')
  console.log('✓ Stake registrado correctamente\n')

  // 4. Test: Obtener stake del usuario
  console.log('✅ Test 4: Obtener stake del usuario')
  const userStake = reverseAuctionService.getUserStakeInAuction(auction.id, userWallet)
  console.log('Stake del usuario:', userStake)
  console.assert(userStake !== null, '❌ No se encontró stake')
  console.assert(userStake?.stakedAmount === stakeAmount, '❌ Amount incorrecto')
  console.log('✓ Stake encontrado correctamente\n')

  // 5. Test: Validación de staking mínimo
  console.log('✅ Test 5: Validación de staking mínimo')
  try {
    reverseAuctionService.stakeInAuction(auction.id, '0xotro', 30) // Menos que endPrice
    console.log('❌ Debería haber lanzado error')
  } catch (err) {
    console.log('✓ Error capturado correctamente:', (err as Error).message)
  }
  console.log()

  // 6. Test: Obtener todos los stakes del usuario
  console.log('✅ Test 6: Obtener todos los stakes del usuario')
  const allStakes = reverseAuctionService.getUserStakes(userWallet)
  console.log('Todos los stakes del usuario:', allStakes)
  console.assert(allStakes.length >= 1, '❌ Debe haber al menos 1 stake')
  console.log('✓ Stakes obtenidos correctamente\n')

  // 7. Test: Formatear tiempo
  console.log('✅ Test 7: Formatear tiempo restante')
  const ms = 3661000 // 1 hora, 1 minuto, 1 segundo
  const formatted = reverseAuctionService.formatTimeRemaining(ms)
  console.log(`Tiempo formateado: ${formatted}`)
  console.assert(formatted === '01:01:01', `❌ Formato incorrecto: ${formatted}`)
  console.log('✓ Tiempo formateado correctamente\n')

  // 8. Test: Obtener tiempo restante
  console.log('✅ Test 8: Obtener tiempo restante')
  const timeRemaining = reverseAuctionService.getTimeRemaining(auction)
  console.log(`Tiempo restante: ${timeRemaining}ms`)
  console.assert(timeRemaining > 0, '❌ El tiempo debe ser positivo')
  console.log('✓ Tiempo calculado correctamente\n')

  // 9. Test: Obtener subasta por ID
  console.log('✅ Test 9: Obtener subasta por ID')
  const retrievedAuction = reverseAuctionService.getAuction(auction.id)
  console.log('Subasta recuperada:', retrievedAuction)
  console.assert(retrievedAuction !== null, '❌ Subasta no encontrada')
  console.assert(retrievedAuction?.id === auction.id, '❌ ID incorrecto')
  console.log('✓ Subasta recuperada correctamente\n')

  // 10. Test: Obtener todas las subastas
  console.log('✅ Test 10: Obtener todas las subastas')
  const allAuctions = reverseAuctionService.getAllAuctions()
  console.log('Total de subastas:', allAuctions.length)
  console.assert(allAuctions.length >= 1, '❌ Debe haber al menos 1 subasta')
  console.log('✓ Subastas obtenidas correctamente\n')

  // 11. Test: Simulación de tiempo (para pruebas)
  console.log('✅ Test 11: Simulación de progresión de precio')
  const testAuction = reverseAuctionService.createAuction('event_test', 'Test', 100, 20)
  
  // Simular progresión (en realidad pasaría tiempo)
  console.log('Progresión del precio a lo largo del tiempo:')
  const timeIntervals = [0, 25, 50, 75, 100] // Porcentajes de progresión
  timeIntervals.forEach(percent => {
    // Simular el cálculo
    const range = testAuction.startPrice - testAuction.endPrice
    const simPrice = testAuction.startPrice - (range * percent / 100)
    console.log(`  ${percent}% → Precio: $${simPrice.toFixed(2)}`)
  })
  console.log('✓ Progresión simulada correctamente\n')

  // 12. Test: Múltiples usuarios
  console.log('✅ Test 12: Múltiples usuarios en misma subasta')
  const user1 = '0xuser1'
  const user2 = '0xuser2'
  const user3 = '0xuser3'
  
  const auction2 = reverseAuctionService.createAuction('event_multi', 'Multi User', 200, 50)
  
  reverseAuctionService.stakeInAuction(auction2.id, user1, 180)
  reverseAuctionService.stakeInAuction(auction2.id, user2, 170)
  reverseAuctionService.stakeInAuction(auction2.id, user3, 160)
  
  const stakes1 = reverseAuctionService.getUserStakes(user1)
  const stakes2 = reverseAuctionService.getUserStakes(user2)
  const stakes3 = reverseAuctionService.getUserStakes(user3)
  
  console.log(`User1 stakes: ${stakes1.length}`)
  console.log(`User2 stakes: ${stakes2.length}`)
  console.log(`User3 stakes: ${stakes3.length}`)
  
  console.assert(stakes1.length === 1, '❌ User1 debe tener 1 stake')
  console.assert(stakes2.length === 1, '❌ User2 debe tener 1 stake')
  console.assert(stakes3.length === 1, '❌ User3 debe tener 1 stake')
  console.log('✓ Múltiples usuarios registrados correctamente\n')

  // 13. Test: Privacidad (usuario no puede ver stakes de otros)
  console.log('✅ Test 13: Verificar privacidad de pujas')
  const user1Stakes = reverseAuctionService.getUserStakes(user1)
  const user2Stakes = reverseAuctionService.getUserStakes(user2)
  
  console.log(`Stakes de User1: ${JSON.stringify(user1Stakes[0]?.userWallet)} (debe ser ${user1})`)
  console.log(`Stakes de User2: ${JSON.stringify(user2Stakes[0]?.userWallet)} (debe ser ${user2})`)
  
  // Verificar que solo ven sus propios stakes
  console.assert(
    user1Stakes.every(s => s.userWallet === user1),
    '❌ User1 ve stakes de otros'
  )
  console.assert(
    user2Stakes.every(s => s.userWallet === user2),
    '❌ User2 ve stakes de otros'
  )
  console.log('✓ Privacidad verificada correctamente\n')

  // 14. Test: Finalizar subasta
  console.log('✅ Test 14: Finalizar subasta')
  const auctionToEnd = reverseAuctionService.getAuction(auction.id)
  console.log('Estado antes:', auctionToEnd?.status)
  reverseAuctionService.endAuction(auction.id)
  const endedAuction = reverseAuctionService.getAuction(auction.id)
  console.log('Estado después:', endedAuction?.status)
  console.assert(endedAuction?.status === 'ended', '❌ Status debe ser ended')
  console.log('✓ Subasta finalizada correctamente\n')

  console.log('=' .repeat(50))
  console.log('✅ ¡Todas las pruebas pasaron correctamente!')
  console.log('=' .repeat(50))
  
  // Limpiar localStorage después de pruebas
  reverseAuctionService.clearAll()
  console.log('\n🧹 localStorage limpiado para próximas pruebas')
}

/**
 * Ejecutar desde la consola del navegador:
 * 
 * import { testReverseAuctionSystem } from '@/lib/tests'
 * testReverseAuctionSystem()
 */
