// src/views/produtos/ShoppingItems.tsx

import React from 'react'
import { Icon } from '@iconify/react'
import { formatCurrency } from 'src/utils/formatCurrency'
import type { ListaItem } from 'src/services/listaComprasService'

interface Props {
    items: ListaItem[]
    loading: boolean
    onEdit: (i: ListaItem) => void
    onRemove: (id: string) => void
}

export default function ShoppingItems({
                                          items,
                                          loading,
                                          onEdit,
                                          onRemove,
                                      }: Props) {
    const total = items.reduce((sum, i) => sum + i.valor * i.quantidade, 0)

    if (loading) return <p className="text-center text-gray-500 dark:text-gray-400">Carregando…</p>
    if (items.length === 0)
        return <p className="text-center text-gray-500 dark:text-gray-400">Nenhum item na lista.</p>

    return (
        <>
            {/* MOBILE: cards */}
            <div className="md:hidden space-y-4">
                {items.map(i => (
                    <div
                        key={i.id}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-start"
                    >
                        <div className="space-y-1">
                            <p className="font-medium text-gray-900 dark:text-white">{i.nome}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Unitário: {formatCurrency(i.valor)}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Qtde: {i.quantidade}
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Subtotal: {formatCurrency(i.valor * i.quantidade)}
                            </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => onEdit(i)}
                                className="text-yellow-400 hover:text-yellow-500"
                                title="Editar"
                            >
                                <Icon icon="mdi:pencil-outline" width={20} />
                            </button>
                            <button
                                onClick={() => onRemove(i.id)}
                                className="text-red-500 hover:text-red-600"
                                title="Remover"
                            >
                                <Icon icon="mdi:close-circle-outline" width={20} />
                            </button>
                        </div>
                    </div>
                ))}

                {/* total geral no mobile */}
                <div className="text-right font-semibold text-gray-900 dark:text-white">
                    Total: {formatCurrency(total)}
                </div>
            </div>

            {/* DESKTOP: tabela */}
            <div className="hidden md:block overflow-x-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <table className="min-w-full text-gray-700 dark:text-gray-300">
                    <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="px-4 py-2 text-left text-sm font-semibold">Produto</th>
                        <th className="px-4 py-2 text-center text-sm font-semibold">Valor</th>
                        <th className="px-4 py-2 text-center text-sm font-semibold">Qtd.</th>
                        <th className="px-4 py-2 text-center text-sm font-semibold">Subtotal</th>
                        <th className="px-4 py-2 text-center text-sm font-semibold">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {items.map(i => (
                        <tr key={i.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-4 py-3">{i.nome}</td>
                            <td className="px-4 py-3 text-center">{formatCurrency(i.valor)}</td>
                            <td className="px-4 py-3 text-center">{i.quantidade}</td>
                            <td className="px-4 py-3 text-center">
                                {formatCurrency(i.valor * i.quantidade)}
                            </td>
                            <td className="px-4 py-3 text-center flex justify-center gap-4">
                                <button
                                    onClick={() => onEdit(i)}
                                    className="text-yellow-400 hover:text-yellow-500"
                                    title="Editar"
                                >
                                    <Icon icon="mdi:pencil-outline" width={18} />
                                </button>
                                <button
                                    onClick={() => onRemove(i.id)}
                                    className="text-red-500 hover:text-red-600"
                                    title="Remover"
                                >
                                    <Icon icon="mdi:close-circle-outline" width={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                        <td colSpan={3} className="px-4 py-3 text-right font-semibold">
                            Total:
                        </td>
                        <td className="px-4 py-3 text-center font-semibold">
                            {formatCurrency(total)}
                        </td>
                        <td />
                    </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}
