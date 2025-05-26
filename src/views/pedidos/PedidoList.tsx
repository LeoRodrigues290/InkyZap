import { FC, useState } from "react"
import { Icon } from "@iconify/react"

import { Pedido } from "./types"
import { formatarData } from "src/utils/formatDate"
import { getUserName } from "src/utils/userMap"

interface Props {
    pedidos: Pedido[]
    onResolve: (id: string) => void
    onCancel: (id: string) => void
}

const statusLabel = {
    aberto: "Aberto",
    resolvido: "Resolvido",
    cancelado: "Cancelado",
} as const

const statusClasses = {
    aberto: "bg-gray-100 text-gray-800",
    resolvido: "bg-green-100 text-green-800",
    cancelado: "bg-red-100 text-red-800",
} as const

const PedidoList: FC<Props> = ({
                                   pedidos,
                                   onResolve,
                                   onCancel,
                               }) => {
    const [filtro, setFiltro] = useState<Pedido["status"]>("aberto")
    const filtered = pedidos.filter((p) =>
        filtro === "aberto" ? p.status === "aberto" : p.status === filtro
    )

    return (
        <>
            {/* Filtro */}
            <div className="flex justify-end mb-4">
                <select
                    className="
            bg-white dark:bg-gray-700
            border border-gray-300 dark:border-gray-600
            text-gray-800 dark:text-gray-100
            rounded-lg px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-primary
          "
                    value={filtro}
                    onChange={(e) =>
                        setFiltro(e.target.value as Pedido["status"])
                    }
                >
                    <option value="aberto">Abertos</option>
                    <option value="resolvido">Resolvidos</option>
                    <option value="cancelado">Cancelados</option>
                </select>
            </div>

            {filtered.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-400">
                    Nenhum pedido encontrado.
                </p>
            ) : (
                <div className="space-y-4">
                    {filtered.map((p) => (
                        <div
                            key={p.id}
                            className="
                bg-white dark:bg-gray-800
                p-5 rounded-2xl shadow
                flex flex-col md:flex-row md:items-center
                justify-between gap-4
              "
                        >
                            {/* Conteúdo */}
                            <div className="flex-1 space-y-1">
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {getUserName(p.criado_por, p.criado_nome)}
                                </p>
                                <p className="text-gray-700 dark:text-gray-200">
                                    {p.descricao}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {formatarData(p.data_criacao)}
                                </p>
                            </div>

                            {/* Ações / Status */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                {p.status === "aberto" ? (
                                    <>
                                        <button
                                            onClick={() => onResolve(p.id)}
                                            className="
                        inline-flex items-center gap-1
                        px-3 py-2 bg-blue-600 hover:bg-blue-700
                        text-white rounded-lg shadow transition
                      "
                                        >
                                            <Icon icon="mdi:check" />
                                            Resolver
                                        </button>
                                        <button
                                            onClick={() => onCancel(p.id)}
                                            className="
                        inline-flex items-center gap-1
                        px-3 py-2 bg-red-600 hover:bg-red-700
                        text-white rounded-lg shadow transition
                      "
                                        >
                                            <Icon icon="mdi:close" />
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex items-center gap-3">
                    <span
                        className={`
                        inline-flex items-center gap-1
                        px-3 py-1 rounded-full text-sm font-medium
                        ${statusClasses[p.status]}
                      `}
                    >
                      <Icon
                          icon={
                              p.status === "resolvido"
                                  ? "mdi:check-circle-outline"
                                  : "mdi:close-circle-outline"
                          }
                      />
                        {statusLabel[p.status]}
                    </span>

                                        {p.status === "resolvido" && p.resolvido_por && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400 inline-flex items-center gap-1">
                                                <Icon icon="mdi:account-check-outline" />
                                                {getUserName(
                                                    p.resolvido_por,
                                                    p.resolvido_nome || ""
                                                )}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default PedidoList
