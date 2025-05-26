import React from "react"
import { FiShoppingCart, FiEdit2 } from "react-icons/fi"
import { Icon } from "@iconify/react"

interface Produto {
    id: string
    titulo: string
    quantidade: number
    valor_bruto: number
    valor_final: number
    criado_nome?: string
    imagem?: string
}

interface Props {
    produtos: Produto[]
    onVender: (p: Produto) => void
    onEditar: (p: Produto) => void
}

export default function ProdutoList({ produtos, onVender, onEditar }: Props) {
    return (
        <>
            {/* versão mobile: cards */}
            <div className="md:hidden space-y-4">
                {produtos.map(p => (
                    <div
                        key={p.id}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between"
                    >
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                                {p.titulo}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Custo: R$ {p.valor_bruto.toFixed(2).replace(".", ",")}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Venda: R$ {p.valor_final.toFixed(2).replace(".", ",")}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Qtde: {p.quantidade}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Criado por: {p.criado_nome || "-"}
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <button
                                onClick={() => onVender(p)}
                                className="text-green-500 hover:text-green-600"
                                title="Vender"
                            >
                                <FiShoppingCart size={20} />
                            </button>
                            <button
                                onClick={() => onEditar(p)}
                                className="text-yellow-400 hover:text-yellow-500"
                                title="Editar"
                            >
                                <FiEdit2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* versão desktop: tabela */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                            Produto
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                            Valor Custo
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                            Valor Venda
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                            Qtde.
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                            Criado por
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                            Ações
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {produtos.map(p => (
                        <tr
                            key={p.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                                {p.imagem && (
                                    <img
                                        src={p.imagem}
                                        alt={p.titulo}
                                        className="h-8 w-8 rounded-md object-cover"
                                    />
                                )}
                                <span className="text-gray-900 dark:text-gray-100 font-medium">
                    {p.titulo}
                  </span>
                            </td>
                            <td className="px-6 py-4 text-right text-gray-700 dark:text-gray-300">
                                R$ {p.valor_bruto.toFixed(2).replace(".", ",")}
                            </td>
                            <td className="px-6 py-4 text-right text-gray-700 dark:text-gray-300">
                                R$ {p.valor_final.toFixed(2).replace(".", ",")}
                            </td>
                            <td className="px-6 py-4 text-right text-gray-700 dark:text-gray-300">
                                {p.quantidade}
                            </td>
                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                                {p.criado_nome || "-"}
                            </td>
                            <td className="px-6 py-4 text-right flex justify-end gap-4">
                                <button
                                    onClick={() => onVender(p)}
                                    className="text-green-500 hover:text-green-600"
                                    title="Vender"
                                >
                                    <FiShoppingCart />
                                </button>
                                <button
                                    onClick={() => onEditar(p)}
                                    className="text-yellow-400 hover:text-yellow-500"
                                    title="Editar"
                                >
                                    <FiEdit2 />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
