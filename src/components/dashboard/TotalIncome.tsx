import React, { useEffect, useState } from 'react'
import Chart      from 'react-apexcharts'
import { Icon }   from '@iconify/react'
import { Badge }  from 'flowbite-react'
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp
} from 'firebase/firestore'
import { db } from 'src/firebase/config'
import { startOfMonth, subMonths } from 'date-fns'

export default function TotalIncome() {
  const [monthlyTotals, setMonthlyTotals] = useState<number[]>([])
  const [currentTotal, setCurrentTotal]   = useState(0)

  useEffect(() => {
    ;(async () => {
      const results: number[] = []
      const now = new Date()

      for (let i = 5; i >= 0; i--) {
        const start = startOfMonth(subMonths(now, i))
        const end   = startOfMonth(subMonths(now, i - 1))

        // vendas
        const vendasQ = query(
            collection(db, 'vendas'),
            where('data_venda', '>=', Timestamp.fromDate(start)),
            where('data_venda', '<',  Timestamp.fromDate(end))
        )
        const vs = await getDocs(vendasQ)
        const sumV = vs.docs.reduce((acc, d) => acc + (d.data().total || 0), 0)

        // serviços
        const servQ = query(
            collection(db, 'servicos'),
            where('finalizadoEm', '>=', Timestamp.fromDate(start)),
            where('finalizadoEm', '<',  Timestamp.fromDate(end))
        )
        const ss = await getDocs(servQ)
        const sumS = ss.docs.reduce(
            (acc, d) => acc + (((d.data().valor || 0) - (d.data().custo_materiais || 0))),
            0
        )

        const total = sumV + sumS
        results.push(total)
        if (i === 0) setCurrentTotal(total)
      }

      setMonthlyTotals(results)
    })()
  }, [])

  const chartOptions = {
    series: [{ name: 'Ganhos', data: monthlyTotals }],
    chart: {
      id: 'total-income',
      type: 'area',
      sparkline: { enabled: true },
      foreColor: '#adb0bb',
    },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: { opacityFrom: 0.4, opacityTo: 0.1 },
    },
    markers: { size: 0 },
    tooltip: { theme: 'dark', x: { show: false } },
  }

  return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Icon
                icon="solar:cash-linear-bold"
                width={24}
                className="text-blue-600 dark:text-blue-200"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Total de Entradas
          </h3>
        </div>

        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              R$ {currentTotal.toFixed(2).replace('.', ',')}
            </p>
            <Badge
                color={
                  currentTotal >= (monthlyTotals[monthlyTotals.length - 2] || 0)
                      ? 'success'
                      : 'warning'
                }
                className="mt-1"
            >
              {monthlyTotals.length
                  ? (
                      ((currentTotal - monthlyTotals[monthlyTotals.length - 2]) /
                          (monthlyTotals[monthlyTotals.length - 2] || 1) *
                          100
                      ).toFixed(1) + '%'
                  )
                  : '+0%'}
            </Badge>
          </div>
          <div className="w-32 h-16">
            <Chart
                options={chartOptions}
                series={chartOptions.series}
                type="area"
                height={60}
                width="100%"
            />
          </div>
        </div>
      </div>
  )
}
