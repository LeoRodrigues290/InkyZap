import { useEffect, useState } from "react"
import { onTodayActivities } from "src/services/activityLogService"
import { format } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"

const tipoCor: Record<string, string> = {
  pedido_criado:      "bg-primary",
  pedido_resolvido:   "bg-success",
  pedido_cancelado:   "bg-error",
  produto_criado:     "bg-info",
  produto_editado:    "bg-warning",
  produto_vendido:    "bg-secondary",
  servico_criado:     "bg-indigo-500",
  servico_editado:    "bg-indigo-300",
  servico_finalizado:"bg-green-700",
  venda_registrada:   "bg-pink-500",
}

export default function DailyActivity() {
  const [atividades, setAtividades] = useState<any[]>([])

  useEffect(() => {
    const unsub = onTodayActivities(setAtividades)
    return () => unsub()
  }, [])

  return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Atividades 💬
        </h3>
        <ul className="space-y-4 overflow-y-auto" style={{ maxHeight: 400 }}>
          {atividades.map(a => {
            const dt = (a.timestamp as any).toDate()
            return (
                <li key={a.id} className="flex items-start gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400 w-12">
                {format(dt, "HH:mm", { locale: ptBR })}
              </span>
                  <div className="flex flex-col items-center">
                    <div
                        className={`w-3 h-3 rounded-full ${tipoCor[a.type] || "bg-gray-400"}`}
                    />
                    <div className="w-px h-full bg-gray-300 dark:bg-gray-600" />
                  </div>
                  <p className="flex-1 text-gray-700 dark:text-gray-200">
                    {a.description}
                  </p>
                </li>
            )
          })}
        </ul>
      </div>
  )
}
