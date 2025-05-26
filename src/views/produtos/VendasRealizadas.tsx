import { useEffect, useState } from "react"
import { Icon }                from "@iconify/react"
import { buscarVendas }        from "src/services/vendasService"

interface Props {
    onVoltar: () => void
}

export default function VendasRealizadas({ onVoltar }: Props) {
    const [vendas, setVendas] = useState<any[]>([])

    useEffect(() => {
        buscarVendas().then(setVendas)
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    <Icon icon="solar:shopping-cart-line" width={28} /> Vendas Realizadas
                </h2>
                <button
                    onClick={onVoltar}
                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow"
                >
                    <Icon icon="solar:arrow-left-line" width={20} /> Voltar
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Produto</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Telefone</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300">Qtde.</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Vendido Por</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {vendas.map(v => (
                        <tr
                            key={v.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{v.produto_nome}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{v.cliente}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{v.telefone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-gray-700 dark:text-gray-300">{v.quantidade}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{v.vendido_por}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
