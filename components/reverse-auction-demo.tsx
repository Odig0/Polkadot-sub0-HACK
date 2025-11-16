'use client'

import { Suspense, useState, useEffect } from 'react'
import { reverseAuctionService } from '@/lib/reverse-auction-service'
import AuctionTimer from '@/components/auction-timer'
import { ReverseAuction } from '@/lib/types'

/**
 * Demostración interactiva del sistema de subasta inversa
 * Este componente permite ver cómo funciona el sistema
 */

export default function ReverseAuctionDemo() {
  const [demoAuction, setDemoAuction] = useState<ReverseAuction | null>(null)
  const [demoPrice, setDemoPrice] = useState<number>(0)
  const [demoStats, setDemoStats] = useState({
    progress: 0,
    timeElapsed: 0,
    timeTotal: 36000000, // 10 horas en ms
  })

  useEffect(() => {
    // Crear subasta demo
    reverseAuctionService.clearAll()
    const auction = reverseAuctionService.createAuction(
      'demo_event',
      'Demo Auction',
      250,
      50
    )
    setDemoAuction(auction)

    // Actualizar precio cada segundo
    const interval = setInterval(() => {
      const updated = reverseAuctionService.getAuction(auction.id)
      if (updated) {
        const price = reverseAuctionService.calculateCurrentPrice(updated)
        setDemoPrice(price)

        const timeElapsed = Date.now() - auction.startTime
        const progress = (timeElapsed / demoStats.timeTotal) * 100

        setDemoStats({
          progress: Math.min(progress, 100),
          timeElapsed,
          timeTotal: demoStats.timeTotal,
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!demoAuction) {
    return <div className="text-center p-4">Cargando demo...</div>
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border border-purple-200 dark:border-purple-700">
      <h2 className="text-3xl font-bold text-foreground mb-2">
        🎯 Demostración de Subasta Inversa (Dutch Auction)
      </h2>
      <p className="text-muted-foreground mb-6">
        Visualiza en tiempo real cómo funciona el sistema de subasta inversa
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lado Izquierdo: Temporizador y Precio */}
        <div className="space-y-6">
          {/* Temporizador */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-foreground">⏱️ Temporizador</h3>
            <Suspense fallback={<div>Cargando...</div>}>
              <AuctionTimer auction={demoAuction} />
            </Suspense>
          </div>

          {/* Precio Actual */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
            <h3 className="text-lg font-semibold mb-2 text-foreground">💰 Precio Actual</h3>
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              ${demoPrice.toFixed(2)}
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Inicio: <strong className="text-foreground">${demoAuction.startPrice.toFixed(2)}</strong></p>
              <p>Mínimo: <strong className="text-foreground">${demoAuction.endPrice.toFixed(2)}</strong></p>
              <p>Disminución: <strong className="text-foreground">${(demoAuction.startPrice - demoPrice).toFixed(2)}</strong></p>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Progresión */}
        <div className="space-y-6">
          {/* Barra de Progresión */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-foreground">📊 Progresión</h3>
            
            <div className="space-y-4">
              {/* Barra Visual */}
              <div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
                    style={{ width: `${demoStats.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {demoStats.progress.toFixed(1)}% completado
                </p>
              </div>

              {/* Estadísticas */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tiempo transcurrido:</span>
                  <span className="font-medium text-foreground">
                    {reverseAuctionService.formatTimeRemaining(demoStats.timeElapsed)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tiempo total:</span>
                  <span className="font-medium text-foreground">10:00:00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tiempo restante:</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {reverseAuctionService.formatTimeRemaining(
                      demoAuction.endTime - Date.now()
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Información Importante */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>💡 Nota:</strong> Esta es una demostración. Los precios bajan automáticamente cada segundo según la fórmula de subasta holandesa (Dutch auction).
            </p>
          </div>
        </div>
      </div>

      {/* Explicación */}
      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          ¿Cómo Funciona?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-2">🔄</div>
            <h4 className="font-semibold text-foreground mb-2">Precio Decrece</h4>
            <p className="text-sm text-muted-foreground">
              El precio comienza alto (${demoAuction.startPrice}) y disminuye linealmente hasta el mínimo (${demoAuction.endPrice}) durante 10 horas.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-2">💰</div>
            <h4 className="font-semibold text-foreground mb-2">Staking Requerido</h4>
            <p className="text-sm text-muted-foreground">
              Para pujar, debes stakear (reservar) al menos el precio actual. Cuanto más esperes, menor será el precio.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-2">🔒</div>
            <h4 className="font-semibold text-foreground mb-2">Pujas Privadas</h4>
            <p className="text-sm text-muted-foreground">
              Tus pujas son privadas. Otros usuarios no pueden ver cuánto has staqueado. Cada usuario solo ve sus propias pujas.
            </p>
          </div>
        </div>
      </div>

      {/* Tabla de Ejemplo */}
      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          📈 Ejemplo de Progresión de Precio
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-4 font-semibold text-foreground">Tiempo Transcurrido</th>
                <th className="text-left py-2 px-4 font-semibold text-foreground">Progreso</th>
                <th className="text-left py-2 px-4 font-semibold text-foreground">Precio</th>
                <th className="text-left py-2 px-4 font-semibold text-foreground">Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-3 px-4">00:00:00</td>
                <td className="py-3 px-4">0%</td>
                <td className="py-3 px-4 font-bold text-red-600">$250.00</td>
                <td className="py-3 px-4 text-muted-foreground">Subasta comienza (precio máximo)</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-3 px-4">02:30:00</td>
                <td className="py-3 px-4">25%</td>
                <td className="py-3 px-4 font-bold text-orange-600">$200.00</td>
                <td className="py-3 px-4 text-muted-foreground">El precio disminuye $50</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-3 px-4">05:00:00</td>
                <td className="py-3 px-4">50%</td>
                <td className="py-3 px-4 font-bold text-yellow-600">$150.00</td>
                <td className="py-3 px-4 text-muted-foreground">A mitad de camino</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-3 px-4">07:30:00</td>
                <td className="py-3 px-4">75%</td>
                <td className="py-3 px-4 font-bold text-green-600">$100.00</td>
                <td className="py-3 px-4 text-muted-foreground">Tres cuartas partes del tiempo</td>
              </tr>
              <tr>
                <td className="py-3 px-4">10:00:00</td>
                <td className="py-3 px-4">100%</td>
                <td className="py-3 px-4 font-bold text-blue-600">$50.00</td>
                <td className="py-3 px-4 text-muted-foreground">Subasta termina (precio mínimo)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
